/**
 * 根目录下 commonjs环境
 * chalk5是ESM commonjs中需要使用chalk4.x
 * npm i -D chalk@4.1.2
 */

const chalk = require("chalk")
const msgPath = process.argv[2]

const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /^(((\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]) )?(revert: )?(feat|fix|docs|UI|refactor|⚡perf|workflow|build|CI|typos|chore|tests|types|wip|release|dep|locale): .{1,50}/

if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`提交日志不符合规范`)}\n\n${chalk.red(
      `  合法的提交日志格式如下(emoji 选填)：\n\n`,
    )}
    ${chalk.green(`💥 feat: 添加了个很棒的功能`)}
    ${chalk.green(`🐛 fix: 修复了一些 bug`)}
    ${chalk.green(`📝 docs: 更新了一下文档`)}
    ${chalk.green(`🌷 UI: 修改了一下样式`)}
    ${chalk.green(`🏰 chore: 对脚手架做了些更改`)}
    ${chalk.green(`🌐 locale: 为国际化做了微小的贡献`)}
    ${chalk.red(`更多提交前缀查看commit-msg.js\n`)}`
  )
  process.exit(1)
}
