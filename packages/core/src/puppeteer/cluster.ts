import type { KumphousePuppeteerCluster } from '../types'
import { Cluster } from 'puppeteer-cluster'
import { useKumphouse } from '../kumphouse'

/**
 * Create an instance of puppeteer-cluster
 */
export async function launchPuppeteerCluster(): Promise<KumphousePuppeteerCluster> {
  const { resolvedConfig } = useKumphouse()
  // @ts-expect-error untyped
  const cluster = await Cluster.launch({
    puppeteerOptions: resolvedConfig.puppeteerOptions,
    ...resolvedConfig.puppeteerClusterOptions,
  }) as unknown as KumphousePuppeteerCluster
  // hacky solution to mock the display which avoids spamming the console while still monitoring system stats
  cluster.display = {
    log() {},
    resetCursor() {},
  }
  return cluster
}
