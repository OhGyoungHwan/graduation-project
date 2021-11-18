#!/bin/bash
while [ 1 ]
do
    pid=`ps -ef | grep "run_api.py" | grep -v 'grep' | awk '{print $2}'`

    if [ -z $pid ]
    then
        echo "server start"
        source <(sudo cat ~/venv/bin/activate)
        python run_api.py
    fi
    sleep 2
done
