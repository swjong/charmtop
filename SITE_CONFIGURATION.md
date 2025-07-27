# Charmtop Site Configuration Guide

This document provides a comprehensive overview of the site configuration for quick troubleshooting and understanding by LLMs or developers.

## Quick Overview
- **Site Type**: Hugo static site
- **Theme**: Hugoplate
- **Languages**: Chinese (zh, default) + English (en)
- **Base URL**: http://localhost:1313 (development)

## Key Configuration Files

### Primary Config Files
| File | Purpose | Location |
|------|---------|----------|
| `hugo.toml` | Main Hugo configuration | `/hugo.toml` |
| `config.toml` | Site configuration | `/config.toml` |
| `hugo.yaml` | Additional Hugo settings | `/hugo.yaml` |

### Language Configuration
- **Default Language**: Chinese (`zh`)
- **CJK Support**: Enabled (`hasCJKLanguage = true`)
- **Language Structure**:
  - Chinese: `/content/chinese/` → URLs at root (`/page-name/`)
  - English: `/content/english/` → URLs at `/en/page-name/`

### Navigation Configuration
**Footer Menu** (Privacy Policy links):
- **Chinese**: `/config/_default/navigation/menus.zh.toml`
- **English**: `/config/_default/navigation/menus.en.toml`

**Important**: Use `url` parameter instead of `pageRef` for footer links to avoid redirect issues.

### Content Structure
```
content/
├── chinese/
│   └── pages/
│       └── privacy-policy.md    # Chinese privacy policy
├── english/
    └── pages/
        └── privacy-policy.md    # English privacy policy
```

## Common Issues & Solutions

### 1. Privacy Policy Links Redirecting to Homepage
**Problem**: Footer links redirect to `/` instead of privacy policy pages
**Solution**: 
- Check `menus.zh.toml` and `menus.en.toml`
- Replace `pageRef = "/privacy-policy"` with `url = "/privacy-policy/"` (Chinese)
- Replace `pageRef = "/privacy-policy"` with `url = "/en/privacy-policy/"` (English)

### 2. Port Conflicts
**Problem**: Hugo server fails to start on port 1313
**Solution**:
```bash
# Check what's using port 1313
lsof -i :1313
# Kill existing Hugo process
kill -9 <PID>
# Restart Hugo
hugo serve --bind 0.0.0.0 --port 1313 --baseURL http://localhost:1313
```

### 3. CORS Errors with searchindex.json
**Problem**: `net::ERR_FAILED http://localhost:XXXX/searchindex.json`
**Solution**: Ensure Hugo server is running with correct baseURL and port

### 4. Content Not Loading
**Problem**: Pages exist but content doesn't display
**Solution**: 
- Verify content files exist in correct language directories
- Check generated files in `/public/` directory
- Ensure Hugo server is running and watching for changes

## Development Commands

### Start Development Server
```bash
cd /home/newuser/charmtop
hugo serve --bind 0.0.0.0 --port 1313 --baseURL http://localhost:1313
```

### Build Static Site
```bash
hugo --gc --minify
```

### Check Site Status
```bash
curl -I http://localhost:1313/privacy-policy/
curl -I http://localhost:1313/en/privacy-policy/
```

## URL Structure

| Page | Chinese URL | English URL |
|------|-------------|-------------|
| Homepage | `http://localhost:1313/` | `http://localhost:1313/en/` |
| Privacy Policy | `http://localhost:1313/privacy-policy/` | `http://localhost:1313/en/privacy-policy/` |

## File Locations for Quick Reference

### Content Files
- **Chinese Privacy Policy**: `/content/chinese/pages/privacy-policy.md`
- **English Privacy Policy**: `/content/english/pages/privacy-policy.md`

### Generated Files
- **Chinese Privacy Policy**: `/public/privacy-policy/index.html`
- **English Privacy Policy**: `/public/en/privacy-policy/index.html`

### Configuration Files
- **Main Config**: `/hugo.toml`
- **Site Config**: `/config.toml`
- **Navigation**: `/config/_default/navigation/`

## Troubleshooting Checklist

1. **Verify Hugo server is running**: Check terminal for `hugo serve` output
2. **Check port**: Ensure using correct port (1313 for development)
3. **Verify content files**: Ensure `.md` files exist in correct language directories
4. **Check menu configuration**: Verify `url` parameters in menu files
5. **Test URLs directly**: Use curl or browser to test page accessibility
6. **Check generated files**: Verify `/public/` directory contains expected files

## Environment Notes
- **OS**: Linux
- **Hugo Version**: Latest (installed via snap)
- **Working Directory**: `/home/newuser/charmtop`
- **Development Base URL**: `http://localhost:1313`

## Quick Debug Commands
```bash
# Check if pages exist
curl -I http://localhost:1313/privacy-policy/
curl -I http://localhost:1313/en/privacy-policy/

# Check menu links
curl -s http://localhost:1313/ | grep -A 3 -B 3 "私隱政策"
curl -s http://localhost:1313/en/ | grep -A 3 -B 3 "Privacy Policy"

# List content files
find content/ -name "*.md" | grep -i privacy
```