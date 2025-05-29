import { NextResponse } from 'next/server'
import { currentUser } from "@clerk/nextjs/server"
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    // Get the current user from Clerk
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ 
        status: 'Error',
        message: 'No authenticated user found'
      }, { status: 401 })
    }

    // Try to find or create the user in our database
    let dbUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id }
    })

    // Format name properly handling null values
    const fullName = [user.firstName, user.lastName]
      .filter(Boolean)
      .join(' ')
      .trim()

    if (!dbUser) {
      // Create the user if they don't exist
      dbUser = await prisma.user.create({
        data: {
          name: fullName || user.firstName || 'Anonymous User',
          clerkUserId: user.id,
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl || "",
        }
      })
    } else {
      // Update existing user's name if it contains "null"
      if (dbUser.name.includes('null')) {
        dbUser = await prisma.user.update({
          where: { id: dbUser.id },
          data: { 
            name: fullName || user.firstName || 'Anonymous User'
          }
        })
      }
    }

    return NextResponse.json({
      status: 'Success',
      clerkUser: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress
      },
      dbUser
    })
  } catch (error) {
    console.error('Auth test error:', error)
    return NextResponse.json({ 
      status: 'Error',
      error: 'Failed to process authentication'
    }, { status: 500 })
  }
} 