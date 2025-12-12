# SupraEnglish - AI-Powered Flashcard Application

## Overview

**SupraEnglish** is a modern AI-powered flashcard application designed to revolutionize learning through intelligent spaced repetition and adaptive study sessions. The application transforms traditional flashcard studying with AI-generated content, smart algorithms, and comprehensive progress tracking.

## 🚀 Features

### Core Functionality
- **AI-Generated Content**: Automatically create flashcards from notes, PDFs, or any text
- **Smart Study Sessions**: Adaptive learning algorithms focusing on areas needing review
- **Spaced Repetition**: Science-backed SM-2 algorithm for optimal retention
- **Progress Tracking**: Detailed analytics and learning journey visualization
- **Intelligent Hints**: AI-powered assistance when stuck
- **Multi-Format Support**: Text, images, PDFs, and AI-generated content

### User Experience
- Modern, responsive design with dark theme
- Intuitive dashboard with study statistics
- Real-time progress indicators
- Seamless authentication flow
- Mobile-optimized interface

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16+ with React 19
- **UI Library**: shadcn/ui components with Tailwind CSS
- **Styling**: Tailwind CSS v4 with CSS variables
- **Icons**: Lucide React
- **Authentication**: Clerk with custom dark theme

### Backend (Planned)
- **Database**: Drizzle ORM with Neon PostgreSQL
- **SRS Algorithm**: SuperMemo 2 (SM-2) implementation
- **API**: Next.js Server Actions

### Development Tools
- **TypeScript**: Full type safety
- **PostCSS**: CSS processing
- **ESLint**: Code linting

## 📁 Project Structure

```
SupraEnglish/
├── app/                          # Next.js app directory
│   ├── dashboard/               # User dashboard
│   ├── subscription/            # Pricing and subscription
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout with auth
│   └── page.tsx                # Landing page
├── components/
│   └── ui/                     # shadcn/ui components
│       ├── badge.tsx
│       ├── button.tsx
│       └── card.tsx
├── lib/
│   └── utils.ts                # Utility functions
├── plans/
│   └── ai-flashcard-mvp.plan.md # Development roadmap
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.js             # Next.js configuration
```

## 🗄 Database Schema (Planned)

### Core Tables
- **decks**: Flashcard collections with metadata
- **cards**: Individual flashcards with front/back content
- **card_progress**: SM-2 algorithm tracking per user/card
- **study_sessions**: Learning session analytics

### Key Features
- User isolation through Clerk authentication
- Spaced repetition scheduling with SM-2 algorithm
- Comprehensive progress tracking and analytics
- Study session recording for insights

## 🎨 Design System

### Theme Configuration
- **Style**: New York variant of shadcn/ui
- **Base Color**: Zinc palette
- **Dark Theme**: Custom Clerk theme integration
- **Typography**: Modern, clean fonts with gradient accents
- **Layout**: Responsive design with max-width containers

### UI Components
- Consistent component library using shadcn/ui
- Gradient text effects for branding
- Card-based layouts for content organization
- Accessible form controls and navigation

## 🚦 Current Status

### Implemented ✅
- Landing page with feature showcase
- Authentication system with Clerk
- Responsive layout and navigation
- Basic UI components (Button, Card, Badge)
- Subscription/pricing page structure
- Dashboard page foundation

### In Development 🔄
- Database schema implementation
- SM-2 spaced repetition algorithm
- Study session management
- Card creation and editing
- Progress analytics

### Planned 📋
- AI content generation
- Advanced study modes
- Mobile app version
- Team collaboration features
- Export/import functionality

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Environment Variables
```env
# Frontend
VITE_API_BASE_URL=http://localhost:3000
VITE_AI_MODEL=openai:gpt-4o-mini

# Backend
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/supraenglish
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=anthropic-key
GROQ_API_KEY=groq-key
AI_DEFAULT_MODEL=gpt-4o-mini
PORT=3000

# Clerk Authentication
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
```

### Installation & Setup
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📖 Key Concepts

### Spaced Repetition System
The application implements the SM-2 algorithm for optimal learning:
- Cards start with 1-day intervals
- Success increases intervals exponentially
- Difficulty affects ease factor adjustments
- Failed cards reset to shorter intervals

### User Experience Flow
1. **Create or Import**: Manual creation or AI-generated flashcards
2. **Study Smart**: Adaptive learning focused on weak areas
3. **Master It**: Progress tracking with detailed analytics

### Authentication & Security
- Clerk-based authentication with custom theming
- User data isolation and privacy protection
- Secure API routes with authentication checks

## 🎯 Roadmap

### MVP Phase
- [x] Basic UI and authentication
- [ ] Database implementation with Drizzle ORM
- [ ] Core flashcard CRUD operations
- [ ] SM-2 algorithm implementation
- [ ] Study session functionality
- [ ] Basic statistics dashboard

### Future Enhancements
- AI-powered content generation
- Advanced analytics and insights
- Collaborative study features
- Mobile application
- Integration with educational platforms

## 🤝 Contributing

This appears to be a personal learning project. The codebase follows modern React/Next.js conventions with TypeScript for type safety and shadcn/ui for consistent component design.

## 📄 License

This project uses the ISC license as specified in package.json.

---

**SupraEnglish** represents a modern approach to digital learning, combining proven spaced repetition techniques with AI-powered features to create an effective study companion for students and lifelong learners.