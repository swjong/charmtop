import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Mail, MapPin, Phone, Clock, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Page } from "@/types/content";

function getPageContent(slug: string): (Page & { content: string }) | null {
  const filePath = path.join(process.cwd(), "content/pages", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as Page), content };
}

export const metadata = {
  title: "Contact",
  description: "Get in touch with Charmtop Consultants",
};

export default function ContactPage() {
  const page = getPageContent("contact");

  const contactMethods = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: siteConfig.company.email,
      href: `mailto:${siteConfig.company.email}`,
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+852 2811 1234",
      href: "tel:+85228111234",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: "Hong Kong",
      href: null,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Business Hours",
      value: "Mon - Fri: 9:00 - 18:00",
      href: null,
    },
  ];

  return (
    <div className="container max-w-3xl py-12 md:py-20">
      <div className="text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MessageCircle className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{page?.title || "Contact Us"}</h1>
        <p className="mt-4 text-muted-foreground">
          {page?.content?.trim() || "We would love to hear from you. Reach out to discuss your IT infrastructure needs."}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {contactMethods.map((method) => (
          <div
            key={method.label}
            className="flex items-center gap-4 rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {method.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">{method.label}</p>
              {method.href ? (
                <a href={method.href} className="truncate text-sm font-semibold hover:text-primary hover:underline">
                  {method.value}
                </a>
              ) : (
                <p className="truncate text-sm font-semibold">{method.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border bg-muted/30 p-8 text-center">
        <Send className="mx-auto h-8 w-8 text-primary mb-4" />
        <h2 className="text-xl font-bold">Send us a message</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          For project inquiries and quotations, email us directly at{" "}
          <a href={`mailto:${siteConfig.company.email}`} className="font-medium text-primary hover:underline">
            {siteConfig.company.email}
          </a>
        </p>
      </div>
    </div>
  );
}
