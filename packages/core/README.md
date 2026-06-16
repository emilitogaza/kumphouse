# @kumphouse/core

The core engine of [Kumphouse](https://github.com/harlan-zw/unlighthouse) that handles website scanning, Lighthouse execution, and report generation.

## Usage

### Basic Usage

```ts
import { createKumphouse } from '@kumphouse/core'

const kumphouse = await createKumphouse({
  site: 'https://example.com',
  debug: true,
  scanner: {
    device: 'desktop',
  }
})

await kumphouse.start()
```

### With Custom Provider

```ts
import { createKumphouse } from '@kumphouse/core'

const kumphouse = await createKumphouse(
  { /* user config */ },
  {
    name: 'custom',
    routeDefinitions: () => generateRouteDefinitions(),
  }
)
```

### Hooks

```ts
import { useKumphouse } from '@kumphouse/core'

const { hooks } = useKumphouse()

hooks.hook('task-complete', (path, response) => {
  console.log('Task completed for:', path)
})
```

## API

- `createKumphouse(userConfig, provider?)` - Initialize Kumphouse
- `useKumphouse()` - Access the global Kumphouse context
- `generateClient(options)` - Generate static client files

## Documentation

- [API Reference](https://unlighthouse.dev/api/index.html)
- [Configuration Guide](https://unlighthouse.dev/guide/config.html)
- [Puppeteer Configuration](https://unlighthouse.dev/guide/puppeteer.html)

## License

MIT License © 2021-PRESENT [Harlan Wilton](https://github.com/harlan-zw)
