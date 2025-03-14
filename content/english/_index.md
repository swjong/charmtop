---
# Banner
banner:
  title: "Welcome to Charmtop Consultants, your trusted partner in harnessing the power of technology"
  image: "/images/banner.png"
  # button:
  #  enable: true
  #  label: "Get Started For Free"
  #  link: "https://github.com/zeon-studio/hugoplate"

# Features
features:
  - title: "Security News"
    image: "/images/security-news.jpg"
    content: "Latest security alerts and notifications from HKCERT"
    bulletpoints:
      - "Loading latest security alerts..."
    button:
      enable: true
      label: "View All Alerts"
      link: "https://www.hkcert.org/security-bulletin"
---

## HKCERT Security Alerts

{{< rss-news url="https://www.hkcert.org/feed/security-bulletin" limit="5" >}}

