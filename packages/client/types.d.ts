import type { ClientOptionsPayload, ScanMeta, KumphouseRouteReport } from 'kumphouse-core'

declare global {
  interface Window {
    /**
     * Are we running the app in a demo / offline mode.
     */
    __kumphouse_static?: boolean
    /**
     * Data provided for offline / demo mode.
     */
    __kumphouse_payload: { options: ClientOptionsPayload, scanMeta: ScanMeta, reports: KumphouseRouteReport[] }
  }

  const __KUMPHOUSE_VERSION__: string
}
