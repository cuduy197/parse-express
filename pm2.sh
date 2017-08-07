#!/bin/bash
pm2 delete index
git pull
if [ $? -eq 0 ]; then
else
    echo Reset hard git
	git reset --hard
fi
pm2 start index.js
echo -e "Pm2 hoàn thành! \n"
