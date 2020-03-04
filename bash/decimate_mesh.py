import meshlabxml as mlx

script = 'simplify.mlx' # script file
original_mesh = '/mnt/c/Users/matous/3D Objects/Plumlov_crop_6M_93x1k.obj' # input file
simplified_mesh = '/mnt/c/Users/matous/3D Objects/Plumlov_out.obj' # output file

mlx.begin(script=script, file_in=original_mesh) # Start writing the script to the script file
mlx.remesh.simplify(script=script, texture=True, faces=0,
                    target_perc=0.3, quality_thr=0.3, preserve_boundary=False,
                    boundary_weight=1.0, preserve_normal=False,
                    optimal_placement=True, planar_quadric=False,
                    selected=False, extra_tex_coord_weight=1.0,
                    preserve_topology=True, quality_weight=False,
                    autoclean=True)
mlx.end(script=script) # Finish writing the script to the script file

mlx.run(script=script, file_in=original_mesh, file_out=simplified_mesh) # Run the script file on the input and export the output.