import type { CliOptions } from './types'
import { setMaxListeners } from 'node:events'
import { platform } from 'node:os'
import { createKumphouse, generateClient, useLogger } from 'kumphouse-core'
import { createServer } from 'kumphouse-server'
import { x } from 'tinyexec'
import createCli from './createCli'
import { pickOptions, validateHost, validateOptions } from './util'

function openUrl(url: string) {
  const cmd = platform() === 'darwin'
    ? 'open'
    : platform() === 'win32'
      ? 'start'
      : 'xdg-open'
  return x(cmd, [url], { throwOnError: false })
}

const cli = createCli()

const { args, options } = cli.parse() as unknown as { args: string[], options: CliOptions }

// Allow the site to be passed as a positional arg: `kumphouse kumpan.se`
if (!options.site && args[0])
  options.site = args[0]

async function run() {
  const start = new Date()
  if (options.help || options.version)
    return

  setMaxListeners(0)

  const kumphouse = await createKumphouse(
    {
      ...pickOptions(options),
      hooks: {
        'resolved-config': async (config) => {
          await validateHost(config)
        },
      },
    },
    { name: 'cli' },
  )

  validateOptions(kumphouse.resolvedConfig)

  const { server, app } = await createServer()
  await kumphouse.setServerContext({ url: server.url, server: server.server, app })
  const { routes } = await kumphouse.start()
  const logger = useLogger()
  if (!routes.length) {
    logger.error('Failed to queue routes for scanning. Please check the logs with debug enabled.')
    process.exit(1)
  }

  kumphouse.hooks.hook('worker-finished', async () => {
    const end = new Date()
    const seconds = Math.round((end.getTime() - start.getTime()) / 1000)

    // Clear the progress display
    kumphouse.worker.clearProgressDisplay()
    logger.success(`Kumphouse has finished scanning ${kumphouse.resolvedConfig.site}: ${kumphouse.worker.reports().length} routes in ${seconds}s.`)

    // Regenerate the client payload with completed reports so the dashboard
    // shows data even when opened after the scan finishes.
    // Pass kumphouse context explicitly — unctx's global context is not
    // available inside async hook callbacks.
    await generateClient({}, kumphouse)

    await kumphouse.worker.cluster.close().catch(() => {})
  })

  if (kumphouse.resolvedConfig.server.open)
    await openUrl(kumphouse.runtimeSettings.clientUrl)
}

run()
