#!/usr/bin/env node

const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

// 默认模式为休眠
let mode = '/h';
let modeName = '休眠';
// 默认延迟10s
let timeout = '10';
let command = '';

let argvs = process.argv;

argvs.forEach((argv, index) => {
    switch (argv) {
        case '-s':
            // 关机
            mode = '/s';
            modeName = '关机'
            nextArgv = argvs[index + 1];
            if (isTime(nextArgv)) timeout = nextArgv;
            break;
        case '-r':
            // 重启
            mode = '/r';
            modeName = '重启';
            nextArgv = parseInt(argvs[index + 1]);
            if (isTime(nextArgv)) timeout = nextArgv;
            break;
        case '-h':
            // 休眠
            mode = '/h';
            modeName = '休眠';
            nextArgv = argvs[index + 1];
            if (isTime(nextArgv)) timeout = nextArgv;
            break;
        default:
            if (index != 0 && index != 1 && !isTime(argv)) {
                command = argv;
            }
    }
})

function isTime(string) {
    if (string.length == parseInt(string).toString().length) {
        return true;
    } else {
        return false;
    }
}
if (command) {
    let run = exec(command);
    run.stderr.on('data', (data) => {
        console.log(data);
    })
    run.stdout.on('data', (data) => {
        console.log(data);
    })
    run.on('close', () => {
        console.log('\"' + command + '\"' + ' 执行完毕！');
        console.log('将于 ' + timeout + ' 秒后 ' + modeName);
        console.log('要取消' + modeName + '请按 Ctrl+C ');
        setTimeout(() => {
            console.log('正在' + modeName + ' ...');
            //spawn('shutdown', [mode]);        
        }, parseInt(timeout) * 1000);
    })
} else {
    console.log('usage: shutdowna [-h/-r/-s] [timeout] [command]\n\n' +
        '-h 休眠\n' +
        '-r 重启\n' +
        '-s 关机\n' +
        'timeout 执行关机/重启/休眠操作的延时，时间单位为秒\n' +
        'command 要执行的命令，用双引号包住，如 "echo null"');
}