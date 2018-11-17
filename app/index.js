const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入项目名',
        default: this.appname.split(' ').join('-')
      },
      {
        type: 'list',
        name: 'packageManage',
        message: '请选择你的包管理器',
        choices: [
          'npm',
          'yarn'
        ],
        default: 0
      }
    ]).then(config => {
      console.log(config)
    })
  }
}