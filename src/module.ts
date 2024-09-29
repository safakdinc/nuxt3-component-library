import { defineNuxtModule, addPlugin, createResolver, installModule, addComponentsDir } from '@nuxt/kit';

// Module options TypeScript interface definition
export interface ModuleOptions {
  css: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'deneme',
    configKey: 'deneme'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    css: true
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve('./runtime');

    addPlugin({
      src: resolver.resolve(runtimeDir, 'plugins', 'eventBus')
    });

    // Install v-wave plugin
    nuxt.options.build.transpile.push('gsap');
    nuxt.options.build.transpile.push('mitt');
    nuxt.options.build.transpile.push('date-fns');
    nuxt.options.build.transpile.push('three');
    nuxt.options.build.transpile.push(runtimeDir);
    await installModule('v-wave/nuxt');

    // Install tailwindcss
    await installModule('@nuxtjs/tailwindcss', {
      cssPath: options.css ? resolver.resolve('./runtime/assets/css/tailwind.css') : false,
      configPath: resolver.resolve('../tailwind.config')
    });

    // Add components directory with prefix
    await addComponentsDir({
      path: resolver.resolve('./runtime/components'), // path of components
      prefix: '', // Prefix component names
      global: true // Registers components to be globally available.
    });
  }
});
