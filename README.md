<h1>Kumphouse</h1>



Kumphouse scans your entire site with Google Lighthouse and surfaces what's slow, what's broken, and what's hurting your SEO — built by <a href="https://kumpan.se">Kumpan</a> problem-solvers, for Kumpan problem-solvers.


<p align="center">
An internal fork of <a href="https://github.com/harlan-zw/unlighthouse">Unlighthouse</a> by Harlan Wilton (MIT).
</p>

## Quick Setup

```bash
npx kumphouse --site <your-site>
# or PNPM
pnpm dlx kumphouse --site <your-site>
```

_Requires Node >= 20.x._

### Debugging

Hit an issue? Re-run the scan with debugging enabled:

```bash
npx kumphouse --site <your-site> --debug
```

## Docs

Configuration, integrations, and the API spec are documented on the upstream [Unlighthouse docs](https://unlighthouse.dev/).

## License

Licensed under the [MIT license](https://github.com/harlan-zw/unlighthouse/blob/main/LICENSE.md).
