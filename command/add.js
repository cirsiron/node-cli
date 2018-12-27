'use strict'

const co = require('co');
const prompt = require('co-prompt');
const config = require('../templates');
const chalk = require('chalk');
const fs = require('fs');



module.exports = function() {
    co(function *() {
        let tplName = yield prompt('template name: ');
        let gitUrl = yield prompt('git http link: ');
        let branch = yield prompt('branch: ');

        if(!config.tpl[tplName]) {
            config.tpl[tplName] = {};
            config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '');
            config.tpl[tplName]['branch'] = branch;
        } else {
            console.log(chalk.red('tmplate has already existed!'));
            process.exit();
        }

        fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(chalk.green('new template added!\n'));
            console.log(chalk.grey('the last template list is: \n'));
            console.log(config);
            console.log('\n');
            process.exit();
        })
    })
}