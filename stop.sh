ps -ef | grep Libra-Browser | grep -v grep 
ps -ef | grep libra_core_api| grep -v grep 
ps -ef | grep Libra-Browser | grep -v grep | awk '{print $2}'
ps -ef | grep libra_core_api| grep -v grep | awk '{print $2}'
ps -ef | grep Libra-Browser | grep -v grep | awk '{print $2}'| xargs kill
ps -ef | grep libra_core_api| grep -v grep | awk '{print $2}'| xargs kill

