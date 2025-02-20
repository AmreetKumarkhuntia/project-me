import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $configuration: "src/lib/configuration",
      $components: "src/lib/components",
      $constants: "src/lib/constants",
      $pages: "src/lib/pages",
      $utils: "src/lib/utils",
      $server: "src/lib/server",
      $client: "src/lib/client",
      $session: "src/lib/session",
      $services: "src/lib/services",
      $stores: "src/lib/stores",
      $types: "src/lib/types",
      $css: "src/css",
      $generated: "src/generated",
      $models: "src/lib/models",
    },
  },
};

export default config;
