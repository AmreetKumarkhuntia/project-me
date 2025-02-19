import { isJSON } from "type-decoder";

/**
 * @type { Source }
 */
export type Source = "github" | "spotify" | "games";

export function decodeSource(rawInput: unknown): Source | null {
  switch (rawInput) {
    case "github":
    case "spotify":
    case "games":
      return rawInput;
  }
  return null;
}

/**
 * @type { Language }
 */
export type Language =
  | "css"
  | "sass"
  | "javascript"
  | "typescript"
  | "java"
  | "python"
  | "ruby"
  | "php"
  | "go"
  | "c#"
  | "swift"
  | "kotlin"
  | "cpp"
  | "c"
  | "haskell"
  | "rust"
  | "html"
  | "purescript"
  | "yaml"
  | "bash";

export function decodeLanguage(rawInput: unknown): Language | null {
  switch (rawInput) {
    case "css":
    case "sass":
    case "javascript":
    case "typescript":
    case "java":
    case "python":
    case "ruby":
    case "php":
    case "go":
    case "c#":
    case "swift":
    case "kotlin":
    case "cpp":
    case "c":
    case "haskell":
    case "rust":
    case "html":
    case "purescript":
    case "yaml":
    case "bash":
      return rawInput;
  }
  return null;
}

/**
 * @type { Framework }
 */
export type Framework =
  | "react"
  | "graphql"
  | "angular"
  | "vue"
  | "spring"
  | "django"
  | "express"
  | "ember"
  | "flask"
  | "ruby-on-rails"
  | "laravel"
  | "next.js"
  | "svelte"
  | "asp.net"
  | "fastapi"
  | "mustache"
  | "servant"
  | "yesod"
  | "snap"
  | "spock"
  | "play"
  | "hspec"
  | "jinja"
  | "bootstrap"
  | "tailwind"
  | "material-ui"
  | "foundation"
  | "semantic-ui"
  | "nuxt.js"
  | "nuxt3"
  | "flask-admin"
  | "quasar"
  | "blazor";

export function decodeFramework(rawInput: unknown): Framework | null {
  switch (rawInput) {
    case "react":
    case "graphql":
    case "angular":
    case "vue":
    case "spring":
    case "django":
    case "express":
    case "ember":
    case "flask":
    case "ruby-on-rails":
    case "laravel":
    case "next.js":
    case "svelte":
    case "asp.net":
    case "fastapi":
    case "mustache":
    case "servant":
    case "yesod":
    case "snap":
    case "spock":
    case "play":
    case "hspec":
    case "jinja":
    case "bootstrap":
    case "tailwind":
    case "material-ui":
    case "foundation":
    case "semantic-ui":
    case "nuxt.js":
    case "nuxt3":
    case "flask-admin":
    case "quasar":
    case "blazor":
      return rawInput;
  }
  return null;
}

/**
 * @type { Tool }
 */
export type Tool = "git" | "docker" | "kubernetes" | "aws";

export function decodeTool(rawInput: unknown): Tool | null {
  switch (rawInput) {
    case "git":
    case "docker":
    case "kubernetes":
    case "aws":
      return rawInput;
  }
  return null;
}

/**
 * @type { Database }
 */
export type Database =
  | "mongodb"
  | "mysql"
  | "postgresql"
  | "firebase"
  | "redis";

export function decodeDatabase(rawInput: unknown): Database | null {
  switch (rawInput) {
    case "mongodb":
    case "mysql":
    case "postgresql":
    case "firebase":
    case "redis":
      return rawInput;
  }
  return null;
}
