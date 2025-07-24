// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-21",
  devtools: true,
  ssr: false,

  // Set the source directory to 'app'
  srcDir: "app/",

  extends: ["./layers/pantherui"],
  components: {
    global: true,
    dirs: ["~/components"],
  },

  modules: ["@nuxt/content", "@nuxt/image", "@nuxt/eslint", "@tresjs/nuxt"],

  content: {
    // Remove the 'sources' section here.
    // sources: {
    //   content: {
    //     driver: 'fs',
    //     base: resolve(__dirname, 'content')
    //   }
    // },
    markdown: {
      mdc: true,
      markdown: {
        remarkPlugins: ["remark-unwrap-images"],
        rehypePlugins: [],
      },
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag === "spline-viewer";
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "gsap",
        "gsap/ScrollTrigger",
        "gsap/dist/Flip",
        "gsap/ScrollToPlugin",
        "split-type",
        "shiki",
        "tailwind-merge",
        "three",
      ],
    },
  },

  nitro: {
    preset: "netlify",
  },

  css: ["~/main.css", "~/assets/css/transitions.scss"],
});
