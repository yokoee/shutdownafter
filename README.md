# usage
```
> git clone https://github.com/yokoee/shutdownafter.git
> cd shutdownafter
```
```
> node shutdownafter.js [-h/-r/-s] [timeout] [command]
```
参数|说明  
----|---- 
-h | 休眠    
-r | 重启    
-s | 关机
timeout | 执行关机/重启/休眠操作的延时，时间单位为秒
command | 要执行的命令，用双引号包住，如 "echo null"