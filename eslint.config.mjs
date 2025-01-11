// @ts-check

import { fixupConfigRules } from '@eslint/compat'
import reactRefresh from 'eslint-plugin-react-refresh'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

export default tseslint.config(
    [
        {
            ignores: [
                '**/build/',
                '**/node_modules/',
                '**/dist/',
                '**/.prettierrc.js',
                '**/.eslintrc.js',
                '**/env.d.ts',
                '**/eslint.config.mjs',
                '**/postcss.config.cjs',
                '**/tailwind.config.cjs',
            ],
        },
        ...fixupConfigRules(
            compat.extends(
                'eslint:recommended',
                'plugin:import/recommended',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'prettier',
                'eslint-config-prettier',
            ),
        ),
        {
            plugins: {
                'react-refresh': reactRefresh,
            },

            settings: {
                react: {
                    version: 'detect',
                },

                'import/parsers': {
                    '@typescript-eslint/parser': ['.ts', '.tsx'],
                },

                'import/resolver': {
                    typescript: {
                        project: './tsconfig.eslint.json',
                        alwaysTryTypes: true,
                    },
                },
            },
            rules: {
                'react-refresh/only-export-components': [
                    'warn',
                    {
                        allowConstantExport: true,
                    },
                ],
                'react-hooks/rules-of-hooks': 'off',
                'react/react-in-jsx-scope': 'off',
                'import/first': 'warn',
                'import/default': 'off',
                'import/newline-after-import': 'warn',
                'import/no-named-as-default-member': 'off',
                'import/no-duplicates': 'error',
                'import/no-named-as-default': 0,
                'react/prop-types': 'off',
                'react/jsx-sort-props': [
                    'warn',
                    {
                        callbacksLast: true,
                        shorthandFirst: true,
                        ignoreCase: true,
                        reservedFirst: true,
                        noSortAlphabetically: true,
                    },
                ],
            },
        },
    ],
    tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['**/*.tsx', '**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-expressions': 'off',
        },
    },
)
