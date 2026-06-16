---
title: "Kumphouse --desktop Flag & Device Configuration"
description: "Run Kumphouse in desktop mode with the --desktop flag: npx kumphouse --site <url> --desktop. Configure mobile, desktop, or custom viewports with throttling."
keywords:
  - kumphouse --desktop
  - kumphouse --desktop flag
  - kumphouse cli --desktop flag
  - kumphouse cli desktop option
  - kumphouse cli desktop flag
  - kumphouse --device desktop
  - kumphouse cli device desktop option
  - lighthouse mobile
  - lighthouse desktop
  - lighthouse device emulation
  - lighthouse viewport
  - lighthouse throttling
  - mobile performance testing
navigation:
  title: "Device Configuration"
relatedPages:
  - path: /guide/guides/lighthouse
    title: Lighthouse Configuration
  - path: /api-doc/config
    title: Config Reference
  - path: /glossary
    title: Core Web Vitals Glossary
---

Run Kumphouse in desktop mode with the `--desktop` flag:

```bash
npx kumphouse --site https://example.com --desktop
```

This overrides the default mobile emulation and scans every page using a desktop viewport. Prefer a config file? Set `scanner.device: 'desktop'` instead.

## When to use `--desktop`

Mobile is the default because Google uses mobile-first indexing. But desktop scans still matter for:

- B2B SaaS dashboards (95%+ desktop traffic)
- Admin panels and internal tools
- Documentation sites
- Benchmarking against PageSpeed Insights desktop scores

The `--desktop` flag is equivalent to the `--device desktop` long form and takes precedence over any config file setting.

## Device Types

### Desktop Scanning

```ts
import { defineKumphouseConfig } from 'kumphouse/config'

export default defineKumphouseConfig({
  scanner: {
    device: 'desktop',
  },
})
```

### Mobile Scanning (Default)

```ts
export default defineKumphouseConfig({
  scanner: {
    device: 'mobile',
  },
})
```

## Custom Dimensions

Test specific viewport sizes for responsive breakpoints:

```ts
export default defineKumphouseConfig({
  lighthouseOptions: {
    screenEmulation: {
      width: 1800,
      height: 1000,
    },
  },
})
```

## Network Throttling

Throttling simulates slower network and CPU conditions for more realistic performance testing:

```ts
export default defineKumphouseConfig({
  scanner: {
    throttle: true,
  },
})
```

::note
Throttling is automatically enabled for production sites and disabled for localhost by default.
::
