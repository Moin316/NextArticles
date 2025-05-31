import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    const articles = await prisma.articles.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    })
    return NextResponse.json(articles)
  } catch (_error) {
    return NextResponse.json({ error: 'Error fetching articles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, category, authorId } = await request.json()
    const article = await prisma.articles.create({
      data: {
        title,
        content,
        category,
        authorId,
      },
    })
    return NextResponse.json(article)
  } catch (_error) {
    return NextResponse.json({ error: 'Error creating article' }, { status: 500 })
  }
} 