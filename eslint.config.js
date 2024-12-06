import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import json from "@eslint/json";

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
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
		}
	},
	{
		files: ["**/*.jsonc", ".vscode/*.json"],
		language: "json/jsonc",
		rules: {
			...json.configs.recommended.rules,
		}
	},
	{
		files: ["**/*.json5"],
		language: "json/json5",
		rules: {
			...json.configs.recommended.rules,
		}
	},
]
