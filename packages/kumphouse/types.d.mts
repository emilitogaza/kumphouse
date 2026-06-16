import type { UserConfig } from 'kumphouse-core'

export * from './dist/index.mjs'

declare global {
  const defineKumphouseConfig: UserConfig | (() => UserConfig) | (() => Promise<UserConfig>)
}
