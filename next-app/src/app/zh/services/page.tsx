import Link from "next/link";
import { ArrowRight, Settings, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllServices } from "@/lib/content";
import { getServiceIcon } from "@/components/service-icon";

export default function ServicesPage() {
  const services = getAllServices("zh");

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Settings className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">我們的服務</h1>
        <p className="mt-4 text-muted-foreground">
          全面的IT解決方案，助您的業務在數碼時代蓬勃發展
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                {service.tags && service.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  <Link href={`/zh/services/${service.slug}`} className="hover:underline">
                    了解更多
                  </Link>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 flex flex-col items-center rounded-2xl border bg-muted/30 p-8 text-center">
        <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
        <h2 className="text-2xl font-bold">需要度身訂造的解決方案？</h2>
        <p className="mt-2 max-w-lg text-muted-foreground">
          我們可以根據您的特定業務需求，量身定制我們的服務。歡迎聯絡我們進行咨詢。
        </p>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/zh/contact">
            聯絡我們
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
