import { SiteConfig } from "@/types/content";

export const siteConfig: SiteConfig = {
  title: "Charmtop Consultancy",
  baseUrl: "https://www.charmtop.com.hk",
  descriptionZh: "創高顧問有限公司是一家IT系統整合商，提供系統架構、管理、儲存、安全及訊息傳遞的實用顧問服務。",
  description:
    "Charmtop Consultants is an IT system integrator offering practical advisory on system architecture, management, storage, security and messaging.",
  company: {
    name: "Charmtop Consultants",
    founded: 1991,
    email: "info@charmtop.com.hk",
  },
  social: [
    { name: "facebook", icon: "Facebook", link: "https://www.facebook.com/" },
    { name: "linkedin", icon: "Linkedin", link: "https://www.linkedin.com/" },
  ],
  navigation: {
    en: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      {
        label: "Services",
        href: "/services",
        children: [
          { label: "Networking & Cabling", href: "/services/networking" },
          { label: "AI Surveillance", href: "/services/surveillance" },
          { label: "User Testing", href: "/services/usertesting" },
        ],
      },
      { label: "Case Studies", href: "/casestudies" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    zh: [
      { label: "首頁", href: "/zh" },
      { label: "關於我們", href: "/zh/about" },
      {
        label: "服務",
        href: "/zh/services",
        children: [
          { label: "網絡安裝", href: "/zh/services/networking" },
          { label: "AI監控", href: "/zh/services/surveillance" },
          { label: "用戶測試", href: "/zh/services/usertesting" },
        ],
      },
      { label: "案例", href: "/zh/casestudies" },
      { label: "博客", href: "/zh/blog" },
      { label: "聯絡我們", href: "/zh/contact" },
    ],
  },
};
