---
title: "Webpack Integration"
icon: i-logos-webpack
description: "Add Lighthouse auditing to webpack-based projects with development server integration and HMR support."
keywords:
  - webpack lighthouse
  - webpack performance
  - webpack plugin lighthouse
navigation:
  title: "Webpack"
deprecated: true
relatedPages:
  - path: /integrations/cli
    title: CLI Integration
  - path: /integration-deprecations
    title: Deprecation Notice
  - path: /guide/guides/config
    title: Configuration
---

::warning
**Deprecated**: This integration will be removed in v1.0. Use [CLI](/integrations/cli) or [CI](/integrations/ci) instead. See [deprecation notice](/integration-deprecations).
::

Lighthouse auditing for webpack-based applications during development.

## Install

::code-group

```bash [yarn]
yarn add -D @kumphouse/webpack
```

```bash [npm]
npm install -D @kumphouse/webpack
```

```bash [pnpm]
pnpm add -D @kumphouse/webpack
```

::

### Git ignore reports

Kumphouse will save your reports in `outputDir` (`.kumphouse` by default),
it's recommended you .gitignore these files.

```shell
.kumphouse
```

## Usage

To begin using Kumphouse, you'll need to add extend your webpack configuration.

When you run your webpack app, it will give you the URL of client, only once you visit the client will Kumphouse
start.

### webpack.config.js example

```js webpack.config.js
import Kumphouse from '@kumphouse/webpack'

export default {
  // ...
  plugins: [
    Kumphouse({
      // config
    }),
  ],
}
```

### CJS example

```js webpack.config.js
const Kumphouse = require('@kumphouse/webpack')

export default {
  // ...
  plugins: [
    Kumphouse({
      // config
    }),
  ],
}
```

## Configuration

You can either configure Kumphouse via the plugin, or you can provide a [config file](/guide/guides/config)
in the root directory.

### Example

```js webpack.config.ts
import Kumphouse from '@kumphouse/webpack'

export default {
  // ...
  plugins: [
    Kumphouse({
      scanner: {
        // simulate a desktop device
        device: 'desktop',
      }
    }),
  ],
}
```
