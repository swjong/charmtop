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
  const posts = getAllBlogPosts("zh").slice(0, 3);
  const services = getAllServices("zh").slice(0, 6);
  const caseStudies = getAllCaseStudies("zh").slice(0, 3);

  const highlights = [
    { icon: <Award className="h-5 w-5" />, label: "創立於1991", desc: "超過30年經驗" },
    { icon: <Users className="h-5 w-5" />, label: "企業客戶", desc: "深受業界信賴" },
    { icon: <Zap className="h-5 w-5" />, label: "快速回應", desc: "全天候支援" },
    { icon: <TrendingUp className="h-5 w-5" />, label: "面向未來", desc: "AI驅動方案" },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b bg-muted/30 py-24 md:py-32">
        <HeroPattern />
        <div className="container flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            自1991年提供IT解決方案
          </div>
          <div className="mb-6 flex items-center gap-3">
            <img src="/logo.png" alt={siteConfig.title} className="h-14 w-auto dark:hidden" />
            <img src="/logo-darkmode.png" alt={siteConfig.title} className="hidden h-14 w-auto dark:block" />
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            為現代企業提供可靠的IT基礎設施
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {siteConfig.descriptionZh || siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/zh/services">探索服務 <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/zh/contact">獲取報價</Link>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="flex flex-col items-center rounded-lg border bg-background/60 p-4 backdrop-blur">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">{h.icon}</div>
                <span className="text-sm font-semibold">{h.label}</span>
                <span className="text-xs text-muted-foreground">{h.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary"><Settings className="h-4 w-4" />我們的服務</div>
              <h2 className="text-3xl font-bold tracking-tight">服務項目</h2>
              <p className="mt-2 text-muted-foreground">為您的業務量身定制的全面IT解決方案</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/zh/services">查看全部 <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
                    <p className="line-clamp-3 text-sm text-muted-foreground">{service.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                      <Link href={`/zh/services/${service.slug}`} className="hover:underline">了解更多</Link>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-14">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Network className="h-6 w-6" />, title: "網絡設置", desc: "佈線、路由器及交換機" },
              { icon: <Shield className="h-6 w-6" />, title: "AI監控", desc: "智能安全監察" },
              { icon: <Server className="h-6 w-6" />, title: "伺服器及NAS", desc: "儲存及備份方案" },
              { icon: <Wrench className="h-6 w-6" />, title: "維護支援", desc: "持續IT支援服務" },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">{f.icon}</div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary"><FolderOpen className="h-4 w-4" />作品集</div>
              <h2 className="text-3xl font-bold tracking-tight">案例研究</h2>
              <p className="mt-2 text-muted-foreground">我們為客戶交付的真實解決方案</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/zh/casestudies">查看全部 <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.slug} className="overflow-hidden transition-all hover:shadow-md">
                {study.image && (
                  <div className="aspect-video overflow-hidden">
                    <img src={study.image} alt={study.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                  </div>
                )}
                <CardHeader className="pb-2"><CardTitle className="text-lg">{study.title}</CardTitle></CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{study.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                    <Link href={`/zh/casestudies/${study.slug}`} className="hover:underline">閱讀更多</Link>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary"><TrendingUp className="h-4 w-4" />洞察</div>
              <h2 className="text-3xl font-bold tracking-tight">最新資訊</h2>
              <p className="mt-2 text-muted-foreground">技術更新及行業見解</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/zh/blog">查看全部 <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="overflow-hidden transition-all hover:shadow-md">
                {post.image && (
                  <div className="aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {post.date && <span>{new Date(post.date).toLocaleDateString("zh-HK", { year: "numeric", month: "long", day: "numeric" })}</span>}
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    <Link href={`/zh/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t py-16 md:py-24">
        <div className="container text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">準備升級您的IT基礎設施？</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">立即聯絡我們的團隊，獲取個人化諮詢，了解我們如何助您的業務蓬勃發展。</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/zh/contact">聯絡我們 <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/zh/services">瀏覽服務</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
