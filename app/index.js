const Generator = require('yeoman-generator')
const Shell = require('shelljs')
const Path = require('path')
const Fs = require('fs')
const Request = require('request')

const GetAllRepo = () => {
  return new Promise(resolve => {
    Request(
      {
        url: 'https://api.github.com/users/pashangshangpo/repos',
        headers: {
          'User-Agent': 'peak'
        }
      },
      (req, res) => {
        resolve(JSON.parse(res.body))
      }
    )
  })
}

const GetAllTemplate = (repos, reg) => {
  return repos.filter(repo => {
    return reg.exec(repo.name)
  })
  .map(repo => reg.exec(repo.name)[1])
}

const ifThereIsPath = path =>{
  try {
    Fs.readdirSync(path)

    return true
  }
  catch (err) {
    return false
  }
}

const ResolveApp = (...arg) => {
  return Path.join(__dirname, ...arg)
}

module.exports = class extends Generator {
  prompting() {
    console.log('正在获取可用模板列表，此过程可能比较缓慢...')

    return GetAllRepo().then(res => {
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
        },
        {
          type: 'list',
          name: 'projectType',
          message: '请选择你的项目类型',
          choices: GetAllTemplate(res, /^peak-(.*)-template$/),
          default: 0
        }
      ]).then(res => {
        this.renderOptions = res
  
        this.destinationRoot(this.destinationPath(this.renderOptions.name))
      })
    })
  }

  writing() {
    let name = `peak-${this.renderOptions.projectType}-template`
    let templatePath = ResolveApp('templates', name)

    return new Promise(resolve => {
      if (ifThereIsPath(templatePath)) {
        Shell.rm(
          '-rf',
          templatePath,
          {
            silent: true
          }
        )
      }

      Shell.exec(
        `git clone https://github.com/pashangshangpo/${name}.git ${templatePath}`,
        {
          silent: true
        }
      )

      this.fs.copyTpl(
        this.templatePath(name),
        this.destinationPath(),
        {
          title: 'Peak created project'
        },
        {},
        {
          globOptions: {
            dot: true,
            ignore: [
              '**/.git/**'
            ]
          }
        }
      )

      resolve()
    })
  }

  install() {
    let packageManage = this.renderOptions.packageManage

    this.installDependencies({
      bower: false,
      npm: packageManage === 'npm',
      yarn: packageManage === 'yarn'
    })
  }

  end() {
    let { name, packageManage} = this.renderOptions

    console.log(`cd ${name} && ${packageManage} start`)
  }
}