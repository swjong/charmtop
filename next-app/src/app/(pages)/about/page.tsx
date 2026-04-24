import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Page } from "@/types/content";
import { Building2, Target, Shield, Users, Clock } from "lucide-react";
import { TimeAwareImage } from "@/components/time-aware-image";

function getPageContent(slug: string): (Page & { content: string }) | null {
  const filePath = path.join(process.cwd(), "content/pages", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as Page), content };
}

export const metadata = {
  title: "About",
  description: "Learn more about Charmtop Consultants",
};

export default function AboutPage() {
  const page = getPageContent("about");
  if (!page) return <div className="container py-20">Page not found</div>;

  const values = [
    { icon: <Target className="h-5 w-5" />, title: "Mission Focused", desc: "Delivering practical IT solutions that drive real business results." },
    { icon: <Shield className="h-5 w-5" />, title: "Trusted Partner", desc: "Building long-term relationships through reliable service and support." },
    { icon: <Users className="h-5 w-5" />, title: "Client Centric", desc: "Understanding your business needs before recommending solutions." },
    { icon: <Clock className="h-5 w-5" />, title: "Always Available", desc: "Responsive support when you need it most, minimizing downtime." },
  ];

  return (
    <div className="container max-w-3xl py-12 md:py-20">
      <div className="text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Building2 className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{page.title}</h1>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border bg-muted">
        <div className="aspect-[21/9] w-full">
          <TimeAwareImage
            daySrc="/images/hk-day.jpg"
            nightSrc="/images/hk-night.jpg"
            alt="Hong Kong skyline"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-10 prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={page.content} components={mdxComponents} />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {v.icon}
              </div>
              <div>
                <h3 className="font-semibold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
