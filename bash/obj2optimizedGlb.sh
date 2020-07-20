#!/bin/bash
# script for model processing
#PUT TO /usr/local/bin
# $1 -- input.obj or input.fbx $2 -- output
if [ -z "$1" ] || [ -z "$2" ] || [ ${2: -4} != ".glb" ] ||
    ([ ${1: -4} != ".obj" ] && [ ${1: -4} != ".fbx" ] && [ ${1: -4} != ".glb" ]); then
    echo 'Script, that converts models from .obj or .fbx into .glb and optimizes it:'
    echo 'compresses textures and applies draco compression. If '
    echo 'Usage:'
    echo 'obj2optimizedGlb.sh input.obj(or .fbx, .glb) output.glb'
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
    convert tmp/$name.png -quality 85 tmp/$name.jpg
    sed -i -e 's/'"$name"'.png/'"$name"'.jpg/g' tmp/tmp.gltf
done
for i in tmp/*.jpg tmp/*.jpeg; do
    [ -f "$i" ] || break # when there is no jpeg
    jpegoptim $i
done
# put back into glb and compresses with draco
echo "Creating final glb file with draco compression"
gltf-pipeline -i tmp/tmp.gltf -o $2 --binary --draco --draco.compressionLevel=10
#cleanup
rm -rf tmp
echo "Done"