import json from "@eslint/json"
import stylistic from "@stylistic/eslint-plugin"
import vueTsEslintConfig from "@vue/eslint-config-typescript"
import perfectionist from "eslint-plugin-perfectionist"
import pluginVue from "eslint-plugin-vue"

const fixedVueConfig = pluginVue.configs["flat/essential"]
fixedVueConfig[2].files = ["*.vue", "**/*.vue"]

export default [
  {
    ignores: ["**/dist/**"],
  },
  ...fixedVueConfig,
  ...vueTsEslintConfig(),

  {
    plugins: {
      json,
    },
  },
  {
    files: ["**/*.json"],
    language: "json/json",
    rules: {
      ...json.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.jsonc", ".vscode/*.json"],
    language: "json/jsonc",
    rules: {
      ...json.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.json5"],
    language: "json/json5",
    rules: {
      ...json.configs.recommended.rules,
    },
  },

  {
    files: ["**/*.ts", "**/*.js", "**/*.vue"],
    plugins: {
      perfectionist,
    },
    rules: {
      ...perfectionist.configs["recommended-natural"].rules,
      "perfectionist/sort-interfaces": ["error", { partitionByNewLine: true, type: "natural" }],
      "perfectionist/sort-objects": ["error", { partitionByNewLine: true, type: "natural" }],
    },
  },

  {
    files: ["**/*.ts", "**/*.js", "**/*.vue"],
    ...stylistic.configs.customize({
      quotes: "double",
    }),
  },
]
