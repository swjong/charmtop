import Link from "next/link";
import { ArrowRight, Cable, Shield, FlaskConical, Network, Server, Wifi, HardDrive, Monitor, Settings, Wrench, Laptop, Lock, Camera, Cloud, CheckCircle2, Zap, Users, Award, TrendingUp, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";
import { getAllBlogPosts, getAllServices, getAllCaseStudies } from "@/lib/content";
import { HeroPattern } from "@/components/hero-pattern";
import { getServiceIcon } from "@/components/service-icon";

export default function HomePage() {
  const posts = getAllBlogPosts().slice(0, 3);
  const services = getAllServices().slice(0, 6);
  const caseStudies = getAllCaseStudies().slice(0, 3);

  const highlights = [
    { icon: <Award className="h-5 w-5" />, label: "Founded 1991", desc: "30+ years experience" },
    { icon: <Users className="h-5 w-5" />, label: "Enterprise Clients", desc: "Trusted by industry leaders" },
    { icon: <Zap className="h-5 w-5" />, label: "Fast Response", desc: "24/7 support available" },
    { icon: <TrendingUp className="h-5 w-5" />, label: "Future Ready", desc: "AI-powered solutions" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-muted/30 py-24 md:py-32">
        <HeroPattern />
        <div className="container flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            IT Solutions Since 1991
          </div>
          <div className="mb-6 flex items-center gap-3">
            <img
              src="/logo.png"
              alt={siteConfig.title}
              className="h-14 w-auto dark:hidden"
            />
            <img
              src="/logo-darkmode.png"
              alt={siteConfig.title}
              className="hidden h-14 w-auto dark:block"
            />
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Reliable IT Infrastructure for Modern Business
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/services">
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="flex flex-col items-center rounded-lg border bg-background/60 p-4 backdrop-blur">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {h.icon}
                </div>
                <span className="text-sm font-semibold">{h.label}</span>
                <span className="text-xs text-muted-foreground">{h.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <Settings className="h-4 w-4" />
                What We Do
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
              <p className="mt-2 text-muted-foreground">
                Comprehensive IT solutions tailored to your business needs
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/services">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = getServiceIcon(service.slug);
              return (
                <Card key={service.slug} className="group transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30">
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                      <Link href={`/services/${service.slug}`} className="hover:underline">
                        Learn more
                      </Link>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="border-y bg-muted/30 py-14">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Network className="h-6 w-6" />, title: "Network Setup", desc: "Cabling, routers & switches" },
              { icon: <Shield className="h-6 w-6" />, title: "AI Surveillance", desc: "Smart security monitoring" },
              { icon: <Server className="h-6 w-6" />, title: "Server & NAS", desc: "Storage & backup solutions" },
              { icon: <Wrench className="h-6 w-6" />, title: "Maintenance", desc: "Ongoing IT support" },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <FolderOpen className="h-4 w-4" />
                Portfolio
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Case Studies</h2>
              <p className="mt-2 text-muted-foreground">
                Real-world solutions we have delivered
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/casestudies">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
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
                  <p className="line-clamp-2 text-sm text-muted-foreground">
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
      </section>

      {/* Blog */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <TrendingUp className="h-4 w-4" />
                Insights
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Latest News</h2>
              <p className="mt-2 text-muted-foreground">
                Technology updates and industry insights
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/blog">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="overflow-hidden transition-all hover:shadow-md">
                {post.image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {post.date && (
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t py-16 md:py-24">
        <div className="container text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to upgrade your IT infrastructure?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Contact our team today for a personalized consultation and discover how we can help your business thrive.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
