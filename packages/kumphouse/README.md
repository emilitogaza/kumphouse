# kumphouse

The main package for [Kumphouse](https://github.com/harlan-zw/unlighthouse) - scan your entire website with Google Lighthouse. This is a convenience package that includes the core functionality and CLI tools.

## Quick Start

```bash
# Scan your website instantly
npx kumphouse --site https://example.com

# CI mode with performance budgets
npx kumphouse-ci --site https://example.com --budget 80
```

## What's Included

This package includes:
- `@kumphouse/core` - Core scanning engine
- `@kumphouse/cli` - Command-line interface
- `@kumphouse/client` - Web interface for results
- Two binaries: `kumphouse` and `kumphouse-ci`

## Installation

```bash
# Global installation
npm install -g kumphouse

# Project dependency
npm install kumphouse --save-dev
```

## Usage

### Interactive CLI

```bash
# Basic scan
kumphouse --site https://example.com

# With debugging and custom device
kumphouse --site https://example.com --debug --desktop

# Custom configuration
kumphouse --config-file kumphouse.config.ts
```

### Programmatic Usage

```ts
import { createKumphouse } from 'kumphouse'

const kumphouse = await createKumphouse({
  site: 'https://example.com',
  debug: true
})

await kumphouse.start()
```

### CI Integration

```bash
# Enforce performance budgets in CI
kumphouse-ci --site https://example.com --budget 85
```

## Configuration

Create `kumphouse.config.ts`:

```ts
import { defineKumphouseConfig } from 'kumphouse/config'

export default defineKumphouseConfig({
  site: 'https://example.com',
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

- [Getting Started Guide](https://unlighthouse.dev/guide/)
- [CLI Integration](https://unlighthouse.dev/integrations/cli.html)
- [CI Integration](https://unlighthouse.dev/integrations/ci.html)
- [API Reference](https://unlighthouse.dev/api/)
- [Configuration Reference](https://unlighthouse.dev/guide/config.html)

## License

MIT License © 2021-PRESENT [Harlan Wilton](https://github.com/harlan-zw)
