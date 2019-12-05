nohup npm start > nohup.out 2>&1 &
# nohup node ./libra_core_api/libra_browser_api_simple.js > ./libra_core_api/nohup.out 2>&1 &
cd ../bitcoin-browser-api/sh
./start-bitcoin-api.sh
# ps -ef | grep Libra-Browser | grep -v grep
# ps -ef | grep libra_core_api| grep -v grep
# nohup node ../bitcoin-browser-api/src/lb.js > ../bitcoin-browser-api/log/nohup_lb.out 2>&1 &
# nohup node ../bitcoin-browser-api/src/bitcoin-browser.js > ../bitcoin-browser-api/log/nohup_start.out 2>&1 &
cd ../../sh
./ps.sh