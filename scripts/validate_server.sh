#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# for now we are just checking that we get back a page from the server
echo validating server
#curl -m 5 http://localhost:8080
