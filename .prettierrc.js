module.exports = {
  printWidth: 200, // 一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2,
  useTabs: false, // 注意：makefile文件必须使用tab
  singleQuote: true, // 单引号
  semi: false, // 行末分号
  trailingComma: 'es5', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true, // 对象大括号之间是否有空格，默认为true，效果：{ foo: bar }
  endOfLine: 'auto', // 行尾换行格式
  arrowParens: 'avoid', // 箭头圆括号
  proseWrap: 'preserve', // 代码超出是否要换行, preserve保留
  jsxSingleQuote: false, // JSX双引号
  bracketSameLine: false, // > 标签放在最后一行的末尾，而不是单独放在下一行
  insertPragma: false, // 在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化。
}
