import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, Service, CaseStudy, Page } from "@/types/content";

const contentDir = path.join(process.cwd(), "content");

interface WithDraft {
  draft?: boolean;
}

function readMdxFiles<T extends { slug: string } & WithDraft>(
  dir: string,
): (T & { content: string; slug: string })[] {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];

  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullDir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");
      return { ...(data as T), slug, content };
    })
    .filter((item) => !item.draft) as (T & { content: string; slug: string })[];
}

// Blog posts
export function getAllBlogPosts(lang: string = "en"): (BlogPost & { content: string; slug: string })[] {
  const dir = lang === "zh" ? "blog/zh" : "blog";
  return readMdxFiles<BlogPost>(dir).sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
  );
}

export function getBlogPostBySlug(slug: string, lang: string = "en"): (BlogPost & { content: string; slug: string }) | null {
  const posts = getAllBlogPosts(lang);
  return posts.find((p) => p.slug === slug) || null;
}

// Services
export function getAllServices(lang: string = "en"): (Service & { content: string; slug: string })[] {
  const dir = lang === "zh" ? "services/zh" : "services";
  return readMdxFiles<Service>(dir);
}

export function getServiceBySlug(slug: string, lang: string = "en"): (Service & { content: string; slug: string }) | null {
  const services = getAllServices(lang);
  return services.find((s) => s.slug === slug) || null;
}

// Case Studies
export function getAllCaseStudies(lang: string = "en"): (CaseStudy & { content: string; slug: string })[] {
  const dir = lang === "zh" ? "casestudies/zh" : "casestudies";
  return readMdxFiles<CaseStudy>(dir);
}

export function getCaseStudyBySlug(slug: string, lang: string = "en"): (CaseStudy & { content: string; slug: string }) | null {
  const studies = getAllCaseStudies(lang);
  return studies.find((s) => s.slug === slug) || null;
}

// Pages
export function getPageContent(slug: string, lang: string = "en"): (Page & { content: string }) | null {
  const dir = lang === "zh" ? "pages/zh" : "pages";
  const filePath = path.join(contentDir, dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as Page), content };
}

// Tags & Categories
export function getAllTags(lang: string = "en"): string[] {
  const posts = getAllBlogPosts(lang);
  const services = getAllServices(lang);
  const allTags = new Set<string>();
  posts.forEach((p) => p.tags?.forEach((t) => allTags.add(t)));
  services.forEach((s) => s.tags?.forEach((t) => allTags.add(t)));
  return Array.from(allTags).sort();
}

export function getAllCategories(lang: string = "en"): string[] {
  const posts = getAllBlogPosts(lang);
  const allCategories = new Set<string>();
  posts.forEach((p) => p.categories?.forEach((c) => allCategories.add(c)));
  return Array.from(allCategories).sort();
}
