# MedEnterprises Job Listings Platform

A Next.js job listings application with SEO, analytics, and filtering. Displays medical job openings with full technical SEO and conversion tracking.

## Setup Instructions

```bash
git clone <repo-url> && cd medenterprises
npm install
npm run dev  # Development server
npm run build  # Production build
npm test  # Run tests
```

## Live URL

Not yet deployed. Add Vercel deployment URL here when available.

## Rendering Strategy - Detailed Justification

### Current Choice: ISR (Incremental Static Regeneration)

#### Why ISR for Job Board with External Feed
- Job listings live in external feed that recruiters update throughout the day (add, close, edit jobs)
- ISR serves cached static pages while automatically re-fetching and rebuilding in background (~60s-1hr intervals)
- Pre-rendered HTML means search engines instantly read JSON-LD and metadata (full SEO support)
- Blazing-fast load times of SSG with freshness of SSR

#### Performance
Cached hits = ~50ms TTFB (same as SSG); revalidation hits ~200ms then cached.

#### Graceful Scaling
`generateStaticParams` with `fallback: 'blocking'` handles unknown slugs via SSR on first hit, then caches.

### Why NOT SSG for Production
- Requires full site rebuild every time a typo is fixed in job description (unacceptable for daily updates)
- If using SSG, would need webhooks from CMS to trigger targeted rebuilds (valid but more complex than ISR)

### Why NOT SSR for Production
- Unnecessary server load fetching exact same external feed for every visitor, even if jobs haven't changed in hours
- No caching benefit; higher latency (~300-500ms TTFB) for repeat visitors

### Implementation in This Exercise
- Use `export const revalidate = 3600` in page components for hourly updates
- Use `fetch(url, { next: { revalidate: 3600 } })` in data fetching layer
- Pre-generate all 5 fixture job slugs at build time via `generateStaticParams`
- Fixture data is static, so ISR behaves like SSG during development (no revalidation triggered)

## Real External Feed Integration - Step-by-Step

### Step 1: Replace fixture data in `lib/data/jobs.ts`
- Remove static array export
- Create API fetching function with `fetch` and `next: { revalidate: 3600 }` (already configured in ISR setup)

### Step 2: Update `lib/jobs.ts` to use API instead of local data
```typescript
export async function getAllJobs(): Promise<Job[]> {
  const res = await fetch('https://external-feed.com/api/jobs', {
    headers: { 'Authorization': `Bearer ${process.env.API_KEY}` },
    next: { revalidate: 3600 } // Already configured for ISR
  });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}
```

### Step 3: ISR already configured - just update API endpoint
- `export const revalidate = 3600` already added to page components
- `fetch` with `next: { revalidate: 3600 }` already in data layer
- Pages will revalidate every hour automatically

### Step 4: Handle `generateStaticParams` for unknown future slugs
- Already configured with `fallback: 'blocking'` - SSR on first hit, then cache

### Step 5: Add error handling and retry logic
- Wrap API calls in try-catch
- Return fallback data or error page if API fails

## Analytics Stub → Real GTM

- Stub: `window.dataLayer.push()` in ApplyButton
- Real: Add GTM script to `layout.tsx`, configure triggers in GTM dashboard

## Trade-offs Reflection - Thoughtful Analysis

### ISR for Job Board with External Feed
- *Decision*: Chose ISR for automatic revalidation and graceful scaling of dynamic routes
- *Trade-off*: Slightly more complex than SSG; first hit after revalidate is ~200ms
- *Alternative considered*: SSG with webhooks to trigger rebuilds - valid but requires CMS integration

### Client-side filters vs Server-side filters
- *Decision*: Client-side filtering with URL state
- *Trade-off*: Fast UX after initial load, but search engines don't execute JS for crawling
- *Alternative considered*: Server-side filtering via `next/navigation` `useSearchParams` in Server Component - better SEO but slower filter changes

### JSON-LD as script tag vs library
- *Decision*: Manual script tag injection
- *Trade-off*: Simple but no TypeScript validation; schema errors only caught at runtime
- *Alternative considered*: `schema-dts` library for typed JSON-LD - rejected to keep dependencies minimal

### No actual apply flow
- *Decision*: Apply button is a stub with analytics only
- *Trade-off*: No real conversion tracking; button doesn't lead to application form
- *Reason*: Out of scope for this exercise; would integrate with ATS (Applicant Tracking System) in production

### Tailwind CSS vs CSS Modules
- *Decision*: Use Tailwind CSS (already in project)
- *Trade-off*: Rapid development but larger bundle size; less control over specificity

### dangerouslySetInnerHTML for job description
- *Decision*: Use `dangerouslySetInnerHTML` to render HTML description
- *Trade-off*: XSS risk if external feed contains malicious HTML
- *Mitigation*: In production, sanitize HTML with `DOMPurify` or use React HTML parser

## AI Usage Transparency

- Generated JSON-LD structure with AI assistance
- Assisted in drafting documentation and trade-offs analysis

## Next Steps (More Time)

- Actual job application form with validation
- Server-side filtering with URL state for better SEO
- Pagination, search, RSS feed

## Production Readiness Gaps

- **Error Boundaries**: Add `error.tsx` files for graceful error handling
- **Loading States**: Add `loading.tsx` for better UX during navigation
- **Security**: Sanitize HTML descriptions, validate API inputs, use HTTPS
- **Accessibility**: Full a11y audit (ARIA labels, keyboard nav, screen reader support)
- **Performance**: Bundle analysis, code splitting, image optimization with `next/image`
- **Monitoring**: Error tracking (Sentry), performance monitoring (Core Web Vitals)
- **CI/CD**: GitHub Actions for automated testing, linting, building, deployment
- **Environment Config**: Proper env vars for API URLs, analytics IDs, feature flags
- **SEO**: robots.txt, additional meta tags, social media card optimization
- **Testing**: Increase coverage to >80%, add E2E tests with Playwright
