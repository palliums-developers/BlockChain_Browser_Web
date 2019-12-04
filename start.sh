nohup npm start > nohup.out 2>&1 &
nohup node ./libra_core_api/libra_browser_api_simple.js > ./libra_core_api/nohup.out 2>&1 &
ps -ef | grep Libra-Browser | grep -v grep       
ps -ef | grep libra_core_api| grep -v grep 
