import type { UserConfig } from 'kumphouse-core'
import type { ConfigLayerMeta, DefineConfig } from 'c12'

export { UserConfig } from 'nuxt/schema'

export interface DefineKumphouseConfig extends DefineConfig<UserConfig, ConfigLayerMeta> {}
export declare const defineKumphouseConfig: DefineKumphouseConfig
