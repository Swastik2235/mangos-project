#!/bin/bash

echo "Start Deploy"
cd /home/mangos/angular/mangOS-admin
git pull origin testing
sudo cp   .htaccess    dist/mangosAdmin
sudo systemctl reload nginx
echo "Finish Deploy"
