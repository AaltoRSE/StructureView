import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',      
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/]
      },
      // from mock-canvas
      setupFiles: ['./vitest.setup.js'],
      deps: {
        inline: ['vitest-canvas-mock'],
      },
      environmentOptions: {
        jsdom: {
          resources: 'usable',
        },
      }
    }
  })
)
