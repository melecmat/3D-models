#!/bin/bash
# script for model processing
#PUT TO /usr/local/bin
# $1 -- input $2 -- output
if [ $1 == "" ] || [ $2 == "" ]; then
    echo 'No filenames (put first input, then output)'
    exit 100
fi
#convert obj to glb
if [ ${1: -4} == ".obj" ]; then
    echo "Converting .obj to .gltf"
    obj2gltf --binary -i $1 -o $2
fi
if [ ${1: -4} == ".fbx" ]; then
    echo "Converting .fbx to .gltf"
    FBX2glTF --binary -i $1 -o $2
fi
mkdir tmp
#separate glb files so that texture can be optimised
echo "Separating textures to work with"
gltf-pipeline -i $2 -o tmp/tmp.gltf --separate --json
echo "Optimising textures"
#texture optimisation ...
for i in tmp/*.png; do
    [ -f "$i" ] || break # when there is no png
    name=${i::-4}
    name=${name:4}
    echo "$name"
    convert tmp/$name.png -quality 85 tmp/$name.jpg
    sed -i -e 's/'"$name"'.png/'"$name"'.jpg/g' tmp/tmp.gltf
done
for i in tmp/*.jpg tmp/*.jpeg; do
    [ -f "$i" ] || break # when there is no jpeg
    jpegoptim $i
    #sed -i -e 's/'"$name"'.jpeg/'"$name"'.jpg/g' tmp/tmp.gltf
done
    # get basename
    #NAME=tmp
    # convert png texture to jpg
    #png=$(find . -maxdepth 1 -name "*png" -print)
    #png=${png:2}
    #echo $png
    #convert tmp/$png -quality 85 tmp/$NAME.jpg 
    # optimise jpg
    #jpegoptim $NAME.jpg
    # substitutes every string occurence in a file
    #echo "Changing gltf json file"
    #sed -i -e 's/'"$png"'/'"$NAME"'.jpg/g' tmp/$NAME.gltf
# put back into glb and compresses with draco
echo "Creating final glb file with draco compression"
gltf-pipeline -i tmp/tmp.gltf -o $2 --binary --draco --draco.compressionLevel=10
#cleanup
rm -rf tmp
echo "Done"