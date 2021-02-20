const consoleAndDebuggerLv =
    process.env.NODE_ENV === 'production' ? 'off' : 'off'
module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            tsx: true,
            jsx: true,
        },
    },
    rules: {
        'no-console': consoleAndDebuggerLv,
        'no-debugger': consoleAndDebuggerLv,
        // 'semi': 0,
        '@typescript-eslint/consistent-type-assertions': 0,
        '@typescript-eslint/ban-types': 0,
        'no-param-reassign': 'off',
        'no-unused-expressions': 'off',
        'no-useless-escape': 'off',
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        'arrow-parens': 0,
        'object-curly-newline': 0,
        'class-methods-use-this': 0,
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/type-annotation-spacing': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-this-alias': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-empty-function': 0,
        indent: [
            // 缩进，4个空格，switch case语句缩进级别
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        curly: [
            //必须使用 if(){} 中的{}
            2,
            'all',
        ],
        'max-depth': [0, 4], //嵌套块深度
        'comma-spacing': 2, //逗号前后的空格
        'comma-style': [2, 'last'], //逗号风格，换行时在行首还是行尾
        'key-spacing': [2, { beforeColon: false, afterColon: true }], //对象字面量中冒号的前后空格
        'semi-spacing': [2, { before: false, after: true }], //分号前后空格
        // 'space-unary-ops': [2, { words: true, nonwords: false }], //一元运算符的前/后要不要加空格
        'eqeqeq': 2, //必须使用全等
        'no-this-before-super': 2, //在调用super()之前不能使用this或super
        'no-undef': 2, //不能有未定义的变量
        'no-nested-ternary': 2, //禁止使用嵌套的三目运算
        'no-extra-semi': 2, //禁止多余的冒号
        'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
        'prefer-const': 2, //首选const
        'no-const-assign': 2, //禁止修改const声明的变量
        'new-parens': 2, //new时必须加小括号
        'strict': 2, //使用严格模式
        'no-duplicate-case': 2, //switch中的case标签不能重复
        'default-case': 2, //switch语句最后必须有default
        'valid-typeof': 2, //必须使用合法的typeof的值
        'quotes': [
            //single 强制使用单引号（double双引号，backtick反勾号）
            'error',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
        semi: [
            //never 强制不使用分号    always 强制使用分号
            'error',
            'never',
        ],
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                mocha: true,
            },
        },
    ],
}
