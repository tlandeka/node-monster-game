#!/bin/bash

set -e

NUMBER_OF_MONSTERS=$1

if [ -z "$NUMBER_OF_MONSTERS" ]; then
      echo "[ERROR] please pass number of monsters"
      exit
fi

echo "number of monsters $NUMBER_OF_MONSTERS"

MYDIR=`dirname $0`

docker stop monster-app || true
docker rm monster-app  || true
docker build -t monster-app  ${MYDIR}/.

docker run --name monster-app  monster-app npm start ${NUMBER_OF_MONSTERS}