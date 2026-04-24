import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

export async function generateStaticParams() {
  const studies = getAllCaseStudies("zh");
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug, "zh");
  if (!study) return {};
  return {
    title: study.title,
    description: study.description,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug, "zh");
  if (!study) return notFound();

  return (
    <article className="container max-w-3xl py-12 md:py-20">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/zh/casestudies">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回案例研究
        </Link>
      </Button>

      {study.image && (
        <div className="mb-8 overflow-hidden rounded-xl border bg-muted">
          <div className="aspect-[21/9] w-full">
            <img src={study.image} alt={study.title} className="h-full w-full object-cover" />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <FolderOpen className="h-4 w-4" />
        <span>案例研究</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {study.title}
      </h1>

      <p className="mt-4 text-lg text-muted-foreground">{study.description}</p>

      <Separator className="my-8" />

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={study.content} components={mdxComponents} />
      </div>
    </article>
  );
}
