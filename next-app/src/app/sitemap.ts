import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import {
  getAllBlogPosts,
  getAllServices,
  getAllCaseStudies,
} from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.baseUrl;

  const enRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about/`, lastModified: new Date() },
    { url: `${baseUrl}/services/`, lastModified: new Date() },
    { url: `${baseUrl}/casestudies/`, lastModified: new Date() },
    { url: `${baseUrl}/blog/`, lastModified: new Date() },
    { url: `${baseUrl}/contact/`, lastModified: new Date() },
    { url: `${baseUrl}/privacy-policy/`, lastModified: new Date() },
  ];

  const zhRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/zh/`, lastModified: new Date() },
    { url: `${baseUrl}/zh/about/`, lastModified: new Date() },
    { url: `${baseUrl}/zh/services/`, lastModified: new Date() },
    { url: `${baseUrl}/zh/casestudies/`, lastModified: new Date() },
    { url: `${baseUrl}/zh/blog/`, lastModified: new Date() },
    { url: `${baseUrl}/zh/contact/`, lastModified: new Date() },
    { url: `${baseUrl}/zh/privacy-policy/`, lastModified: new Date() },
  ];

  const posts = getAllBlogPosts("en").map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  const zhPosts = getAllBlogPosts("zh").map((post) => ({
    url: `${baseUrl}/zh/blog/${post.slug}/`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  const services = getAllServices("en").map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`,
    lastModified: new Date(),
  }));

  const zhServices = getAllServices("zh").map((service) => ({
    url: `${baseUrl}/zh/services/${service.slug}/`,
    lastModified: new Date(),
  }));

  const caseStudies = getAllCaseStudies("en").map((study) => ({
    url: `${baseUrl}/casestudies/${study.slug}/`,
    lastModified: new Date(),
  }));

  const zhCaseStudies = getAllCaseStudies("zh").map((study) => ({
    url: `${baseUrl}/zh/casestudies/${study.slug}/`,
    lastModified: new Date(),
  }));

  return [
    ...enRoutes,
    ...zhRoutes,
    ...posts,
    ...zhPosts,
    ...services,
    ...zhServices,
    ...caseStudies,
    ...zhCaseStudies,
  ];
}
