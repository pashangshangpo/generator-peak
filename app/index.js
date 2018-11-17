const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入项目名',
        default: this.appname.split(' ').join('-')
      }
    ]).then(config => {
      console.log(config)
    })
  }
}