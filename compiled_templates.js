(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['gallery'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"gallery_wrapper\" id=\"gal_wrapper"
    + alias4(((helper = (helper = lookupProperty(helpers,"parent_id") || (depth0 != null ? lookupProperty(depth0,"parent_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent_id","hash":{},"data":data,"loc":{"start":{"line":1,"column":44},"end":{"line":1,"column":57}}}) : helper)))
    + "\">\n    <img class=\"gal_left_click\" id=\"glc"
    + alias4(((helper = (helper = lookupProperty(helpers,"parent_id") || (depth0 != null ? lookupProperty(depth0,"parent_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent_id","hash":{},"data":data,"loc":{"start":{"line":3,"column":39},"end":{"line":3,"column":52}}}) : helper)))
    + "\" src=\"../control_graphic/back_icon.png\">\n    <img class=\"gal_right_click\" id=\"grc"
    + alias4(((helper = (helper = lookupProperty(helpers,"parent_id") || (depth0 != null ? lookupProperty(depth0,"parent_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent_id","hash":{},"data":data,"loc":{"start":{"line":4,"column":40},"end":{"line":4,"column":53}}}) : helper)))
    + "\" src=\"../control_graphic/right.png\">\n    <div class=\"gall_num\" id=\"g_num"
    + alias4(((helper = (helper = lookupProperty(helpers,"parent_id") || (depth0 != null ? lookupProperty(depth0,"parent_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent_id","hash":{},"data":data,"loc":{"start":{"line":5,"column":35},"end":{"line":5,"column":48}}}) : helper)))
    + "\" >\n        <span class=\"current_img\"></span>\n        <span class=\"total\"></span>\n    </div>\n</div>";
},"useData":true});
templates['player'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        \n        <a-entity id=\"camera\" camera=\" active: true\" look-controls orbit-controls=\" target: 0 0 0; minDistance: 1; maxDistance: 50; initialPosition: "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"camera_position") || (depth0 != null ? lookupProperty(depth0,"camera_position") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"camera_position","hash":{},"data":data,"loc":{"start":{"line":4,"column":149},"end":{"line":4,"column":168}}}) : helper)))
    + "; maxPolarAngle: 180\"></a-entity>\n          \n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a-entity id=\"camera_rig\">\n            <a-entity id=\"camera\" camera position=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"camera_position") || (depth0 != null ? lookupProperty(depth0,"camera_position") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"camera_position","hash":{},"data":data,"loc":{"start":{"line":8,"column":51},"end":{"line":8,"column":70}}}) : helper)))
    + "\" default-position=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"camera_position") || (depth0 != null ? lookupProperty(depth0,"camera_position") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"camera_position","hash":{},"data":data,"loc":{"start":{"line":8,"column":90},"end":{"line":8,"column":109}}}) : helper)))
    + "\" touch-controls=\"gyroEnabled:false\" wasd-controls=\" fly:true; acceleration:40\"></a-entity>\n        </a-entity>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "";
},"7":function(container,depth0,helpers,partials,data) {
    return "<img id=\"home_button\" title=\"Return back to origin.\" src=\"../../control_graphic/home.png\"></img>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a-scene cursor=\"rayOrigin:mouse\" raycaster=\"objects: .clickable\" gltf-model=\"dracoDecoderPath: ../draco/;\" background=\" color: "
    + alias4(((helper = (helper = lookupProperty(helpers,"background_color") || (depth0 != null ? lookupProperty(depth0,"background_color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"background_color","hash":{},"data":data,"loc":{"start":{"line":1,"column":128},"end":{"line":1,"column":148}}}) : helper)))
    + "\" joystick>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"orbit_control") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":10,"column":11}}})) != null ? stack1 : "")
    + "\n    <a-assets>\n        <a-asset-item id=\"main_model\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"model_src") || (depth0 != null ? lookupProperty(depth0,"model_src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model_src","hash":{},"data":data,"loc":{"start":{"line":13,"column":43},"end":{"line":13,"column":56}}}) : helper)))
    + "\"></a-asset-item>\n    </a-assets>\n    <a-entity gltf-model=\"#main_model\" id=\"gltf_model\" big_model autoscale=\" scale:"
    + alias4(((helper = (helper = lookupProperty(helpers,"model_scale") || (depth0 != null ? lookupProperty(depth0,"model_scale") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model_scale","hash":{},"data":data,"loc":{"start":{"line":15,"column":83},"end":{"line":15,"column":98}}}) : helper)))
    + "; rotation: "
    + alias4(((helper = (helper = lookupProperty(helpers,"model_rotation") || (depth0 != null ? lookupProperty(depth0,"model_rotation") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model_rotation","hash":{},"data":data,"loc":{"start":{"line":15,"column":110},"end":{"line":15,"column":128}}}) : helper)))
    + "\"></a-entity>\n    <a-entity light=\"type: point; intensity: 1; distance: 100; decay: 2\" position=\"0 0 0\"></a-entity>\n    <a-entity light=\"type: ambient; color: #CCC\"></a-entity>\n</a-scene>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"orbit_control") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":20,"column":0},"end":{"line":23,"column":7}}})) != null ? stack1 : "");
},"useData":true});
templates['popup'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":23},"end":{"line":2,"column":29}}}) : helper)))
    + "\">\n    <div class=\"popup_heading\"> <span class=\"back_icon\"><img src=\"../../control_graphic/back_icon.png\"></span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"heading") || (depth0 != null ? lookupProperty(depth0,"heading") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"heading","hash":{},"data":data,"loc":{"start":{"line":3,"column":110},"end":{"line":3,"column":121}}}) : helper)))
    + "</div>\n    <div class=\"popup_body\"> "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":4,"column":29},"end":{"line":4,"column":39}}}) : helper))) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"annotations") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":9}}})) != null ? stack1 : "");
},"useData":true});
templates['popup_button'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a-text \n    value=\""
    + alias3((lookupProperty(helpers,"get_number")||(depth0 && lookupProperty(depth0,"get_number"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"id") : depth0),{"name":"get_number","hash":{},"data":data,"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":28}}}))
    + "\" width=\"6\" align=\"center\"\n    look-at=\"[camera]\" color=\"white\" id=\"rendered"
    + alias3(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":4,"column":49},"end":{"line":4,"column":55}}}) : helper)))
    + "\"\n    class=\"clickable\" info-window=\" window_id:"
    + alias3(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":5,"column":46},"end":{"line":5,"column":52}}}) : helper)))
    + "\" position=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"position") || (depth0 != null ? lookupProperty(depth0,"position") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"position","hash":{},"data":data,"loc":{"start":{"line":5,"column":64},"end":{"line":5,"column":76}}}) : helper)))
    + "\"\n></a-text>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"annotations") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":7,"column":9}}})) != null ? stack1 : "");
},"useData":true});
})();