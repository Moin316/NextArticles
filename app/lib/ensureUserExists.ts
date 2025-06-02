import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function ensureUserExists() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  // Try to find user by clerkUserId OR by email
  let dbUser = await prisma.user.findFirst({
    where: {
      OR: [
        { clerkUserId: clerkUser.id },
        { email: clerkUser.emailAddresses[0].emailAddress },
      ],
    },
  });

  if (!dbUser) {
    // Create new user if none found
    dbUser = await prisma.user.create({
      data: {
        clerkUserId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.firstName || "Unknown",
        imageUrl: clerkUser.imageUrl,
      },
    });
  } else if (!dbUser.clerkUserId) {
    // If user exists by email but has no clerkUserId, update it
    dbUser = await prisma.user.update({
      where: { id: dbUser.id },
      data: { clerkUserId: clerkUser.id },
    });
  }

  return dbUser;
}
