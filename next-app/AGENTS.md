# Charmtop Next.js Site - Agent Guide

## Project Structure

This is a Next.js 15 site with App Router, built for static export to AWS Amplify.

```
next-app/
  content/           # All site content as MDX files with YAML frontmatter
    blog/            # Blog posts
      en/            # English blog posts (default)
      zh/            # Chinese blog posts
    services/        # Service pages
      en/            # English services (default)
      zh/            # Chinese services
    casestudies/     # Case study pages
      en/            # English case studies (default)
      zh/            # Chinese case studies
    pages/           # Static pages
      en/            # English pages (default)
      zh/            # Chinese pages
  src/
    app/             # Next.js App Router pages
      (pages)/       # English routes
      zh/            # Chinese routes (/zh/*)
    components/      # React components (ui, navigation, footer, etc.)
    lib/             # Utilities and site config
    types/           # TypeScript interfaces
  public/            # Static assets (images, logos)
  dist/              # Build output (static HTML)
```

## Content Update Strategy (Git-Based)

This site uses a **Git-based content workflow** — no database or CMS required.

### How it works
1. You (or your AI agent) write/edit MDX files in `content/`
2. Commit and push to the GitHub repository
3. AWS Amplify detects the push, runs `npm run build`, and deploys the static site
4. New content is live within 2–5 minutes

### Why this works with AWS Amplify
- Amplify has **continuous deployment** from GitHub
- The `amplify.yml` at repo root tells Amplify how to build the Next.js app
- Static export (`output: "export"`) means no server needed — just HTML, CSS, JS

---

## Bilingual Content Structure

The site supports **English (default)** and **Traditional Chinese (zh)**.

### Content directories

| Type | English | Chinese |
|------|---------|---------|
| Blog | `content/blog/` | `content/blog/zh/` |
| Services | `content/services/` | `content/services/zh/` |
| Case Studies | `content/casestudies/` | `content/casestudies/zh/` |
| Pages | `content/pages/` | `content/pages/zh/` |

### Routes

| Page | English | Chinese |
|------|---------|---------|
| Home | `/` | `/zh/` |
| About | `/about/` | `/zh/about/` |
| Services | `/services/` | `/zh/services/` |
| Service detail | `/services/{slug}/` | `/zh/services/{slug}/` |
| Case Studies | `/casestudies/` | `/zh/casestudies/` |
| Case detail | `/casestudies/{slug}/` | `/zh/casestudies/{slug}/` |
| Blog | `/blog/` | `/zh/blog/` |
| Blog post | `/blog/{slug}/` | `/zh/blog/{slug}/` |
| Contact | `/contact/` | `/zh/contact/` |
| Privacy Policy | `/privacy-policy/` | `/zh/privacy-policy/` |

### When publishing new content

**Always write BOTH English and Chinese versions.**

For example, a new blog post should create:
- `content/blog/my-post.mdx` (English)
- `content/blog/zh/my-post.mdx` (Chinese)

Both files should have the **same slug** (filename) so the language switcher links them correctly.

---

## How to Update Content

### Adding/Editing Blog Posts

Create or edit `.mdx` files in `content/blog/` (English) and `content/blog/zh/` (Chinese):

```mdx
---
title: "Post Title"
description: "Short description for SEO and cards"
date: "2025-01-01T00:00:00+08:00"
image: "/images/photo.jpg"
categories: ["Technology"]
author: "Author Name"
tags: ["tag1", "tag2"]
draft: false
---

Your markdown content here.

## Section Heading

- Bullet points
- Are supported

> Blockquotes work too
```

**Important:**
- Use `date` in ISO format with timezone (e.g., `+08:00` for Hong Kong)
- `image` path must start with `/images/` (absolute path)
- `slug` is derived from the filename (e.g., `my-post.mdx` → `/blog/my-post/`)
- Set `draft: true` to hide a post from the listing
- **MDX syntax rules**: All HTML tags must be valid JSX:
  - Self-close void tags: `<hr />`, `<img src="..." />`, `<br />`
  - Use `className` instead of `class` in JSX tags
  - Escape `<` characters that look like tags (e.g., write `&lt;6` instead of `<6`)

### Adding/Editing Services

Create or edit `.mdx` files in `content/services/` and `content/services/zh/`:

```mdx
---
title: "Service Name"
description: "Service description"
image: "/images/service.jpg"
tags: ["tag1", "tag2"]
---

Your markdown content here.
```

### Adding/Editing Case Studies

Create or edit `.mdx` files in `content/casestudies/` and `content/casestudies/zh/`:

```mdx
---
title: "Case Study Title"
image: "/images/case.jpg"
description: "Case study description"
---

Your markdown content here.
```

### Updating Site Config

Edit `src/lib/site-config.ts` to update:
- Navigation menu (both `en` and `zh` arrays)
- Company info
- Social links
- Site metadata

---

## How to Update Corporate Assets

Place images in `public/images/` and reference them with `/images/filename.jpg`.

Logos should be placed at:
- `public/logo.png` (light mode)
- `public/logo-darkmode.png` (dark mode)

For blog post images, place them in `public/images/` and reference in frontmatter:
```yaml
image: "/images/my-blog-photo.jpg"
```

---

## Build & Deploy

```bash
cd next-app
npm install
npm run build
```

The static site is output to `next-app/dist/`.

AWS Amplify CI/CD is configured in the root `amplify.yml`.

---

## Hermes Agent Integration Guide

### Recommended Skills for Hermes

1. **Git Skill** — `git clone`, `git add`, `git commit`, `git push`
   - The agent needs write access to the GitHub repository
   - Use a deploy key or personal access token (PAT) with `repo` scope

2. **File System Skill** — Read/write files, create directories
   - Write MDX files to `content/blog/` and `content/blog/zh/`
   - Save images to `public/images/`

3. **Markdown/MDX Skill** — Generate properly formatted MDX with YAML frontmatter
   - Must validate frontmatter fields
   - Must escape special characters in YAML strings
   - Must use valid JSX syntax (self-closing tags, `className` not `class`)

4. **Date/Time Skill** — Generate correct ISO timestamps with HK timezone

5. **Image Download Skill** — Download images from URLs to `public/images/`
   - Resize/compress if needed before saving
   - Use descriptive filenames (e.g., `ai-surveillance-guide.jpg`)

### Workflow: LinkedIn Post → Blog Post

When Hermes creates a LinkedIn post, it can simultaneously:

1. **Generate English blog post** expanding on the LinkedIn content
2. **Generate Chinese blog post** translating/adapting the content
3. **Save both posts**:
   - `content/blog/{slug}.mdx` (English)
   - `content/blog/zh/{slug}.mdx` (Chinese)
4. **Download any images** used in the post to `public/images/`
5. **Update frontmatter** on BOTH files with:
   - `title`: Blog post title (translated for Chinese)
   - `description`: SEO description (translated for Chinese)
   - `date`: Same timestamp on both
   - `image`: Same image path on both
   - `categories`: Relevant categories
   - `tags`: Relevant tags (can be translated)
   - `author`: Same author on both
6. **Git commit** with message like `content: add blog post "{title}" (EN+ZH)`
7. **Git push** to trigger Amplify deployment

### Workflow: YouTube Video → Blog Post

When Hermes uploads a YouTube video, it can:

1. **Create English blog post** summarizing the video
2. **Create Chinese blog post** translating the summary
3. **Embed the video** in the MDX content using standard markdown:
   ```mdx
   Watch the full video below:

   <iframe width="100%" height="400" src="https://www.youtube.com/embed/VIDEO_ID" title="Video title" frameBorder="0" allowFullScreen></iframe>
   ```
4. **Save to `content/blog/` and `content/blog/zh/`**, commit, and push

### Frontmatter Template for Blog Posts

```mdx
---
title: "Your Post Title"
meta_title: "Optional SEO title (if different from title)"
description: "1-2 sentence description for SEO and social cards"
date: "2025-04-24T15:00:00+08:00"
image: "/images/your-image.jpg"
categories: ["Technology", "AI"]
author: "Charmtop Team"
tags: ["tag1", "tag2", "tag3"]
draft: false
---

# Your content here
```

### Validation Rules for Hermes

- **Slug (filename)**: Use kebab-case, lowercase, no spaces (e.g., `ai-surveillance-guide.mdx`)
- **Title**: 30–60 characters ideal for SEO
- **Description**: 120–160 characters for meta description
- **Date**: Always use Hong Kong timezone (`+08:00`)
- **Image**: Must exist in `public/images/` before referencing
- **Tags**: 3–8 tags per post, lowercase, hyphenated if multi-word
- **Categories**: Use existing categories when possible
- **Bilingual**: Always create both EN and ZH versions with matching filenames

### Git Commit Strategy

```bash
cd /path/to/charmtop/repo

git add next-app/content/blog/new-post.mdx next-app/content/blog/zh/new-post.mdx next-app/public/images/new-image.jpg
git commit -m "content: add blog post 'Your Post Title' (EN+ZH)"
git push origin main
```

After push, AWS Amplify will automatically build and deploy.

---

## Troubleshooting

### Build fails after content update
- Check MDX frontmatter syntax (ensure no unescaped quotes in YAML)
- Verify image paths start with `/images/`
- Check for invalid JSX in MDX (use `<hr />` not `<hr>`, `<img ... />` not `<img ...>`)
- Escape `<` characters that could be parsed as JSX tags
- Run `cd next-app && npm run build` locally to catch errors

### New post not appearing
- Check `draft: false` in frontmatter
- Ensure the file has `.mdx` extension
- Check Amplify build logs in AWS Console

### Images not loading
- Verify image exists in `public/images/`
- Use absolute paths (`/images/photo.jpg`) not relative paths
- Check case sensitivity in filenames

### Turbopack cache corruption (dev server)
If the dev server crashes with SST file errors:
```bash
cd next-app
rm -rf .next dist/dev
npm run dev
```
