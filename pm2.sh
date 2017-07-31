#!/bin/bash
pm2 delete index
git pull
pm2 start index.js
clear
echo -e "Pm2 hoàn thành! \n"
