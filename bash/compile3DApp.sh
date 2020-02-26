#!/bin/bash
#script to use to compile pug and filenames
cd /mnt/c/users/matou/Documents/GitHub/3D-models/
python3 bash/save_filenames_into_json.py
pug -w -c ./01_pug/to_be_compiled -o ./02_html -P