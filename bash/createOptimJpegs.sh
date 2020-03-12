#!/bin/bash

# first argument
if [ $1 == "" ] || [ $2 == "" ]; then
    echo 'First argument -- folder, second argument -- if should do all subfolders -- true -- will do them.'
    exit 100
fi

optimize_folder () {
    cd "$1"
    mkdir full
    for i in *.jpg *.jpeg *.JPG; do
        #[ -f "$i" ] || break # when there is no jpeg
        # copy original to /full
        cp "$i" full
        jpegoptim "$i" --size=15%
    done
    cd ../
}

if [ $2 == "true" ]; then
    cd "$1"
    for d in */ ; do
        optimize_folder "$d"
    done
else
    optimize_folder "$1"
fi