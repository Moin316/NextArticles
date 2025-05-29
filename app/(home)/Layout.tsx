import Navbar from "@/components/home/header/navbar";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { prisma } from "../lib/prisma";

const layout = async ({ children }: { children: React.ReactNode }) => {
  try {
    const user = await currentUser();
    if (!user) {
      console.log("No user found from Clerk");
      return null;
    }

    console.log("Clerk user found:", {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName
    });

    const loggedInUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });

    // Format name properly handling null values
    const fullName = [user.firstName, user.lastName]
      .filter(Boolean)
      .join(' ')
      .trim();

    if (!loggedInUser) {
      console.log("Creating new user in database...");
      try {
        const newUser = await prisma.user.create({
          data: {
            name: fullName || user.firstName || 'Anonymous User',
            clerkUserId: user.id,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl || "",
          },
        });
        console.log("User created successfully:", newUser);
      } catch (createError) {
        console.error("Error creating user:", createError);
        throw createError;
      }
    } else {
      // Update existing user's name if it contains "null"
      if (loggedInUser.name.includes('null')) {
        await prisma.user.update({
          where: { id: loggedInUser.id },
          data: { 
            name: fullName || user.firstName || 'Anonymous User'
          }
        });
        console.log("Updated user name to:", fullName);
      } else {
        console.log("Existing user found:", loggedInUser);
      }
    }

    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  } catch (error) {
    console.error("Error in layout:", error);
    // Still render the layout even if user creation fails
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  }
};

export default layout;