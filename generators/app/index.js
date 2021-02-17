const Generator = require('yeoman-generator')

module.exports = class extends Generator{
    //创建前问询
    prompting(){
        return this.prompt([
            {
                type:'input',
                name:'name',
                message:'Your project name',
                default:this.appname
            }
        ]).then(answers=>{
            this.answers=answers
        })
    }

    //创建，在当前目录写入文件
    writing(){
        //将每个文件都通过模板转换到目标路径
        const templates = [
            
            'dist/ES2015.js',
            'dist/Flow.js',
            'src/ES2015.js',
            'src/Flow.js',
            'src/index.html',
            '.babelrc',
            '.flowconfig',
            'package.json',
            'typescript.ts',
            'README.md'
        ]
        
        templates.forEach(item => {
            //item =>每个文件路径
            this.fs.copyTpl(
                //入口，出口，内容
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })
    }
}