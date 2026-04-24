import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCaseStudies } from "@/lib/content";

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FolderOpen className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Case Studies</h1>
        <p className="mt-4 text-muted-foreground">
          Real-world solutions and success stories from our clients
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <Card key={study.slug} className="overflow-hidden transition-all hover:shadow-md">
            {study.image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{study.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {study.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                <Link href={`/casestudies/${study.slug}`} className="hover:underline">
                  Read more
                </Link>
                <ArrowRight className="h-3 w-3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
