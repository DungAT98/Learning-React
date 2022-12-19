#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
echo starting server

# here we just use npm to run the build
cd /var/www/
sudo su
nvm use 16
echo building application...
npm run build

# start the application with pm2
echo starting application...
pm2 stop "learning-react"
pm2 serve build 80 --name "learning-react" --spa
