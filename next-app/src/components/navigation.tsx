"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

function getLangFromPath(pathname: string): "en" | "zh" {
  return pathname.startsWith("/zh") ? "zh" : "en";
}

function switchLangPath(pathname: string): string {
  const isZh = pathname.startsWith("/zh");
  if (isZh) {
    return pathname.replace(/^\/zh/, "") || "/";
  }
  return "/zh" + pathname;
}

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const lang = getLangFromPath(pathname);
  const nav = siteConfig.navigation[lang];
  const switchPath = switchLangPath(pathname);
  const switchLabel = lang === "en" ? "中文" : "EN";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href={lang === "zh" ? "/zh" : "/"} className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt={siteConfig.title}
            className="h-8 w-auto dark:hidden"
          />
          <img
            src="/logo-darkmode.png"
            alt={siteConfig.title}
            className="hidden h-8 w-auto dark:block"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-4 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {nav.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                pathname === child.href && "bg-accent text-accent-foreground"
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                        pathname === item.href && "bg-accent text-accent-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild className="gap-1.5 text-sm font-medium">
              <Link href={switchPath}>
                <Globe className="h-4 w-4" />
                {switchLabel}
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="sm" asChild className="gap-1 text-sm">
            <Link href={switchPath}>
              <Globe className="h-4 w-4" />
              {switchLabel}
            </Link>
          </Button>
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-4 py-4">
                {nav.map((item) =>
                  item.children ? (
                    <div key={item.label} className="flex flex-col gap-2">
                      <span className="px-2 text-sm font-semibold text-muted-foreground">
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent",
                            pathname === child.href && "bg-accent font-medium"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent",
                        pathname === item.href && "bg-accent font-medium"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
