#!/bin/bash
# this file runs first, so during an initail installation error might happen

# simply stop the application process using pm2
echo stopping server
pm2 stop "learning-react"
exit
