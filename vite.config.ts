import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $configuration: path.resolve("./src/lib/configuration"),
      $components: path.resolve("./src/lib/components"),
      $constants: path.resolve("./src/lib/constants"),
      $pages: path.resolve("./src/lib/pages"),
      $utils: path.resolve("./src/lib/utils"),
      $server: path.resolve("./src/lib/server"),
      $client: path.resolve("./src/lib/client"),
      $session: path.resolve("./src/lib/session"),
      $services: path.resolve("./src/lib/services"),
      $types: path.resolve("./src/lib/types"),
      $css: path.resolve("./src/css"),
      $generated: path.resolve("./src/generated"),
    },
  },
});
