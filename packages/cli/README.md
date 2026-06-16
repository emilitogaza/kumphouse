# @kumphouse/cli

The command-line interface and CI integration for [Kumphouse](https://github.com/harlan-zw/unlighthouse), enabling automated website scanning in development and deployment workflows.

## Installation

```bash
# Use directly with npx
npx kumphouse --site https://example.com

# Or install globally
npm install -g @kumphouse/cli
```

## Usage

### Basic Scanning

```bash
# Scan a website
kumphouse --site https://example.com

# Enable debug mode
kumphouse --site https://example.com --debug

# Mobile device simulation
kumphouse --site https://example.com --mobile
```

### Advanced Options

```bash
# Multiple samples with throttling
kumphouse --site https://example.com --samples 3 --throttle

# Custom URLs and exclusions
kumphouse --site https://example.com --urls /home,/about,/contact --exclude-urls /admin/*

# With custom configuration
kumphouse --site https://example.com --config-file ./my-config.ts
```

### CI Integration

```bash
# CI mode with exit codes for failed audits
kumphouse-ci --site https://example.com --budget 75
```

## Configuration

Create `kumphouse.config.ts` in your project root:

```ts
import { defineKumphouseConfig } from 'kumphouse/config'

export default defineKumphouseConfig({
  site: 'https://example.com',
  debug: true,
  scanner: {
    device: 'desktop',
    throttle: false,
  },
  lighthouseOptions: {
    onlyCategories: ['performance', 'accessibility'],
  }
})
```

## Documentation

- [CLI Integration Guide](https://unlighthouse.dev/integrations/cli.html)
- [CI Integration Guide](https://unlighthouse.dev/integrations/ci.html)
- [Configuration Reference](https://unlighthouse.dev/guide/config.html)

## License

MIT License © 2021-PRESENT [Harlan Wilton](https://github.com/harlan-zw)
