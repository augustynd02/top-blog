# aspdevs

A blog for aspiring web developers, written by an aspiring web developer.

## Features

- Posts related to web development, programming and other.
- Intuitive user interface in React for browsing, reading, and filtering posts
- A custom content management system with an admin panel for creating and managing posts
- Utilizes Cloudinary to store images in cloud

## Tech Stack

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/><img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/><img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/><img src="https://img.shields.io/badge/PostgreSQL-green?style=for-the-badge"/><img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/><img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white"/>

## Setup

```bash
# Clone the repo
git clone https://github.com/augustynd02/top-blog.git
cd top-blog

# Install dependencies on client
cd client
npm install

# Install dependencies on server
cd api
npm install

# Create and configure server/.env
SERVER_PORT=3000
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/blog?schema=public"
FRONTEND_URL=your_frontend_url
TOKEN_SECRET=your_token_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Push prisma schema to DB
npx prisma db push

# Start the app in the root directory
npm run dev

