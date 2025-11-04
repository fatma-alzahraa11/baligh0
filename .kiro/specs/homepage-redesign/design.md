# Design Document

## Overview

The homepage redesign will transform the existing Islamic knowledge platform homepage into a more modern, engaging, and content-rich experience. The design follows a vertical scrolling layout with distinct sections, each serving a specific purpose in the user journey. The redesign maintains the existing teal color scheme while introducing more sophisticated visual treatments, improved content hierarchy, and enhanced interactivity.

The design leverages the existing React + TypeScript + Tailwind CSS stack and integrates with the current Supabase backend for dynamic content. The layout is inspired by modern content platforms with multiple content discovery sections, promotional areas, and clear calls-to-action.

## Architecture

### Component Structure

```
src/
├── pages/
│   └── Home.tsx (redesigned)
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedArticlesSection.tsx
│   │   ├── PopularArticlesSection.tsx
│   │   ├── RecommendedSection.tsx
│   │   ├── PromotionalSection.tsx
│   │   └── CTASection.tsx
│   ├── shared/
│   │   ├── ContentCard.tsx
│   │   ├── PopularCard.tsx
│   │   ├── RecommendedCard.tsx
│   │   └── PromotionalCard.tsx
│   ├── Navigation.tsx (existing)
│   └── Footer.tsx (existing)
├── lib/
│   └── supabase.ts (existing)
└── types/
    └── content.ts (new)
```

### Data Flow

1. **Home.tsx** serves as the main container component
2. Each section component fetches its own data from Supabase or receives props
3. Shared card components are reusable across different sections
4. Content types are defined in TypeScript interfaces for type safety
5. Lazy loading is implemented for images using native browser APIs

### State Management

- Local component state using React hooks for section-specific data
- No global state management needed for the homepage
- Data fetching occurs on component mount using useEffect
- Loading states managed per section to avoid blocking the entire page

## Components and Interfaces

### 1. HeroSection Component

**Purpose:** Create an impactful first impression with a large banner, headline, and primary CTA

**Props:**
```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: {
    text: string;
    onClick: () => void;
  };
  ctaSecondary?: {
    text: string;
    onClick: () => void;
  };
  backgroundImage?: string;
}
```

**Visual Design:**
- Full-width section with gradient background (teal-600 to teal-800)
- Optional background image with overlay
- Centered content with large typography
- Two CTA buttons (primary and secondary)
- Decorative elements (subtle patterns or shapes)
- Minimum height: 500px on desktop, 400px on mobile

**Responsive Behavior:**
- Desktop: Full-width with large text (text-6xl)
- Tablet: Reduced padding and text size (text-5xl)
- Mobile: Stacked buttons, smaller text (text-4xl)

### 2. FeaturedArticlesSection Component

**Purpose:** Showcase curated or highlighted content in a prominent grid layout

**Props:**
```typescript
interface FeaturedArticlesSectionProps {
  title: string;
  articles: FeaturedArticle[];
  onViewAll: () => void;
}

interface FeaturedArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  author?: string;
  readTime?: string;
}
```

**Visual Design:**
- Section header with title and "View All" link
- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Each card includes:
  - Image (aspect ratio 16:9)
  - Category badge
  - Title (2 lines max)
  - Description (3 lines max)
  - Metadata (date, author, read time)
  - Hover effect: subtle lift and shadow increase
- White background with subtle shadows
- Spacing: 24px gap between cards

**Data Source:**
- Fetches from Supabase `library_items` table
- Filters for featured items or sorts by view count
- Limits to 6 items

### 3. PopularArticlesSection Component

**Purpose:** Display trending or most-viewed content with visual emphasis

**Props:**
```typescript
interface PopularArticlesSectionProps {
  title: string;
  articles: PopularArticle[];
}

interface PopularArticle {
  id: string;
  title: string;
  image: string;
  viewCount: number;
  category: string;
}
```

**Visual Design:**
- Dark background (gray-900 or teal-900) for contrast
- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Each card features:
  - Large image with dark overlay
  - Title overlaid on image (white text)
  - View count badge with icon
  - Category badge
  - Hover effect: image zoom, overlay lightens
- Cards have rounded corners and overflow hidden for zoom effect

**Data Source:**
- Fetches from Supabase `questions` or `library_items`
- Sorts by view_count descending
- Limits to 3-6 items

### 4. RecommendedSection Component

**Purpose:** Display personalized or latest content recommendations

**Props:**
```typescript
interface RecommendedSectionProps {
  title: string;
  items: RecommendedItem[];
  layout?: 'grid' | 'list';
}

interface RecommendedItem {
  id: string;
  title: string;
  image: string;
  price?: string;
  category: string;
  tags: string[];
  description: string;
}
```

**Visual Design:**
- Light background (white or gray-50)
- Grid layout: 4-5 columns on desktop, 3 on tablet, 2 on mobile
- Each card includes:
  - Square or portrait image
  - Title (1-2 lines)
  - Category tags (colored badges)
  - Price or metadata
  - Action button ("View" or "Read More")
- Compact card design with minimal padding
- Hover effect: button color change, subtle shadow

**Data Source:**
- Fetches latest items from Supabase
- Can be filtered by category or user preferences
- Limits to 8-10 items

### 5. PromotionalSection Component

**Purpose:** Highlight special categories, features, or offerings

**Props:**
```typescript
interface PromotionalSectionProps {
  title: string;
  promotions: PromotionalCard[];
  backgroundColor?: string;
}

interface PromotionalCard {
  id: string;
  icon: React.ComponentType;
  title: string;
  description: string;
  link: string;
}
```

**Visual Design:**
- Distinct background color (teal-500 or custom brand color)
- White text for contrast
- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Each card features:
  - Large icon (from lucide-react)
  - Title
  - Short description
  - Subtle hover effect
- Cards have white or semi-transparent background
- Rounded corners and consistent padding

**Data Source:**
- Static content defined in component or fetched from CMS
- Typically 3-4 promotional items

### 6. CTASection Component

**Purpose:** Final call-to-action before footer to drive engagement

**Props:**
```typescript
interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  backgroundColor?: string;
}
```

**Visual Design:**
- Full-width section with gradient background
- Centered content
- Large title and description
- Prominent CTA button
- Minimal design to focus attention
- Padding: 80px vertical on desktop, 60px on mobile

### 7. Shared Card Components

**ContentCard:**
- Reusable card for featured articles
- Includes image, title, description, metadata
- Configurable hover effects

**PopularCard:**
- Image-focused card with overlay text
- View count display
- Zoom effect on hover

**RecommendedCard:**
- Compact card for grid layouts
- Tag display
- Action button

**PromotionalCard:**
- Icon-based card
- Minimal design
- Link or button interaction

## Data Models

### TypeScript Interfaces

```typescript
// src/types/content.ts

export interface FeaturedArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  author?: string;
  readTime?: string;
  slug: string;
}

export interface PopularArticle {
  id: string;
  title: string;
  image: string;
  viewCount: number;
  category: string;
  slug: string;
}

export interface RecommendedItem {
  id: string;
  title: string;
  image: string;
  price?: string;
  category: string;
  tags: string[];
  description: string;
  slug: string;
}

export interface PromotionalCard {
  id: string;
  icon: string; // Icon name from lucide-react
  title: string;
  description: string;
  link: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
}
```

### Supabase Schema Extensions

The existing Supabase schema already includes `questions` and `library_items` tables. We'll leverage these with additional queries:

**Featured Articles Query:**
```sql
SELECT * FROM library_items 
WHERE featured = true 
ORDER BY created_at DESC 
LIMIT 6;
```

**Popular Articles Query:**
```sql
SELECT * FROM library_items 
ORDER BY view_count DESC 
LIMIT 6;
```

**Recommended Items Query:**
```sql
SELECT * FROM library_items 
ORDER BY created_at DESC 
LIMIT 10;
```

## Error Handling

### Data Fetching Errors

1. **Network Errors:**
   - Display fallback content or cached data
   - Show user-friendly error message
   - Provide retry button

2. **Empty States:**
   - Display placeholder cards with skeleton loaders
   - Show "No content available" message with CTA to explore other sections

3. **Image Loading Errors:**
   - Use fallback placeholder images
   - Display icon-based fallback (BookOpen, Image icons)
   - Maintain layout integrity with aspect ratio boxes

### Implementation

```typescript
// Error boundary for each section
const [error, setError] = useState<Error | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('library_items')
        .select('*')
        .limit(6);
      
      if (error) throw error;
      setContent(data);
    } catch (err) {
      setError(err as Error);
      console.error('Failed to fetch content:', err);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);

// Render logic
if (loading) return <SkeletonLoader />;
if (error) return <ErrorFallback onRetry={fetchData} />;
if (!content.length) return <EmptyState />;
```

## Testing Strategy

### Unit Tests

1. **Component Rendering:**
   - Test each section component renders with props
   - Verify correct number of cards displayed
   - Check responsive class names applied

2. **Data Transformation:**
   - Test data mapping from Supabase to component props
   - Verify date formatting
   - Check fallback values for optional fields

3. **User Interactions:**
   - Test button click handlers
   - Verify navigation calls
   - Check hover state changes

### Integration Tests

1. **Data Fetching:**
   - Mock Supabase client
   - Test successful data fetch and display
   - Test error handling and retry logic

2. **Section Interactions:**
   - Test "View All" navigation
   - Test card click navigation
   - Test CTA button actions

### Visual Regression Tests

1. **Responsive Layouts:**
   - Capture screenshots at mobile, tablet, desktop breakpoints
   - Verify grid layouts adjust correctly
   - Check text truncation and image aspect ratios

2. **Hover States:**
   - Capture hover effects on cards
   - Verify button state changes
   - Check overlay effects

### Accessibility Tests

1. **Keyboard Navigation:**
   - Test tab order through sections
   - Verify focus indicators visible
   - Check Enter/Space key activation

2. **Screen Reader:**
   - Test ARIA labels present
   - Verify semantic HTML structure
   - Check alt text on images

3. **Color Contrast:**
   - Verify text meets WCAG AA standards
   - Check button contrast ratios
   - Test with color blindness simulators

## Performance Considerations

### Image Optimization

1. **Lazy Loading:**
   - Implement native lazy loading: `loading="lazy"`
   - Use Intersection Observer for custom lazy loading
   - Load hero section images immediately

2. **Image Formats:**
   - Use WebP with JPEG fallback
   - Implement responsive images with srcset
   - Compress images to < 200KB

3. **CDN Delivery:**
   - Serve images from Supabase Storage CDN
   - Implement image transformations at CDN level
   - Cache images with appropriate headers

### Code Splitting

1. **Component Lazy Loading:**
   - Lazy load below-the-fold sections
   - Use React.lazy() for section components
   - Implement Suspense boundaries

2. **Bundle Optimization:**
   - Tree-shake unused Tailwind classes
   - Minimize lucide-react imports
   - Code split by route

### Data Fetching

1. **Parallel Requests:**
   - Fetch all section data in parallel
   - Use Promise.all() for multiple queries
   - Don't block rendering on slow requests

2. **Caching:**
   - Implement client-side caching for static content
   - Use stale-while-revalidate pattern
   - Cache promotional content longer

## Design Tokens

### Colors

```typescript
const colors = {
  primary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    500: '#14b8a6', // teal-500
    600: '#0d9488', // teal-600
    700: '#0f766e', // teal-700
    800: '#115e59', // teal-800
    900: '#134e4a', // teal-900
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    600: '#4b5563',
    800: '#1f2937',
    900: '#111827',
  }
};
```

### Typography

```typescript
const typography = {
  hero: {
    title: 'text-4xl md:text-6xl font-bold',
    subtitle: 'text-xl md:text-2xl',
  },
  section: {
    title: 'text-3xl font-bold',
    subtitle: 'text-lg text-gray-600',
  },
  card: {
    title: 'text-lg font-semibold',
    description: 'text-sm text-gray-600',
    metadata: 'text-xs text-gray-500',
  }
};
```

### Spacing

```typescript
const spacing = {
  section: {
    padding: 'py-16 md:py-20',
    gap: 'gap-6 md:gap-8',
  },
  card: {
    padding: 'p-4 md:p-6',
    gap: 'gap-3 md:gap-4',
  }
};
```

### Shadows

```typescript
const shadows = {
  card: 'shadow-md hover:shadow-xl',
  button: 'shadow-lg',
};
```

## Responsive Breakpoints

- **Mobile:** < 768px (1 column)
- **Tablet:** 768px - 1024px (2 columns)
- **Desktop:** > 1024px (3-4 columns)

## Animation and Transitions

1. **Hover Effects:**
   - Transform: `hover:-translate-y-1`
   - Shadow: `hover:shadow-xl`
   - Scale: `hover:scale-105`
   - Duration: `transition-all duration-300`

2. **Image Zoom:**
   - Transform: `group-hover:scale-110`
   - Duration: `duration-300`
   - Overflow: `overflow-hidden`

3. **Loading States:**
   - Skeleton shimmer animation
   - Fade-in on content load
   - Smooth transitions between states

## Accessibility Features

1. **Semantic HTML:**
   - Use `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
   - Proper heading hierarchy (h1 → h2 → h3)

2. **ARIA Labels:**
   - `aria-label` on icon-only buttons
   - `aria-describedby` for card descriptions
   - `role="region"` for major sections

3. **Keyboard Navigation:**
   - All interactive elements focusable
   - Visible focus indicators
   - Logical tab order

4. **Color Contrast:**
   - Text: minimum 4.5:1 ratio
   - Large text: minimum 3:1 ratio
   - Interactive elements: minimum 3:1 ratio

## Implementation Notes

1. **Maintain Existing Navigation:**
   - Keep current Navigation and Footer components
   - Ensure consistent styling with new sections

2. **Supabase Integration:**
   - Use existing supabase client from `lib/supabase.ts`
   - Leverage existing Question and LibraryItem types
   - Add new queries as needed

3. **Tailwind Configuration:**
   - Ensure all custom colors are in tailwind.config.js
   - Use JIT mode for dynamic classes
   - Purge unused styles in production

4. **Progressive Enhancement:**
   - Core content accessible without JavaScript
   - Enhanced interactions with JavaScript enabled
   - Graceful degradation for older browsers
