import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    const usersCount = await prisma.user.count()
    
    return NextResponse.json({ 
      status: 'Connected to database',
      usersCount,
      message: 'Database connection successful'
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ 
      status: 'Error',
      error: 'Failed to connect to database'
    }, { status: 500 })
  }
} 