// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  components: {
    global: true,
    dirs: ['~/components']
  },

  modules: ['./src/module', '@nuxt/content', '@nuxt/image'],

  content: {
    sources: {
      content: {
        driver: 'fs',
        base: resolve(__dirname, 'app/content')
      }
    },
    markdown: {
      mdc: true,
      markdown: {
        remarkPlugins: ['remark-unwrap-images'],
        rehypePlugins: []
      }
    }
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => {
        return tag === 'spline-viewer';
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }
  },
  deneme: {
    css: true
  },

  css: ['./main.scss', './app/assets/css/transitions.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  ssr: true,
  compatibilityDate: '2024-09-16'
});
