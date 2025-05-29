# Next.js Blog Application

A modern blog application built with Next.js, featuring articles about web development trends and technologies.

## Features

- Modern UI with dark mode support
- Server-side rendering and static generation
- Responsive design
- Article search functionality
- Category filtering
- User authentication
- Admin dashboard for content management

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth.js
- React Server Components

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd blog
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a \`.env\` file in the root directory with the following variables:
\`\`\`
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

4. Set up the database:
\`\`\`bash
npx prisma migrate dev
npx prisma db seed
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

## Deployment on Vercel

1. Create a Vercel account at https://vercel.com if you haven't already

2. Install the Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

3. Login to Vercel:
\`\`\`bash
vercel login
\`\`\`

4. Deploy the application:
\`\`\`bash
vercel
\`\`\`

5. Add the following environment variables in your Vercel project settings:
- \`DATABASE_URL\`: Your production database URL
- \`NEXTAUTH_SECRET\`: A secure random string for session encryption
- \`NEXTAUTH_URL\`: Your production URL (will be set automatically by Vercel)

6. After setting up the environment variables, redeploy if needed:
\`\`\`bash
vercel --prod
\`\`\`

## Default Admin Account

After seeding the database, you can login with these credentials:
- Email: admin@example.com
- Password: admin123

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
