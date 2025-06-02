import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // First, delete existing data in the correct order
  await prisma.likes.deleteMany({})
  await prisma.comment.deleteMany({})
  await prisma.articles.deleteMany({})
  
  // Create admin user with the actual Clerk ID
  const admin = await prisma.user.upsert({
    where: { clerkUserId: 'user_2xwexvbMVnnImOIQhRtCHNsLeQU' },
    update: {},
    create: {
      email: 'admin@example.com', // This will be updated with your actual email
      name: 'Admin',
      clerkUserId: 'user_2xgBmKaQvLGBPOHSraF3hwHPGqQ',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
  })

  // Create articles
  const articles = [
    {
      title: 'The Rise of AI in Web Development',
      content: `Artificial Intelligence is revolutionizing how we build and maintain web applications. From automated code generation to intelligent debugging and personalized user experiences, AI is becoming an integral part of the development process.

Key areas where AI is making an impact:
- Automated code generation and suggestions
- Intelligent debugging and error detection
- User behavior analysis and personalization
- AI-powered chatbots and support systems
- Performance optimization and testing

As we move forward, developers will need to adapt to working alongside AI tools, focusing on higher-level architecture and design while letting AI handle repetitive tasks.`,
      category: 'Technology',
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      authorId: admin.id
    },
    {
      title: 'Modern Web Performance Optimization',
      content: `Website performance has become crucial for success in today's digital landscape. Users expect fast, responsive experiences across all devices. Here are key strategies for optimizing your web applications:

1. Core Web Vitals
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

2. Image Optimization
- Using modern formats (WebP, AVIF)
- Responsive images
- Lazy loading

3. Code Optimization
- Code splitting
- Tree shaking
- Minification

4. Caching Strategies
- Browser caching
- CDN utilization
- Service workers

Remember: Performance isn't just about speed—it's about creating a better user experience that leads to higher engagement and conversion rates.`,
      category: 'Development',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      authorId: admin.id
    },
    {
      title: 'Building with Next.js and React Server Components',
      content: `Next.js has revolutionized React development with its powerful features, especially React Server Components. Let's explore how these technologies are changing web development:

Key Benefits:
1. Improved Performance
- Reduced client-side JavaScript
- Faster page loads
- Better SEO

2. Developer Experience
- Intuitive file-system routing
- Built-in API routes
- Automatic code splitting

3. Server Components
- Zero client-side JavaScript by default
- Direct database access
- Reduced bundle sizes

Best Practices:
- Use Server Components for data fetching
- Implement proper loading states
- Optimize images with next/image
- Leverage edge functions for API routes

The combination of Next.js and React Server Components provides a robust foundation for building modern web applications.`,
      category: 'Development',
      featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      authorId: admin.id
    },
    {
      title: 'The Future of Web Development in 2024',
      content: `As we progress through 2024, several trends are shaping the future of web development:

1. AI Integration
- AI-powered development tools
- Automated testing and optimization
- Personalized user experiences

2. Edge Computing
- Distributed computing
- Reduced latency
- Better performance

3. WebAssembly
- Near-native performance
- Language interoperability
- Complex web applications

4. Progressive Web Apps
- Offline capabilities
- Native-like experiences
- Cross-platform compatibility

5. Zero Trust Security
- Enhanced authentication
- Continuous verification
- Improved data protection

These trends are not just changing how we build web applications but also how users interact with them. Staying updated with these developments is crucial for modern web developers.`,
      category: 'Technology',
      featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
      authorId: admin.id
    },
    {
      title: 'Mastering TypeScript in Modern Web Development',
      content: `TypeScript has become an essential tool in modern web development, offering type safety and enhanced developer experience. Here's what you need to know:

Key Features:
1. Type System
- Static typing
- Interface definitions
- Generic types
- Utility types

2. Object-Oriented Features
- Classes
- Interfaces
- Inheritance
- Modules

3. Modern JavaScript Features
- All ECMAScript features
- Decorators
- Async/await
- Optional chaining

Best Practices:
- Use strict type checking
- Leverage interface segregation
- Implement proper error handling
- Maintain consistent naming conventions

TypeScript continues to evolve, making it an invaluable tool for building robust web applications.`,
      category: 'Development',
      featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      authorId: admin.id
    }
  ]

  // Create new articles
  for (const article of articles) {
    await prisma.articles.create({
      data: article
    })
  }

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 