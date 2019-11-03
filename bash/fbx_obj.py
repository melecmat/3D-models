import fbx

# Create an SDK manager                                                                                           
manager = fbx.FbxManager.Create()

# Create a scene
scene = fbx.FbxScene.Create(manager, "")

# Create an importer object                                                                                                  
importer = fbx.FbxImporter.Create(manager, "")

# Path to the .obj file
milfalcon = "samples/millenium-falcon/millenium-falcon.fbx"

# Specify the path and name of the file to be imported                                                                            
importstat = importer.Initialize(milfalcon, -1)

importstat = importer.Import(scene)

# Create an exporter object                                                                                                  
exporter = fbx.FbxExporter.Create(manager, "")

save_path = "samples/millenium-falcon/millenium-falcon.obj"

# Specify the path and name of the file to be imported                                                                            
exportstat = exporter.Initialize(save_path, -1)

exportstat = exporter.Export(scene)