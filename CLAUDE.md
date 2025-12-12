# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SupraEnglish is a Next.js 16 application using the App Router and React 19. It's an AI-powered flashcard application with authentication powered by Clerk and UI components built with shadcn/ui and Tailwind CSS.

## Commands

### Development
```bash
npm run dev        # Start Next.js development server
npm run build      # Build for production (includes TypeScript type checking)
npm run start      # Start production server
npm run lint       # Run ESLint
```

### shadcn/ui Components
```bash
npx shadcn@latest init              # Initialize shadcn/ui (already done)
npx shadcn@latest add <component>   # Add a new UI component
```

Example: `npx shadcn@latest add button`

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Icons**: lucide-react
- **Variants**: class-variance-authority (cva)

### Project Structure

```
app/
├── layout.tsx           # Root layout with ClerkProvider and global header
├── page.tsx            # Homepage
├── globals.css         # Global styles and Tailwind directives
└── actions/            # Server Actions (planned location)
    └── *.ts           # Server-side operations requiring auth

components/
└── ui/                # shadcn/ui components
    └── button.tsx     # Example: canonical component structure

lib/
└── utils.ts           # Helper utilities (cn function for class merging)

plans/                 # Feature implementation plans
└── PLAN_TEMPLATE.md  # Template for new plans
```

### Key Files

- **app/layout.tsx**: Global layout with ClerkProvider configured with dark theme customization. Header includes authentication buttons (Sign In/Sign Up) and UserButton.
- **components/ui/button.tsx**: Example of canonical component structure using cva for variants, Radix Slot for asChild pattern, and cn utility for class merging.
- **lib/utils.ts**: Contains the `cn()` helper that combines clsx and tailwind-merge for safe class composition.
- **components.json**: shadcn/ui configuration (style: "new-york", using TypeScript/TSX, path aliases configured).

### Path Aliases

TypeScript path mappings (configured in tsconfig.json):
- `@/*` maps to project root
- Import UI components: `@/components/ui/button`
- Import utilities: `@/lib/utils`

### Authentication Pattern

Clerk is configured in `app/layout.tsx` with:
- Dark theme customization matching project design tokens
- Modal-based sign in/sign up flow
- Global header with SignedIn/SignedOut components

For Server Actions requiring authentication:
```typescript
"use server";
import { auth } from "@clerk/nextjs/server";

export async function yourServerAction(input: YourInput) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  // Perform user-scoped operation
}
```

### Component Pattern

All UI components follow this pattern (see `components/ui/button.tsx`):
1. Use `class-variance-authority` for variant management
2. Use Radix `Slot` component for `asChild` prop support
3. Use `cn()` utility from `@/lib/utils` for class merging
4. Forward refs properly
5. Export both component and variants

### Styling Approach

- **Tailwind CSS only** - no CSS modules or styled-components
- Use `cn()` helper for dynamic class composition
- Tailwind v4 is configured with postcss
- CSS custom properties defined in `app/globals.css` for theming
- Dark theme is default

### Code Quality Checklist

Before considering work complete:
- Run `npm run lint` - must pass
- Run `npm run build` - must pass (includes type checking)
- Test authentication flows if modified
- Verify responsive design on mobile/desktop

### Server Actions

Location: `app/actions/<feature>.ts`

Pattern:
```typescript
"use server";
import { auth } from "@clerk/nextjs/server";

export async function actionName(input: InputType) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Validate input
  // Perform operation
  // Return result
}
```

### Adding New UI Components

Always use shadcn/ui:
1. Check if component exists in `components/ui/`
2. If not, run: `npx shadcn@latest add <component-name>`
3. Import using `@/components/ui/<component>`
4. Follow existing patterns (cva + cn + Slot)

### TypeScript Guidelines

- **Strict mode** is enabled
- Avoid `any` unless unavoidable
- Define interfaces for props and data structures
- Use type inference where appropriate

## Important Patterns

### Class Name Merging

Always use the `cn()` utility for dynamic classes:
```typescript
import { cn } from "@/lib/utils"

<div className={cn("base-classes", condition && "conditional-classes", className)} />
```

### Variant Components

Use class-variance-authority pattern:
```typescript
const variants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "..." }
  },
  defaultVariants: { variant: "default", size: "default" }
})
```

### Composition with asChild

Support component composition using Radix Slot:
```typescript
const Comp = asChild ? Slot : "button"
return <Comp {...props} />
```

## Known Limitations

- No test harness configured - don't assume test scripts exist
- Environment variables for Clerk required but not documented here (see .env.local)

## Git Workflow

- Main branch: `main`
- Create feature branches for all work
- Keep commits focused and atomic
- Run lint and build before pushing
- Include manual verification steps in PR descriptions
- Feature branch format: `feature/*`