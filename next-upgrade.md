# Next.js 13 to 16 Upgrade Guide

## Table of Contents
1. [Overview](#overview)
2. [Version Requirements](#version-requirements)
3. [Breaking Changes by Version](#breaking-changes-by-version)
   - [Next.js 13 → 14](#nextjs-13--14)
   - [Next.js 14 → 15](#nextjs-14--15)
   - [Next.js 15 → 16](#nextjs-15--16)
4. [Migration Tools](#migration-tools)

---

## Overview

This document provides a comprehensive guide for upgrading from Next.js 13 to Next.js 16, covering all breaking changes with before/after code examples.

---

## Version Requirements

### Next.js 13
- **Node.js**: 16.14.0+ (minimum)
- **React**: 18.2.0+ (minimum)
- **TypeScript**: 4.5+ (if using TypeScript)

### Next.js 14
- **Node.js**: 18.17.0+
- **React**: 18.2.0+
- **TypeScript**: 5.0+ (recommended)

### Next.js 15
- **Node.js**: 18.18.0+
- **React**: 19.0.0+ (RC or stable)
- **TypeScript**: 5.0+

### Next.js 16
- **Node.js**: 18.18.0+
- **React**: 19.0.0+
- **TypeScript**: 5.0+

---

## Breaking Changes by Version

## Next.js 13 → 14

### 1. Metadata Viewport Export Separation

**Breaking Change**: Viewport-related metadata properties have been separated into their own export.

#### Before (Next.js 13)
```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  themeColor: '#000000',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}
```

#### After (Next.js 14)
```typescript
// app/layout.tsx
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'My App',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}
```

**Migration**: Run the codemod
```bash
npx @next/codemod@latest metadata-to-viewport-export .
```

---

### 2. Image Import Changes

**Breaking Change**: The `next/image` import structure was reorganized.

#### Before (Next.js 13 and earlier)
```typescript
// Using the old Image component
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={500}
      height={500}
    />
  )
}
```

#### After (Next.js 14)
```typescript
// next/image is now the new optimized component
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={500}
      height={500}
    />
  )
}

// If you need the legacy behavior:
import Image from 'next/legacy/image'
```

---

### 3. SWC Minifier Default

**Breaking Change**: `swcMinify` is now `true` by default.

#### Before (Next.js 13)
```javascript
// next.config.js
module.exports = {
  swcMinify: false, // Terser was default
}
```

#### After (Next.js 14)
```javascript
// next.config.js
module.exports = {
  // swcMinify: true is now default
  // Explicitly set to false only if you need Terser
  swcMinify: false, // Only if you have specific Terser requirements
}
```

---

### 4. Target Configuration Removed

**Breaking Change**: The `target` config option has been removed in favor of Output File Tracing.

#### Before (Next.js 13)
```javascript
// next.config.js
module.exports = {
  target: 'server', // or 'serverless'
}
```

#### After (Next.js 14)
```javascript
// next.config.js
module.exports = {
  // 'target' is removed
  // Use 'output' instead for deployment targets
  output: 'standalone', // for containerized deployments
  // or remove entirely for default behavior
}
```

---

## Next.js 14 → 15

### 1. Async Request APIs - cookies(), headers(), draftMode()

**Breaking Change**: Request APIs now return Promises and must be awaited (with backward compatibility in v15, but enforced in v16).

#### Before (Next.js 14)
```typescript
// app/page.tsx
import { cookies, headers, draftMode } from 'next/headers'

export default function Page() {
  // Synchronous access
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')

  const headersList = headers()
  const userAgent = headersList.get('user-agent')

  const { isEnabled } = draftMode()

  return <div>User Agent: {userAgent}</div>
}
```

#### After (Next.js 15+)
```typescript
// app/page.tsx
import { cookies, headers, draftMode } from 'next/headers'

export default async function Page() {
  // Async access with await
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')

  const headersList = await headers()
  const userAgent = headersList.get('user-agent')

  const { isEnabled } = await draftMode()

  return <div>User Agent: {userAgent}</div>
}
```

#### Route Handlers

##### Before (Next.js 14)
```typescript
// app/api/user/route.ts
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

export function GET() {
  const cookieStore = cookies()
  const session = cookieStore.get('session')

  const headersList = headers()
  const authorization = headersList.get('authorization')

  return NextResponse.json({ session: session?.value })
}
```

##### After (Next.js 15+)
```typescript
// app/api/user/route.ts
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  const headersList = await headers()
  const authorization = headersList.get('authorization')

  return NextResponse.json({ session: session?.value })
}
```

**Migration**: Run the codemod
```bash
npx @next/codemod@latest next-async-request-api .
```

#### Temporary Synchronous Access (v15 only, removed in v16)
```typescript
// app/page.tsx
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'

export default function Page() {
  // This will show a warning in development
  const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
  const token = cookieStore.get('token')

  return <div>Token: {token?.value}</div>
}
```

---

### 2. Async params and searchParams

**Breaking Change**: `params` and `searchParams` props are now Promises (with backward compatibility in v15, enforced in v16).

#### Page Components

##### Before (Next.js 14)
```typescript
// app/blog/[slug]/page.tsx
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params
  const { query } = searchParams

  return <h1>Post: {slug}</h1>
}

export function generateMetadata({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params
  return {
    title: `Blog - ${slug}`,
  }
}
```

##### After (Next.js 15+)
```typescript
// app/blog/[slug]/page.tsx
type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = await params
  const { query } = await searchParams

  return <h1>Post: {slug}</h1>
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = await params
  return {
    title: `Blog - ${slug}`,
  }
}
```

##### Using PageProps Helper (Recommended in Next.js 15.5+)
```typescript
// app/blog/[slug]/page.tsx
import type { PageProps } from '@/.next/types/app/blog/[slug]/page'
// Or manually: type PageProps = { params: Promise<{ slug: string }>, searchParams: Promise<{...}> }

export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const query = await props.searchParams

  return <h1>Post: {slug}</h1>
}
```

Generate types with:
```bash
npx next typegen
```

#### Layout Components

##### Before (Next.js 14)
```typescript
// app/dashboard/[team]/layout.tsx
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { team: string }
}) {
  const { team } = params

  return (
    <section>
      <h1>Welcome to {team}'s Dashboard</h1>
      {children}
    </section>
  )
}
```

##### After (Next.js 15+)
```typescript
// app/dashboard/[team]/layout.tsx
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ team: string }>
}) {
  const { team } = await params

  return (
    <section>
      <h1>Welcome to {team}'s Dashboard</h1>
      {children}
    </section>
  )
}
```

#### Route Handlers

##### Before (Next.js 14)
```typescript
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const post = await fetchPost(id)

  return Response.json(post)
}
```

##### After (Next.js 15+)
```typescript
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = await fetchPost(id)

  return Response.json(post)
}
```

#### Client Components

##### Before (Next.js 14)
```typescript
'use client'

export default function ClientPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { slug } = params
  return <div>{slug}</div>
}
```

##### After (Next.js 15+)
```typescript
'use client'

import { use } from 'react'

export default function ClientPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = use(params)
  const { query } = use(searchParams)

  return <div>{slug}</div>
}
```

---

### 3. React 19 Breaking Changes

**Breaking Change**: React 19 introduces new hook APIs.

#### useFormState → useActionState

##### Before (Next.js 14 with React 18)
```typescript
'use client'

import { useFormState } from 'react-dom'

export default function Form() {
  const [state, formAction] = useFormState(submitAction, { message: '' })

  return (
    <form action={formAction}>
      <input type="text" name="email" />
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}
```

##### After (Next.js 15 with React 19)
```typescript
'use client'

import { useActionState } from 'react'

export default function Form() {
  const [state, formAction, isPending] = useActionState(
    submitAction,
    { message: '' }
  )

  return (
    <form action={formAction}>
      <input type="text" name="email" />
      <button type="submit" disabled={isPending}>
        Submit
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}
```

#### useFormStatus Enhancements

##### Before (Next.js 14 with React 18)
```typescript
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
```

##### After (Next.js 15 with React 19)
```typescript
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
```

---

### 4. Configuration Changes

#### bundlePagesExternals → bundlePagesRouterDependencies

##### Before (Next.js 14)
```javascript
// next.config.js
module.exports = {
  experimental: {
    bundlePagesExternals: true,
  },
}
```

##### After (Next.js 15)
```javascript
// next.config.js
module.exports = {
  bundlePagesRouterDependencies: true,
}
```

---

### 5. Runtime Configuration

**Breaking Change**: `experimental-edge` runtime value is deprecated.

#### Before (Next.js 14)
```typescript
// app/api/route.ts
export const runtime = 'experimental-edge'

export async function GET() {
  return Response.json({ message: 'Hello' })
}
```

#### After (Next.js 15)
```typescript
// app/api/route.ts
export const runtime = 'edge'

export async function GET() {
  return Response.json({ message: 'Hello' })
}
```

---

## Next.js 15 → 16

### 1. Async Request APIs (Enforcement)

**Breaking Change**: Synchronous access to request APIs is completely removed. No more `UnsafeUnwrapped` types.

#### Before (Next.js 15 - temporary compatibility)
```typescript
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'

export default function Page() {
  // This worked in v15 with a warning
  const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
  const token = cookieStore.get('token')

  return <div>Token: {token?.value}</div>
}
```

#### After (Next.js 16 - async only)
```typescript
import { cookies } from 'next/headers'

export default async function Page() {
  // Must use await - synchronous access throws error
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return <div>Token: {token?.value}</div>
}
```

**All request APIs affected**:
- `cookies()` from `next/headers`
- `headers()` from `next/headers`
- `draftMode()` from `next/headers`
- `params` in layouts, pages, routes
- `searchParams` in pages

---

### 2. Async params and searchParams (Enforcement)

**Breaking Change**: Synchronous access is no longer supported.

#### Before (Next.js 15 - synchronous still worked)
```typescript
// app/blog/[slug]/page.tsx
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Synchronous access worked in v15
  const { slug } = params
  return <h1>{slug}</h1>
}
```

#### After (Next.js 16 - must be async)
```typescript
// app/blog/[slug]/page.tsx
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Must await
  const { slug } = await params
  return <h1>{slug}</h1>
}
```

---

### 3. Middleware to Proxy Migration

**Breaking Change**: `middleware.ts` convention is deprecated in favor of `proxy.ts`.

#### Before (Next.js 15)
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')
  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

#### After (Next.js 16)
```typescript
// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')
  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

**Migration**: Run the codemod
```bash
npx @next/codemod@canary middleware-to-proxy .
```

---

### 4. Turbopack Configuration

**Breaking Change**: Turbopack configuration format has been updated.

#### Before (Next.js 15)
```javascript
// next.config.js
module.exports = {
  experimental: {
    turbo: {
      // Turbopack config
    },
  },
}
```

#### After (Next.js 16)
```javascript
// next.config.js
module.exports = {
  turbopack: {
    // Turbopack config (moved from experimental)
  },
}
```

**Migration**: The upgrade codemod handles this automatically.

---

### 5. Stabilized APIs - Remove unstable_ Prefix

**Breaking Change**: Several experimental APIs have been stabilized.

#### Before (Next.js 15)
```typescript
// app/actions.ts
'use server'

import { unstable_cache } from 'next/cache'
import { unstable_after } from 'next/server'

export const getData = unstable_cache(
  async () => {
    const data = await fetch('https://api.example.com/data')
    return data.json()
  },
  ['data-cache'],
  { revalidate: 3600 }
)

export async function logAction() {
  unstable_after(() => {
    console.log('Action logged')
  })
}
```

#### After (Next.js 16)
```typescript
// app/actions.ts
'use server'

import { cache } from 'next/cache'
import { after } from 'next/server'

export const getData = cache(
  async () => {
    const data = await fetch('https://api.example.com/data')
    return data.json()
  },
  ['data-cache'],
  { revalidate: 3600 }
)

export async function logAction() {
  after(() => {
    console.log('Action logged')
  })
}
```

---

### 6. Remove experimental_ppr

**Breaking Change**: PPR (Partial Prerendering) configuration has changed.

#### Before (Next.js 15)
```typescript
// app/page.tsx
export const experimental_ppr = true

export default function Page() {
  return <div>My Page</div>
}
```

#### After (Next.js 16)
```typescript
// app/page.tsx
// Remove experimental_ppr from individual pages

// Instead, configure globally in next.config.js
```

```javascript
// next.config.js
module.exports = {
  experimental: {
    ppr: true, // Enable for entire app
  },
}
```

---

### 7. ESLint CLI Migration

**Breaking Change**: `next lint` is migrating to the standard ESLint CLI.

#### Before (Next.js 15)
```json
{
  "scripts": {
    "lint": "next lint"
  }
}
```

#### After (Next.js 16)
```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

```javascript
// eslint.config.js (flat config)
const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

module.exports = [
  ...compat.extends('next/core-web-vitals'),
  // Your custom rules
]
```

---

## Migration Tools

### Automated Upgrade

Use the Next.js upgrade codemod to automate most changes:

```bash
# Upgrade to Next.js 16
npx @next/codemod@latest upgrade latest
```

This will:
- Update package versions
- Run all applicable codemods
- Update configuration files
- Migrate middleware to proxy
- Remove unstable_ prefixes
- Update Turbopack configuration

### Individual Codemods

Run specific codemods if needed:

```bash
# Async request APIs
npx @next/codemod@latest next-async-request-api .

# Metadata to viewport
npx @next/codemod@latest metadata-to-viewport-export .

# Middleware to proxy
npx @next/codemod@canary middleware-to-proxy .
```

### Manual Steps

1. **Update Dependencies**
```bash
npm install next@latest react@latest react-dom@latest
npm install --save-dev @types/react@latest @types/react-dom@latest
```

2. **Run Type Generation** (Next.js 15.5+)
```bash
npx next typegen
```

3. **Test Your Application**
- Run `npm run lint`
- Run `npm run build`
- Test all pages and routes
- Verify authentication flows
- Check API routes

4. **Update Environment Variables**
- Review any deprecated environment variables
- Update Clerk configuration if needed

### Migration Checklist

- [ ] Update Node.js to 18.18.0+
- [ ] Update React to 19.0.0+
- [ ] Update Next.js to 16.x
- [ ] Update TypeScript types
- [ ] Run upgrade codemod
- [ ] Convert request APIs to async
- [ ] Convert params/searchParams to async
- [ ] Update React 19 hooks (useActionState)
- [ ] Migrate middleware to proxy
- [ ] Update configuration files
- [ ] Remove unstable_ prefixes
- [ ] Generate types with `next typegen`
- [ ] Run `npm run lint` - must pass
- [ ] Run `npm run build` - must pass
- [ ] Test all routes and functionality
- [ ] Test authentication flows
- [ ] Verify responsive design

---

## Common Patterns

### Server Component with All Async APIs

```typescript
// app/dashboard/[team]/page.tsx
import { cookies, headers } from 'next/headers'
import type { PageProps } from '@/.next/types/app/dashboard/[team]/page'

export default async function DashboardPage(props: PageProps<'/dashboard/[team]'>) {
  // Await all async APIs
  const [cookieStore, headersList, params, searchParams] = await Promise.all([
    cookies(),
    headers(),
    props.params,
    props.searchParams,
  ])

  const { team } = params
  const token = cookieStore.get('auth-token')
  const userAgent = headersList.get('user-agent')
  const { filter } = searchParams

  return (
    <div>
      <h1>Team: {team}</h1>
      <p>Filter: {filter}</p>
    </div>
  )
}
```

### Route Handler with Async APIs

```typescript
// app/api/user/[id]/route.ts
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const [cookieStore, headersList, { id }] = await Promise.all([
    cookies(),
    headers(),
    params,
  ])

  const session = cookieStore.get('session')
  const authorization = headersList.get('authorization')

  if (!session?.value || !authorization) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await fetchUser(id)
  return NextResponse.json(user)
}
```

### Server Action with Async APIs

```typescript
// app/actions/user.ts
'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function updateUser(formData: FormData) {
  const [cookieStore, headersList] = await Promise.all([
    cookies(),
    headers(),
  ])

  const session = cookieStore.get('session')

  if (!session) {
    redirect('/login')
  }

  // Update user logic
  const name = formData.get('name') as string
  await updateUserInDB(session.value, name)

  return { success: true }
}
```

---

## Resources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Next.js 14 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-14)
- [Next.js 13 Upgrade Guide](https://nextjs.org/docs/pages/guides/upgrading/version-13)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Next.js Codemods](https://nextjs.org/docs/app/guides/upgrading/codemods)