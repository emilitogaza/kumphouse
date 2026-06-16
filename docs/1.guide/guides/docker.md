---
title: "Run Lighthouse in Docker"
description: "Run Kumphouse site-wide Lighthouse scans in Docker containers. Dockerfile examples and CI/CD configuration."
keywords:
  - lighthouse docker
  - docker lighthouse
  - lighthouse container
  - puppeteer docker
  - lighthouse ci docker
navigation:
  title: "Docker"
relatedPages:
  - path: /integrations/ci
    title: CI Integration
  - path: /guide/guides/puppeteer
    title: Puppeteer Configuration
  - path: /guide/guides/chrome-dependency
    title: Chrome Dependency
---

Run Kumphouse in Docker containers for consistent CI/CD environments. Docker requires special Puppeteer configuration due to sandboxing restrictions.

::warning
Docker support is community-maintained and experimental. Use the CI integration for best results.
::

## Kumphouse Config

It's recommended you only use the `@kumphouse/ci` with Docker. Hosting the client does not have known support.

You will need to remove the Chrome sandbox in a Docker environment, this will require using an `kumphouse.config.ts` file.

```ts
import { defineKumphouseConfig } from 'kumphouse/config'

export default defineKumphouseConfig({
  puppeteerOptions: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--ignore-certificate-errors',
    ],
  },
})
```

If you're using the `kumphouse` binary instead of the CI integration, then you will need to tell Kumphouse not to use the server and close when
the reports are finished.

```ts
export default defineKumphouseConfig({
  server: {
    open: false,
  },
  hooks: {
    'worker-finished': async () => {
      process.exit(0)
    },
  },
})
```

## Docker File

Please see the following community repos:

- [indykoning—Kumphouse Docker](https://github.com/indykoning/kumphouse-docker)
