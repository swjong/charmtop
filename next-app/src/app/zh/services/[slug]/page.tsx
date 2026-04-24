import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAllServices, getServiceBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

export async function generateStaticParams() {
  const services = getAllServices("zh");
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug, "zh");
  if (!service) return {};
  return {
    title: service.meta_title || service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug, "zh");
  if (!service) return notFound();

  return (
    <article className="container max-w-3xl py-12 md:py-20">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/zh/services">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回服務
        </Link>
      </Button>

      {service.image && (
        <div className="mb-8 overflow-hidden rounded-xl border bg-muted">
          <div className="aspect-[21/9] w-full">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {service.title}
      </h1>

      <p className="mt-4 text-lg text-muted-foreground">{service.description}</p>

      <Separator className="my-8" />

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={service.content} components={mdxComponents} />
      </div>

      {service.tags && service.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {service.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-12 flex items-center gap-2 rounded-lg border bg-muted/30 p-6">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium">需要此服務？</span>
        <Button className="ml-auto" asChild>
          <Link href="/zh/contact">聯絡我們</Link>
        </Button>
      </div>
    </article>
  );
}
