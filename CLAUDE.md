# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

rippingyard.com is a Japanese media platform ("lifelog for living well") built as a turborepo monorepo with React Router v7 frontend and NestJS Firebase Functions backend.

## Development Commands

### Quick Start
```bash
# Install dependencies
pnpm install

# Start development (frontend + Firebase emulators)
pnpm dev              # Frontend on http://localhost:3334
pnpm dev:emulator     # Firebase emulators

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Watch mode for frontend tests

# Type checking
pnpm typecheck        # Check TypeScript in all workspaces

# Storybook
pnpm sb               # Start Storybook on http://localhost:6006
pnpm build:sb         # Build Storybook static files
```

### Frontend-Specific (apps/www)
```bash
cd apps/www
pnpm dev              # Development server
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm test             # Run Vitest tests
pnpm test:ui          # Vitest UI
pnpm typecheck        # TypeScript validation
```

### Backend-Specific (apps/functions)
```bash
cd apps/functions
pnpm dev              # NestJS development
pnpm build            # Build functions
pnpm deploy           # Deploy to Firebase
pnpm test             # Run Jest tests
```

## Architecture

### Monorepo Structure
- `apps/www/` - React Router v7 frontend application
- `apps/functions/` - NestJS Firebase Cloud Functions
- `apps/emulator/` - Firebase emulator configuration
- `packages/` - Shared packages (currently empty)

### Frontend Architecture (apps/www/app)

```
app/
├── components/       # Reusable UI components with Vanilla Extract styles
├── features/         # Business logic modules (auth, post, user, etc.)
├── hooks/           # Organized by category (fetch, firebase, firestore, cache, permission)
├── routes/          # React Router file-based routing
├── schemas/         # Zod validation schemas (PostSchema, UserSchema, etc.)
├── styles/          # Vanilla Extract theme system and global styles
└── utils/           # Utility functions (string, date, validation helpers)
```

### Key Technologies
- **Frontend Framework**: React Router v7 (SSR support)
- **Styling**: Vanilla Extract CSS-in-JS with type-safe theme
- **Validation**: Zod schemas for runtime type safety
- **Database**: Firebase Firestore with typed collections
- **Auth**: Firebase Auth with session cookies
- **Search**: Algolia integration
- **Editor**: TipTap for rich text editing
- **AI**: LangChain with Anthropic/OpenAI for content assistance

## Code Conventions

### TypeScript
- Strict mode enabled
- Use type imports: `import type { ... }`
- Define schemas in `app/schemas/` using Zod
- Use satisfies operator for type narrowing

### React Patterns
- Functional components with TypeScript
- Custom hooks in `app/hooks/` organized by domain
- Server-side data fetching in `app/hooks/fetch/`
- Client-side caching in `app/hooks/cache/`

### Styling (Vanilla Extract)
- Component styles in `[component].css.ts` files
- Use theme variables from `app/styles/theme.css.ts`
- Global styles in `app/styles/global.css.ts`
- Responsive utilities in `app/styles/responsive.css.ts`

### Data Fetching
```typescript
// Server-side (in routes)
import { useFetchPosts } from '~/hooks/fetch/useFetchPosts'

// Client-side with caching
import { useCache } from '~/hooks/cache/useCache'
```

### Firebase Operations
- Use typed hooks from `app/hooks/firestore/`
- Authentication via `app/hooks/firebase/useAuth`
- Storage operations in `app/hooks/firebase/useStorage`

## Common Tasks

### Adding a New Route
1. Create file in `app/routes/` following naming convention
2. Export default component and optional loader/action
3. Add meta export for SEO if needed

### Creating a Component
1. Add component in `app/components/`
2. Create styles in `[component].css.ts` using Vanilla Extract
3. Add Storybook story in `[component].stories.tsx`
4. Write tests in `[component].test.tsx`

### Working with Posts
- Schema: `app/schemas/post.ts`
- Hooks: `app/hooks/firestore/usePost.ts`
- Components: `app/components/Post/`
- Routes: `app/routes/posts.$id.tsx`

### Firebase Emulator
```bash
# Start emulators
pnpm dev:emulator

# Emulator ports:
# Firestore: http://localhost:8080
# Auth: http://localhost:9099
# Storage: http://localhost:9199
# Functions: http://localhost:5001
# Emulator UI: http://localhost:4000
```

## Testing

### Frontend Testing
```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test path/to/file.test.tsx

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### Component Testing
- Use `@testing-library/react` for component tests
- Mock Firebase services with `vitest-mock-extended`
- Test files next to source files: `[name].test.tsx`

## Deployment

### Frontend (Vercel)
- Automatic deployment on push to main
- Preview deployments for PRs
- Environment variables in Vercel dashboard

### Backend (Firebase Functions)
```bash
cd apps/functions
pnpm build
pnpm deploy
```

## Important Patterns

### Content Types
- `article`: Long-form content
- `note`: Short updates  
- `log`: Activity tracking

### User Roles
- `lord`: Full admin access
- `mayor`: Moderation permissions
- `resident`: Regular users
- `stranger`: Limited access

### Caching Strategy
- Server-side: React Router loaders with cache headers
- Client-side: Custom `useCache` hook with TTL
- Static assets: Vite build optimization

### SEO & Performance
- Server-side rendering via React Router
- Meta tags in route exports
- Image optimization with Firebase Storage
- Code splitting with React.lazy
- Prefetching with `<Link prefetch="intent">`

## Environment Variables

### Required for Development
```env
# Firebase
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID

# Algolia
VITE_ALGOLIA_APP_ID
VITE_ALGOLIA_API_KEY

# AI Services (optional)
ANTHROPIC_API_KEY
OPENAI_API_KEY
```

## Debugging

### Common Issues
1. **Firebase Auth**: Check emulator is running and session cookies
2. **Styling**: Ensure Vanilla Extract build is complete
3. **TypeScript**: Run `pnpm typecheck` to find type errors
4. **Hydration**: Check server/client data consistency

### Useful Commands
```bash
# Clean all build artifacts
pnpm clean

# Reset dependencies
pnpm clean && pnpm install

# Check for outdated packages
pnpm outdated

# Update dependencies
pnpm update --interactive
```