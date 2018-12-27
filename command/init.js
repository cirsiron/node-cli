'use strict'

const exec = require('child_process').exec;
const co = require('co');
const prompt = require('co-prompt');
const config = require('../templates');
const chalk = require('chalk');


module.exports = function() {
    co(function *() {
        let tplName = yield prompt('template name: ');
        
        if(!config.tpl[tplName]) {
            console.log(chalk.red('\n x template dose not exit!'));
            process.exit();
        }
        let projectName = yield prompt('project name: ');
        let gitUrl = config.tpl[tplName].url;
        if(!gitUrl) {
            process.exit();
        }
        
        let cmdStr = `git clone ${gitUrl} ${projectName}`;
        console.log(chalk.white('\n start generating...'));
        exec(cmdStr, (err, stdout, stderr) => {
            if(err) {
                console.log(err);
                process.exit();
            }
            console.log(chalk.green('\n √ generation complated!'));
            console.log(`\n cd ${projectName} && npm i \n`);
            process.exit();
        })
    })
}