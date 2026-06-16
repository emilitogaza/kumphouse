import type { AliasOptions } from 'vite'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const r = (p: string) => resolve(__dirname, p)

export const alias: AliasOptions = {
  'kumphouse': r('./packages/core/src/'),
  '@kumphouse/client': r('./packages/client/src/'),
}

export default defineConfig({
  test: {
    testTimeout: 3000000,
  },
  resolve: {
    alias,
  },
})
