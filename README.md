# Air Express - Delivery Service Platform

Modern delivery service application built for fast, reliable parcel delivery in Agadez, Niger.

![Air Express Banner](public/og-image.jpg)

## 🚀 Features

- **Customer Portal**: Easy order placement with real-time tracking
- **Admin Dashboard**: Comprehensive order management system
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI**: Built with Tailwind CSS and Framer Motion animations
- **SEO Optimized**: Complete metadata, sitemap, and social media integration
- **Type Safe**: Full TypeScript support for robust development
- **Production Ready**: Security headers, error handling, and performance optimizations

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Prisma ORM](https://www.prisma.io/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/)

## 📋 Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- PostgreSQL database (for production)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd airexpress
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```

   Update the following variables in `.env`:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXT_PUBLIC_APP_URL`: Your application URL

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
airexpress/
├── app/                    # Next.js app directory
│   ├── _components/        # Reusable components (Nav, Footer, etc.)
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard and settings
│   ├── commander/         # Order placement page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   ├── error.tsx          # Custom error boundary
│   ├── layout.tsx         # Root layout with metadata
│   ├── not-found.tsx      # Custom 404 page
│   ├── page.tsx           # Homepage
│   ├── robots.txt/        # SEO robots.txt route
│   └── sitemap.ts         # Dynamic sitemap generation
├── public/                # Static assets (images, logos)
├── .env.example           # Environment variables template
├── next.config.ts         # Next.js configuration
├── vercel.json            # Vercel deployment configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions on Vercel.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

1. Push code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌍 Environment Variables

See `.env.example` for all required environment variables:

- `DATABASE_URL` - PostgreSQL database connection string
- `NODE_ENV` - Environment (development/production)
- `NEXT_PUBLIC_APP_URL` - Public application URL

## 🔒 Security Features

- Security headers (HSTS, CSP, XSS Protection)
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 📱 Features by Section

### Customer Features
- Service browsing and selection
- Online order placement
- Contact form
- Responsive mobile experience

### Admin Features
- Order management dashboard
- Status tracking and updates
- Customer information management
- Order filtering and search
- Settings configuration

## 🎨 Design Philosophy

- **Clean & Modern**: Professional aesthetic with orange accent colors
- **User-Friendly**: Intuitive navigation and clear CTAs
- **Accessible**: WCAG compliant design patterns
- **Performance**: Optimized images and lazy loading

## 📄 License

Copyright © 2024 Air Express. All rights reserved.

## 👥 Support

For support, email support@airexpress.com or visit [airexpress.com/contact](https://airexpress.com/contact).

---

**Built with ❤️ by the Air Express Team**
