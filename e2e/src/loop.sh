#!/usr/bin/env bash

COUNTER=0
while [  $COUNTER -lt 100 ]; do
    echo The counter is $COUNTER
    let COUNTER=COUNTER+1
    ng e2e ;
    
    if [ $? ] ; then
        echo "e2e success"
    else
        echo "e2e fail"
    fi
done