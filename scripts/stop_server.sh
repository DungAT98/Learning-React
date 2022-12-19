#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# this file runs first, so during an initail installation error might happen

# simply stop the application process using pm2
echo stopping server
sudo su
pm2 stop "learning-react"
exit
