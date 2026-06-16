# @kumphouse/server

The server package for [Kumphouse](https://github.com/harlan-zw/unlighthouse) that provides the web server and API endpoints for the scanning interface.

## Usage

```ts
import { createServer } from '@kumphouse/server'

const { server, app } = await createServer()
// server is an instance of listhen, app is an instance of h3
await kumphouse.setServerContext({ url: server.url, server: server.server, app })
await kumphouse.start()
```

## Documentation

- [API Reference](https://unlighthouse.dev/api/index.html)
- [Configuration Guide](https://unlighthouse.dev/guide/config.html)

## License

MIT License © 2021-PRESENT [Harlan Wilton](https://github.com/harlan-zw)
