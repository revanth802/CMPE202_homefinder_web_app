#!/bin/bash
sudo yum update -y
sudo yum install git -y
sudo yum -y install httpd
sudo service httpd start 

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
git clone https://sandeepreddyb253:BSreddy253@github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_13.git
ip=$(curl -4 icanhazip.com)
sed -i '' -e "s|localhost|$ip|g" fa20-cmpe-202-sec-02-team-project-team_13/backend/config/mongoconfig.js
sed -i '' -e "s|localhost|$ip|g" fa20-cmpe-202-sec-02-team-project-team_13/frontend/src/webconfig.js
cd fa20-cmpe-202-sec-02-team-project-team_13/frontend
npm i --save
nohup npm start
cd ../backend
npm i --save
nohup node server.js