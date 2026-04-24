import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Page } from "@/types/content";

function getPageContent(slug: string, lang: string = "zh"): (Page & { content: string }) | null {
  const dir = lang === "zh" ? "pages/zh" : "pages";
  const filePath = path.join(process.cwd(), "content", dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as Page), content };
}

export const metadata = {
  title: "私隱政策",
  description: "創高顧問私隱政策",
};

export default function PrivacyPolicyPage() {
  const page = getPageContent("privacy-policy", "zh");
  if (!page) return <div className="container py-20">找不到頁面</div>;

  return (
    <div className="container max-w-3xl py-12 md:py-20">
      <h1 className="text-4xl font-bold tracking-tight">{page.title}</h1>
      <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={page.content} components={mdxComponents} />
      </div>
    </div>
  );
}
