#!/bin/bash
echo starting server

# here we just use npm to run the build
cd /var/www/
sudo nvm use node
echo building application...
sudo npm run build

# start the application with pm2
echo starting application...
sudo pm2 serve build 80 --name "learning-react" --spa
