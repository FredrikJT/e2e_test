#!/usr/bin/env bash

COUNTER=0
FAILS=0
while [  $COUNTER -lt 100 ]; do
    let COUNTER=COUNTER+1
    ng e2e | grep -Ev '(I/|chunk|wds|wdm)' ;
    
    if [ $? ] ; then
        echo I/e2e success. counter is $COUNTER
    else
        let FAILS=FAILS+1

        echo I/e2e fail number $FAILS. counter is $COUNTER
    fi
done

echo I/This failed $FAILS number of times.