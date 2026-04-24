"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const pathname = usePathname();
  const isZh = pathname.startsWith("/zh");
  const prefix = isZh ? "/zh" : "";

  const links = isZh
    ? [
        { label: "關於我們", href: `${prefix}/about` },
        { label: "服務", href: `${prefix}/services` },
        { label: "案例", href: `${prefix}/casestudies` },
        { label: "博客", href: `${prefix}/blog` },
        { label: "聯絡我們", href: `${prefix}/contact` },
        { label: "私隱政策", href: `${prefix}/privacy-policy` },
      ]
    : [
        { label: "About", href: `${prefix}/about` },
        { label: "Services", href: `${prefix}/services` },
        { label: "Case Studies", href: `${prefix}/casestudies` },
        { label: "Blog", href: `${prefix}/blog` },
        { label: "Contact", href: `${prefix}/contact` },
        { label: "Privacy Policy", href: `${prefix}/privacy-policy` },
      ];

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt={siteConfig.title}
              className="h-6 w-auto dark:hidden"
            />
            <img
              src="/logo-darkmode.png"
              alt={siteConfig.title}
              className="hidden h-6 w-auto dark:block"
            />
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {siteConfig.social.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                aria-label={item.name}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
