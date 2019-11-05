import os
import json

def do_whole_project():
    projects = os.listdir("02_html")
    for project in projects:
        gallery_path = os.path.join("02_html", project, "galleries")
        if os.path.exists(gallery_path):
            index_files_in_dir(gallery_path)

'''
File read will be a dictionary -- keys -- filenames and values -- description
'''
def index_files_in_dir(rootDir):
    print("Doing directory listing")
    subfolders = os.listdir(rootDir)
    for subfolder in subfolders:
        pictures = os.listdir(os.path.join(rootDir, subfolder))
        #read json file
        json_file_path = os.path.join(rootDir, subfolder, "dir_list.json")
        if os.path.exists(json_file_path):
            with open(json_file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        else:   
            data = {} # dummy empty data if file doesnt exist
        result_data = {}
        # loop through files in directory, if they exist in old dir insert into new if not create them
        for picture in pictures:
            if picture == "dir_list.json":
                continue
            if picture in data:
                result_data[picture] = data[picture]
            else:
                result_data[picture] = ""
        with open(json_file_path, "w", encoding="utf-8") as f:
            json.dump(result_data, f, indent=4, ensure_ascii=False)


if __name__ == "__main__":
    do_whole_project()      