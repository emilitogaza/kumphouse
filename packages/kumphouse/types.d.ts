import type { UserConfig } from 'kumphouse-core'

export * from 'kumphouse-core'

declare global {
  const defineKumphouseConfig: UserConfig | (() => UserConfig) | (() => Promise<UserConfig>)
}
