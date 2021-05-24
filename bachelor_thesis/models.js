
var visible_models = ["v1_01_tracker"];
var colored_dists = false;

document.getElementById("colored").addEventListener("change", (evt) => {
    if (evt.target.checked) {
        // make all colored visible
        colored_dists = true;
        for (visible_model of visible_models) {
            document.getElementById(visible_model + "_normal").setAttribute("visible", "false");
            document.getElementById(visible_model + "_colored").setAttribute("visible", "true");
        }
    } else {
        colored_dists = false;
        
        for (visible_model of visible_models) {
            document.getElementById(visible_model + "_normal").setAttribute("visible", "true");
            document.getElementById(visible_model + "_colored").setAttribute("visible", "false");
        }
    }
});

for (elem of document.getElementsByClassName("model_selector")) {
    elem.addEventListener("change", (evt) => {
        if (evt.target.checked) {
            visible_models.push(evt.target.id);
            if (colored_dists) {
                document.getElementById(evt.target.id + "_colored").setAttribute("visible", "true");
            } else {
                document.getElementById(evt.target.id + "_normal").setAttribute("visible", "true");
            }
        } else {
            visible_models.splice(visible_models.indexOf(evt.target.id), 1);
            if (colored_dists) {
                document.getElementById(evt.target.id + "_colored").setAttribute("visible", "false");
            } else {
                document.getElementById(evt.target.id + "_normal").setAttribute("visible", "false");
            }
        }
    });
}