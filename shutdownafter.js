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
    setTimeout(() => {
        console.log('正在' + modeName + ' ...');
        //spawn('shutdown', [mode]);        
    }, parseInt(timeout) * 1000);
})