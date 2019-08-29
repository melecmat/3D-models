#!/bin/bash
# $1 -- folder containing files
echo "$1"
cd "$1"
win_path=$(wslpath -w "$1")
matou="matou"
win_path=${win_path/Matouš/$matou}
echo "$win_path"
for i in *.fls; do
    [ -f "$i" ] || break # when there is no .fls
    echo "$i"
    '/mnt/c/Program Files/CloudCompare/CloudCompare.exe' -SILENT -COMPUTE_NORMALS -O "$win_path\\$i" -C_EXPORT_FMT PLY -AUTO_SAVE OFF -SS SPATIAL 0.0085 -SAVE_CLOUDS 
done