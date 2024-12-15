import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $configuration: path.resolve("./src/lib/configuration"),
      $components: path.resolve("./src/lib/components"),
      $pages: path.resolve("./src/lib/pages"),
      $utils: path.resolve("./src/lib/utils"),
      $server: path.resolve("./src/lib/server"),
      $client: path.resolve("./src/lib/client"),
      $session: path.resolve("./src/lib/session"),
      $types: path.resolve("./src/lib/types"),
      $css: path.resolve("./src/css"),
    },
  },
});
