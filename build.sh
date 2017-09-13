#!/bin/bash

repos=(
  "/home/dturner/git/kanjingo-react-redux"
)

echo ""
echo "Pulling latest from git"

for repo in "${repos[@]}"
do
  echo ""
  echo "***** Getting latest for" ${repo} "*****"
  cd "${repo}"
  git fetch
  git diff origin/master --quiet
  if [ $? -eq 1 ]
  then
    echo "Need to Update..."
    echo "Pulling from GIT..."
    git pull
    echo "Restarting PM2"
    pm2 kill
    echo "Starting Server"
    cd server
    npm run prod
    echo "Server Started"
    cd ..
    echo "Starting Client"
    cd client
    npm run start-prod
    echo "Client Started"
  fi
  echo "***** DONE *****"

done
