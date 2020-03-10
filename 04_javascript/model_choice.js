function choose_model(event, model_scale, model_rotation) {
    var model_src = document.forms["selection_form"]["model"].value;
    if (model_src == "") return false;
    //var model = '<a-entity gltf-model="'+ model_src +'" id="gltf_model" big_model autoscale=" scale:'+ model_scale + '; rotation: '+ model_rotation +'"></a-entity>';
    var model = document.createElement("a-entity"); // TODO
    model.setAttribute("gltf-model", model_src);
    model.setAttribute("id", "gltf_model");
    model.setAttribute("big_model", "");
    model.setAttribute("autoscale", 'scale:'+ model_scale + '; rotation: '+ model_rotation);
    document.querySelector("a-scene").appendChild(model);
    // hide away
    var form = document.getElementById("model_choices");
    form.parentElement.removeChild(form);
    return false;
}