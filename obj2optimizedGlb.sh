#!/bin/bash
# script for model processing
if [ $1 == "" ] || [ $2 == "" ]; then
    echo 'No filenames (put first input, then output)'
    exit 100
fi
#convert obj to glb
if [ ${1: -4} == ".obj" ]; then
    echo "Converting .obj to .gltf"
    obj2gltf --binary -i $1 -o $2
fi
mkdir tmp
#separate glb files so that texture can be optimised
echo "Separating textures to work with"
gltf-pipeline -i $2 -o tmp/tmp.gltf --separate --json
echo "Optimising textures"
#texture optimisation ...
    # get basename
    NAME=tmp
    # convert png texture to jpg
    echo "Converting png to jpg"
    png=$(find . -maxdepth 1 -name "*png" -print)
    png=${png:2}
    echo $png
    convert tmp/$png -quality 85 tmp/$NAME.jpg 
    # optimise jpg
    #jpegoptim $NAME.jpg
    # substitutes every string occurence in a file
    echo "Changing gltf json file"
    sed -i -e 's/'"$png"'/'"$NAME"'.jpg/g' tmp/$NAME.gltf
# put back into glb and compresses with draco
echo "Creating final glb file with draco compression"
gltf-pipeline -i tmp/tmp.gltf -o $2 --binary --draco --draco.compressionLevel=10
#cleanup
rm -rf tmp
echo "Done"