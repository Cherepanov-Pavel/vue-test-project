import json from '@eslint/json'
import markdown from '@eslint/markdown'
import stylistic from '@stylistic/eslint-plugin'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginVue from 'eslint-plugin-vue'

const fixedVueConfig = pluginVue.configs['flat/essential']
fixedVueConfig[2].files = [
	'*.vue',
	'**/*.vue'
]

export default [
	{'ignores': ['**/dist/**']},
	...fixedVueConfig,
	...vueTsEslintConfig(),

	{
		'files': [
			'**/*.ts',
			'**/*.vue'
		],
		'rules': {'@typescript-eslint/no-unused-vars': 'warn'}
	},
	{
		'files': [
			'**/*.js',
			'**/*.ts',
			'**/*.vue'
		],
		'plugins': {'@stylistic': stylistic},
		'rules': {
			...stylistic.configs['recommended-flat'].rules,
			'@stylistic/array-bracket-newline': [
				'error',
				{
					'minItems': 2,
					'multiline': true
				}
			],
			'@stylistic/array-element-newline': [
				'error',
				{
					'minItems': 2,
					'multiline': true
				}
			],
			'@stylistic/arrow-parens': [
				'error',
				'always'
			],
			'@stylistic/arrow-spacing': [
				'error',
				{
					'after': true,
					'before': true
				}
			],
			'@stylistic/block-spacing': 'off',
			'@stylistic/brace-style': [
				'error',
				'1tbs'
			],
			'@stylistic/comma-dangle': [
				'error',
				'never'
			],
			'@stylistic/comma-spacing': [
				'error',
				{
					'after': true,
					'before': false
				}
			],
			'@stylistic/comma-style': [
				'error',
				'last'
			],
			'@stylistic/computed-property-spacing': [
				'error',
				'never'
			],
			'@stylistic/eol-last': [
				'error',
				'never'
			],
			'@stylistic/indent': [
				'error',
				'tab'
			],
			'@stylistic/multiline-comment-style': [
				'error',
				'separate-lines'
			],
			'@stylistic/no-tabs': 'off',
			'@stylistic/object-curly-newline': [
				'error',
				{
					'minProperties': 2,
					'multiline': true
				}
			],
			'@stylistic/object-curly-spacing': [
				'error',
				'never'
			],
			'@stylistic/object-property-newline': [
				'error',
				{'allowAllPropertiesOnSameLine': false}
			],
			'@stylistic/operator-linebreak': [
				'error',
				'after'
			],
			'@stylistic/quote-props': [
				'error',
				'always'
			],
			'@stylistic/quotes': [
				'error',
				'single'
			]
		}
	},
	{
		'files': [
			'**/*.js',
			'**/*.ts',
			'**/*.vue'
		],
		'plugins': {perfectionist},
		'rules': {
			...perfectionist.configs['recommended-natural'].rules,
			'perfectionist/sort-interfaces': [
				'error',
				{
					'partitionByNewLine': true,
					'type': 'natural'
				}
			],
			'perfectionist/sort-objects': [
				'error',
				{
					'partitionByNewLine': true,
					'type': 'natural'
				}
			]
		}
	},
	{
		'files': ['**/*.vue'],
		'rules': {
			'vue/block-lang': [
				'error',
				{'script': {'lang': 'ts'}}
			],
			'vue/block-order': [
				'error',
				{
					'order': [
						'script',
						'template',
						'style'
					]
				}
			],
			'vue/component-api-style': [
				'error',
				['script-setup']
			],
			'vue/component-name-in-template-casing': [
				'error',
				'PascalCase',
				{'registeredComponentsOnly': false}
			]
		}
	},

	{'plugins': {json}},
	{
		'files': ['**/*.json'],
		'ignores': ['package-lock.json'],
		'language': 'json/json',
		'rules': {...json.configs.recommended.rules}
	},
	{
		'files': [
			'**/*.jsonc',
			'.vscode/*.json'
		],
		'language': 'json/jsonc',
		'rules': {...json.configs.recommended.rules}
	},
	{
		'files': ['**/*.json5'],
		'language': 'json/json5',
		'rules': {...json.configs.recommended.rules}
	},

	...markdown.configs.recommended
]