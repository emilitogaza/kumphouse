---
title: "API Glossary"
description: "Key terms and concepts used throughout the Kumphouse documentation and API, including route definitions, providers, and hooks."
keywords:
  - kumphouse api
  - kumphouse glossary
  - route definition
  - kumphouse provider
  - kumphouse types
navigation:
  title: "API Glossary"
relatedPages:
  - path: /api-doc
    title: API Reference
  - path: /api-doc/config
    title: Config Reference
  - path: /guide/guides/route-definitions
    title: Route Definitions Guide
---

Key terms, types, and concepts used throughout the Kumphouse API and documentation.

## Core Concepts

### Route Definition

A route definition maps page files (Vue components, markdown files, etc.) to their corresponding URL paths, enabling intelligent [dynamic sampling](/guide/guides/dynamic-sampling) and better organization.

The page component has multiple representations:

1. _static route_ - name matches the path (/about.vue -> /about/),
2. _dynamic route_ - a query is used to generate a set of paths (/posts/:id.vue -> /posts/my-first-post/)
3. _catch-all route_ where any missed paths will be caught (/404.vue -> /some-missing-page)

Additional meta-data is provided to give more context of how the mapping behaves, such as which layout to use, which
asset chunk it belongs to.

Different frameworks represent routes differently, This one is based on Nuxt.js

```ts
export interface RouteDefinition {
  name: string
  path: string
  component?: string
  componentBaseName?: string
  chunkName?: string
  _name?: string
  layout?: string
}
```

### Provider

A provider is an integration of Kumphouse to a specific context, such as a framework or an environment.

Each provider has their own unique name and defines how they will provide URLs and route definitions to Kumphouse.

```ts
export interface Provider {
  /**
   * Used to debug.
   */
  name?: string
  /**
   * To match a URL path to a route definition we need a router. Different definitions need different routes.
   */
  mockRouter?: MockRouter | ((routeDefinitions: RouteDefinition[]) => MockRouter)
  /**
   * The collection of route definitions belonging to the provider. These can be inferred but aren't 100% correct,
   * frameworks that can provide these should do so.
   */
  routeDefinitions?: RouteDefinition[] | (() => RouteDefinition[] | Promise<RouteDefinition[]>)
}
```

### Route Report

A fairly rigid representation of the puppeteer cluster task results (`extractHtmlPayload`, `runLighthouseTask`),
combined with the normalised route.

```ts
export interface KumphouseRouteReport {
  /**
   * The mapping of tasks with their status.
   */
  tasks: Record<KumphouseTask, KumphouseTaskStatus>
  /**
   * Path to where the artifacts from a URL scan are saved.
   */
  artifactPath: string
  /**
   * URL of where the artifacts are stored, for static client access.
   */
  artifactUrl: string
  /**
   * The route (URL Path) that the report belongs to.
   */
  route: NormalisedRoute
  /**
   * A unique representation of the route, useful for the API layer.
   */
  reportId: string
  /**
   * The lighthouse result, only set once the task is completed.
   */
  report?: LighthouseReport
  /**
   * The SEO meta-data, only set once the html payload has been extracted and passed.
   */
  seo?: {
    alternativeLangDefault?: string
    title?: string
    description?: string
    internalLinks?: number
    externalLinks?: number
    favicon?: string
    og?: {
      description?: string
      title?: string
      image?: string
    }
  }
}
```

### Kumphouse Context

The context is provided by the `createKumphouse()` or `useKumphouse()` functions. It provides the central
API to interacting with the behaviour of Kumphouse.

```ts
export interface KumphouseContext {
  /**
   * The mock router being used to match paths to route definitions.
   */
  mockRouter?: MockRouter
  /**
   * Settings that are computed from runtime data.
   */
  runtimeSettings: RuntimeSettings
  /**
   * Access the hook system, either calling a hook or listening to one.
   */
  hooks: Hookable<KumphouseHooks>
  /**
   * User config that has been normalised.
   */
  resolvedConfig: ResolvedUserConfig
  /**
   * The collection of route definitions associated to the site.
   */
  routeDefinitions?: RouteDefinition[]
  /**
   * Discovered routes.
   */
  routes?: NormalisedRoute[]
  /**
   * A reference to the API middleware.
   */
  api: any
  /**
   * A reference to the websocket interface, used to broadcast data.
   */
  ws: WS
  /**
   * Access the worker environment, queue tasks, inspect progress, etc.
   */
  worker: KumphouseWorker
  /**
   * Provider details
   */
  provider: Provider

  /**
   * To use Kumphouse with a client, it needs a server / app to register the API and client middleware.
   *
   * @param arg
   */
  setServerContext: (arg: ServerContextArg) => Promise<KumphouseContext>
  /**
   * Sets the site URL that will be scanned if it's not known at initialisation.
   * @param url
   */
  setSiteUrl: (url: string) => void
  /**
   * Running Kumphouse via CI does not require a server or the client so we have a special utility for it.
   */
  setCiContext: () => Promise<KumphouseContext>
  /**
   * Start the client and the queue worker. A server context must be provided before this function is called.
   */
  start: () => Promise<KumphouseContext>
}
```

### Mock Router

Kumphouse provides intelligent sampling which relies on knowing which URLs map to which files in your project.
To achieve this, it needs to create its own router with your files to test any URL that comes through.

Different integrations will have different requirements from the router.
For example, different frameworks will resolve files that contain substitutes
(for example `/posts/[post].vue` may work in one framework but not another).

```ts
export interface MockRouter { match: (path: string) => RouteDefinition }
```

## Worker

### Task

The worker will queue a route to run with multiple tasks. A task is a queued job and has their own id and status.

Kumphouse has two core tasks:

- `inspectHtmlTask` which dumps the HTML of the URL and extracts SEO data from it (title, description, image, internal links, etc)
- `runLighthouseTask` runs the actual lighthouse process on the URL

See [cluster.task(fn)](https://github.com/thomasdondorf/puppeteer-cluster) for more details.

```ts
/**
 * Tasks that Kumphouse will run, used to track their status.
 */
export type KumphouseTask = 'inspectHtmlTask' | 'runLighthouseTask'

/**
 * Each task ran by kumphouse (extractHtmlPayload, runLighthouseTask) has a specific status which we can expose.
 */
export type KumphouseTaskStatus = 'waiting' | 'in-progress' | 'completed' | 'failed'
```

## Client

### Columns

A column will generally be either a direct mapping to a lighthouse audit (such as console errors) or a computed mapping to
multiple lighthouse audits (such as image issues).

It can also exist as a mapping to the SEO meta-data (such as meta description).

```ts
export interface KumphouseColumn {
  /**
   * The column header name.
   */
  label: string
  /**
   * If the user hovers over the label they'll see a tooltip for extra context.
   */
  tooltip?: string
  /**
   * A component instance which should be used to render the column cells contents.
   */
  component?: () => Promise<unknown>
  /**
   * The key within the KumphouseRouteReport that maps to the column, used for automatic value inferring.
   */
  key?: string
  /**
   * Column sizing definition, needed for a responsive UI.
   */
  cols?: Partial<Record<WindiResponsiveClasses, number>>
  /**
   * Can the column can be sorted?
   *
   * @default false
   */
  sortable?: boolean
  /**
   * The key within the KumphouseRouteReport that is used to sort the column. This will default to the key if not provided.
   */
  sortKey?: string
  /**
   * Extra classes that should be added to the column.
   */
  classes?: string[]
}
```
