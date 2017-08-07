#!/bin/bash
pm2 delete index
if [ $? -eq 0 ]; then
    echo PM2 OK
else
    echo USING SUDO
	sudo pm2 delete index
fi

git pull

pm2 start index.js
if [ $? -eq 0 ]; then
    echo PM2 OK
else
    echo USING SUDO
	sudo pm2 start index.js
fi

echo -e "Pm2 hoàn thành! \n"
