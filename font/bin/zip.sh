#!/bin/bash

if [ -d "$1" -a -n "$1" ]
then 
    cd $1
    echo -e "\033[44;30m INFO \033[0m current zip directory:" `pwd`
    for dir in `ls .`
    do
        if [ -d "$dir" ]
        then
            rm -f $dir.$(date +%Y-%m-%d).zip
            zip -x "*/\.*" -rm $dir.$(date +%Y-%m-%d).zip $dir
            echo -e "\033[42;30m DONE \033[0m ${dir}.$(date +%Y-%m-%d).zip" 
        fi
    done
else 
    echo -e "\033[41;30m ERROR \033[0m No such directory:" $1
fi 
