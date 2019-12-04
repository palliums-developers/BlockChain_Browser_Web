ps -ef | grep lb.js | grep -v grep | awk '{print $2}' | xargs kill
ps -ef | grep bitcoin-browser.js | grep -v grep | awk '{print $2}' | xargs kill
