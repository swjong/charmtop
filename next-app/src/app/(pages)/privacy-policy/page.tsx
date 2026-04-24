import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Page } from "@/types/content";

function getPageContent(slug: string): (Page & { content: string }) | null {
  const filePath = path.join(process.cwd(), "content/pages", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as Page), content };
}

export const metadata = {
  title: "Privacy Policy",
  description: "Charmtop Consultants privacy policy",
};

export default function PrivacyPolicyPage() {
  const page = getPageContent("privacy-policy");
  if (!page) return <div className="container py-20">Page not found</div>;

  return (
    <div className="container max-w-3xl py-12 md:py-20">
      <h1 className="text-4xl font-bold tracking-tight">{page.title}</h1>
      <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={page.content} components={mdxComponents} />
      </div>
    </div>
  );
}
