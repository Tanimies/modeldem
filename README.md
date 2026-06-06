# Elite Maison App

A modern full-stack web application for managing modeling portfolios and agency operations. Built with Next.js 16, Prisma ORM, and NextAuth for secure authentication.

## 🎯 Project Overview

Elite Maison App is a comprehensive platform designed for modeling agencies to manage model profiles, applications, portfolios, and administrative operations. The application provides a seamless experience for both models and agency administrators.

## ✨ Features

- **User Authentication**: Secure sign-up and login with NextAuth.js
- **Model Profiles**: Comprehensive profile management with bio, measurements, and social links
- **Portfolio Management**: Upload and manage portfolio images and videos
- **Applications**: Models can apply to join the agency
- **Admin Dashboard**: Powerful admin tools to approve/reject applications and manage models
- **File Upload**: Secure file upload system for portfolio media
- **Role-Based Access**: Different access levels for regular models and admins
- **Status Tracking**: Application status management (PENDING, APPROVED, REJECTED)

## 🛠 Tech Stack

### Frontend
- **Next.js 16.2.7** - React framework with App Router
- **React 19.2.4** - UI library
- **React DOM 19.2.4** - React DOM rendering
- **TypeScript 5** - Type safety

### Backend
- **Next.js API Routes** - Serverless functions for API
- **Prisma 5.22.0** - ORM and database management
- **NextAuth 5.0.0-beta.31** - Authentication and authorization
- **SQLite** - Lightweight SQL database with LibSQL adapter

### Additional Libraries
- **bcryptjs 3.0.3** - Password hashing
- **multer 2.1.1** - File upload handling
- **@libsql/client 0.17.3** - LibSQL database client
- **@prisma/adapter-libsql 7.8.0** - Prisma adapter for LibSQL

### Development Tools
- **tsx 4.22.4** - TypeScript execution runtime
- **Node 20+** - JavaScript runtime
- **npm** - Package manager

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/Tanimies/modeldem.git
cd elite_maison_app
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Database Setup
Push the Prisma schema to initialize the SQLite database:
```bash
npm run db:push
```

### Step 4: Environment Configuration
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# File Upload (optional)
UPLOAD_DIR="public/uploads"
```

### Step 5: Start Development Server
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api

## 📁 Project Structure

```
elite_maison_app/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── admin/models/       # Admin model management
│   │   │   ├── applications/       # Application submissions
│   │   │   ├── auth/              # NextAuth endpoints
│   │   │   ├── models/            # Model listing
│   │   │   ├── portfolio/         # Portfolio management
│   │   │   ├── profile/           # User profile
│   │   │   ├── register/          # User registration
│   │   │   └── upload/            # File uploads
│   │   ├── dashboard/             # User dashboard
│   │   ├── admin/                 # Admin dashboard
│   │   ├── models/                # Models listing & detail pages
│   │   ├── login/                 # Login page
│   │   ├── register/              # Registration page
│   │   ├── join/                  # Join page
│   │   ├── stories/               # Stories page
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── components/                 # React components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── lib/                        # Utility functions
│   │   ├── auth.ts                # Authentication utilities
│   │   └── prisma.ts              # Prisma client
│   └── proxy.ts                    # Proxy configuration
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── seed.ts                    # Database seeding
│   └── dev.db                     # SQLite database
├── public/                         # Static assets
├── .vscode/                        # VS Code settings
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
└── README.md                       # This file
```

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id           String        @id @default(cuid())
  email        String        @unique
  password     String
  name         String
  role         String        @default("MODEL") // MODEL | ADMIN
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  modelProfile ModelProfile?
}
```

### ModelProfile Model
```prisma
model ModelProfile {
  id              String           @id @default(cuid())
  userId          String           @unique
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  bio             String?
  location        String?
  height          String?
  measurements    String?
  eyeColor        String?
  hairColor       String?
  instagram       String?
  status          String           @default("PENDING") // PENDING | APPROVED | REJECTED
  coverImage      String?
  portfolioMedia  PortfolioMedia[]
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
}
```

### PortfolioMedia Model
```prisma
model PortfolioMedia {
  id             String       @id @default(cuid())
  modelProfileId String
  modelProfile   ModelProfile @relation(fields: [modelProfileId], references: [id], onDelete: Cascade)
  type           String       // IMAGE | VIDEO
  url            String
  caption        String?
  isCover        Boolean      @default(false)
  createdAt      DateTime     @default(now())
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login (via NextAuth)

### Models
- `GET /api/models` - List all approved models
- `POST /api/models` - Create new model (admin only)
- `GET /api/admin/models` - List all models (admin only)
- `GET /api/admin/models/:id` - Get model details (admin only)

### Applications
- `POST /api/applications` - Submit model application
- `GET /api/applications` - List applications (admin only)

### User Profile
- `GET /api/profile` - Get current user profile
- `POST /api/profile` - Update profile
- `PUT /api/profile/:id` - Update profile (admin)

### Portfolio
- `GET /api/portfolio` - Get portfolio items
- `POST /api/portfolio` - Add portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item

### File Upload
- `POST /api/upload` - Upload file (image/video)

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build & Production
npm run build        # Build for production
npm start            # Start production server

# Database
npm run db:push      # Sync schema with database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio GUI
```

## 🔐 Authentication

The app uses NextAuth.js for authentication with:
- Email/Password authentication
- Role-based access control (MODEL | ADMIN)
- Session management
- JWT tokens

### Environment Variables Required
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-min-32-chars
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

## 📸 File Uploads

Files are uploaded using the `multer` middleware to the `/public/uploads` directory.

Supported file types:
- **Images**: jpg, jpeg, png, gif, webp
- **Videos**: mp4, webm, mov

## 🎨 Frontend Features

### Pages
1. **Home** (`/`) - Landing page
2. **Login** (`/login`) - User login
3. **Register** (`/register`) - New user registration
4. **Models** (`/models`) - Browse approved models
5. **Model Detail** (`/models/[id]`) - Individual model profile
6. **Dashboard** (`/dashboard`) - User dashboard
7. **Admin Dashboard** (`/dashboard/admin`) - Admin panel
8. **Stories** (`/stories`) - Stories/testimonials

### Components
- `Header` - Navigation component
- `Footer` - Footer component

## 🛠 Development

### VS Code Extensions (Recommended)
- **Prisma** - Database schema editor
- **ES7+ React Snippets** - React code snippets
- **Prettier** - Code formatter
- **ESLint** - Code linter
- **Thunder Client** - API testing

### Code Formatting
Format code using Prettier:
```bash
npx prettier --write "src/**/*.{ts,tsx,css}"
```

### Database Management
Open Prisma Studio for GUI database management:
```bash
npm run db:studio
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is in use, the app will automatically use 3001:
```bash
# Or manually specify port
PORT=3001 npm run dev
```

### Database Connection Issues
Ensure database file exists:
```bash
npm run db:push
```

### NextAuth Issues
Verify `NEXTAUTH_SECRET` is set in `.env.local` (min 32 characters)

### Module Not Found
Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 API Testing

Use Thunder Client (VS Code extension) or Postman to test API endpoints:

1. **Test Registration**
   ```
   POST http://localhost:3000/api/register
   Content-Type: application/json
   
   {
     "email": "model@example.com",
     "password": "SecurePassword123",
     "name": "John Doe"
   }
   ```

2. **Test Get Models**
   ```
   GET http://localhost:3000/api/models
   ```

## 🔄 Database Migrations

When schema changes:
```bash
npm run db:push
```

Prisma will:
- Detect schema changes
- Generate migrations
- Apply changes to database
- Regenerate Prisma Client

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Elite Maison.

## 👥 Support

For issues or questions, please contact the development team.

## 🎯 Roadmap

- [ ] Advanced search and filtering
- [ ] Real-time notifications
- [ ] Payment integration
- [ ] Email notifications
- [ ] Social media integration
- [ ] Analytics dashboard
- [ ] Mobile app

---

**Last Updated**: June 2024
**Version**: 0.1.0
**Status**: Active Development
