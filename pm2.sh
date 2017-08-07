#!/bin/bash
pm2 delete index
git pull
pm2 start index.js
pm2 show index
echo -e "Pm2 hoàn thành! \n"
