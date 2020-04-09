this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["annotation_window"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"popup\" id=\"annotation_window\" > \r\n    <div id=\"current_edited\"></div>\r\n    <form name=\"change_annotation\" action=\"javascript:void(0);\">\r\n        <div>\r\n        <label for=\"position_inp\">Pozice: </label>\r\n        <input type=\"text\" name=\"position\" id=\"position_inp\">\r\n        </div>\r\n        <div>\r\n        <label for=\"no_inp\">Číslo anotace: </label>\r\n        <input type=\"number\" name=\"no\" id=\"no_inp\">\r\n        </div>\r\n        <div>\r\n        <label for=\"heading_inp\">Nadpis: </label>\r\n        <input type=\"text\" name=\"heading\" id=\"heading_inp\">\r\n        </div>\r\n        <div id=\"editor\"></div>\r\n        <div>\r\n        <button id=\"copy_html\" class=\"button\">Kopírovat HTML</button>\r\n        <button id=\"paste_html\" class=\"button\">Vložit HTML</button>\r\n        </div>\r\n        <div>\r\n            <button id=\"save_change\" class=\"button\">Provést změny</button>\r\n            <button id=\"discard_change\" class=\"button\">Zahodit změny</button>\r\n        </div>\r\n    </form>\r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["gallery"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"gallery_wrapper\" id=\"gal_wrapper"
    + alias4(((helper = (helper = lookupProperty(helpers,"parent_id") || (depth0 != null ? lookupProperty(depth0,"parent_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent_id","hash":{},"data":data,"loc":{"start":{"line":1,"column":44},"end":{"line":1,"column":57}}}) : helper)))
    + "\">\r\n    <img class=\"gal_left_click\" id=\"glc"
    + alias4(((helper = (helper = lookupProperty(helpers,"parent_id") || (depth0 != null ? lookupProperty(depth0,"parent_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent_id","hash":{},"data":data,"loc":{"start":{"line":3,"column":39},"end":{"line":3,"column":52}}}) : helper)))
    + "\" src=\"../control_graphic/back_icon.png\" onclick=\"GalleryControl.left_click()\">\r\n    <img class=\"gal_right_click\" id=\"grc"
    + alias4(((helper = (helper = lookupProperty(helpers,"parent_id") || (depth0 != null ? lookupProperty(depth0,"parent_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent_id","hash":{},"data":data,"loc":{"start":{"line":4,"column":40},"end":{"line":4,"column":53}}}) : helper)))
    + "\" src=\"../control_graphic/right.png\" onclick=\"GalleryControl.right_click()\">\r\n    <div class=\"gall_num\" id=\"g_num"
    + alias4(((helper = (helper = lookupProperty(helpers,"parent_id") || (depth0 != null ? lookupProperty(depth0,"parent_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent_id","hash":{},"data":data,"loc":{"start":{"line":5,"column":35},"end":{"line":5,"column":48}}}) : helper)))
    + "\" >\r\n        <span class=\"current_img\"></span>\r\n        <span class=\"total\"></span>\r\n    </div>\r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["model_choice"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"model_choice\">\r\n        <input type=\"radio\" id=\"model_choice"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":6,"column":44},"end":{"line":6,"column":54}}}) : helper)))
    + "\" name=\"model\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"model_sr") || (depth0 != null ? lookupProperty(depth0,"model_sr") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model_sr","hash":{},"data":data,"loc":{"start":{"line":6,"column":76},"end":{"line":6,"column":88}}}) : helper)))
    + "\">\r\n        <label for=\"model_choice"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":7,"column":32},"end":{"line":7,"column":42}}}) : helper)))
    + "\">"
    + alias4((lookupProperty(helpers,"increment")||(depth0 && lookupProperty(depth0,"increment"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"increment","hash":{},"data":data,"loc":{"start":{"line":7,"column":44},"end":{"line":7,"column":64}}}))
    + ". model</label>\r\n"
    + ((stack1 = (lookupProperty(helpers,"if_equals")||(depth0 && lookupProperty(depth0,"if_equals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"file_size") : depth0),"",{"name":"if_equals","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":13,"column":22}}})) != null ? stack1 : "")
    + "        <p>\r\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"short_comment") || (depth0 != null ? lookupProperty(depth0,"short_comment") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"short_comment","hash":{},"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":15,"column":29}}}) : helper)))
    + "\r\n        </p>\r\n    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <p>\r\n            <b>Velikost:</b> "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"file_size") || (depth0 != null ? lookupProperty(depth0,"file_size") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"file_size","hash":{},"data":data,"loc":{"start":{"line":11,"column":29},"end":{"line":11,"column":42}}}) : helper)))
    + "\r\n        </p>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"model_choices\">\r\n    <h3>Zvolte kvalitu modelu</h3>\r\n<form name=\"selection_form\" action=\"javascript:void(0);\" onsubmit=\"choose_model(event, "
    + alias4(((helper = (helper = lookupProperty(helpers,"model_scale") || (depth0 != null ? lookupProperty(depth0,"model_scale") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model_scale","hash":{},"data":data,"loc":{"start":{"line":3,"column":87},"end":{"line":3,"column":102}}}) : helper)))
    + ", '"
    + alias4(((helper = (helper = lookupProperty(helpers,"model_rotation") || (depth0 != null ? lookupProperty(depth0,"model_rotation") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model_rotation","hash":{},"data":data,"loc":{"start":{"line":3,"column":105},"end":{"line":3,"column":123}}}) : helper)))
    + "')\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"qualities") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":18,"column":13}}})) != null ? stack1 : "")
    + "\r\n    <input type=\"submit\" value=\"OK\">\r\n</form>\r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["player"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        \r\n        <a-entity id=\"camera\" camera=\" active: true\" look-controls orbit-controls=\" target: 0 0 0; minDistance: 1; maxDistance: 50; initialPosition: "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"camera_position") || (depth0 != null ? lookupProperty(depth0,"camera_position") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"camera_position","hash":{},"data":data,"loc":{"start":{"line":4,"column":149},"end":{"line":4,"column":168}}}) : helper)))
    + "; maxPolarAngle: 180\"></a-entity>\r\n          \r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a-entity id=\"camera_rig\">\r\n            <a-entity id=\"camera\" camera position=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"camera_position") || (depth0 != null ? lookupProperty(depth0,"camera_position") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"camera_position","hash":{},"data":data,"loc":{"start":{"line":8,"column":51},"end":{"line":8,"column":70}}}) : helper)))
    + "\" default-position=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"camera_position") || (depth0 != null ? lookupProperty(depth0,"camera_position") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"camera_position","hash":{},"data":data,"loc":{"start":{"line":8,"column":90},"end":{"line":8,"column":109}}}) : helper)))
    + "\" touch-controls=\"gyroEnabled:false\" wasd-controls=\" fly:true; acceleration:40\"></a-entity>\r\n        </a-entity>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a-asset-item id=\"main_model\" src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"model_src") || (depth0 != null ? lookupProperty(depth0,"model_src") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"model_src","hash":{},"data":data,"loc":{"start":{"line":17,"column":43},"end":{"line":17,"column":56}}}) : helper)))
    + "\"></a-asset-item>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <a-entity my-gltf-model=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"model_src") || (depth0 != null ? lookupProperty(depth0,"model_src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model_src","hash":{},"data":data,"loc":{"start":{"line":22,"column":29},"end":{"line":22,"column":42}}}) : helper)))
    + "\" id=\"gltf_model\" big_model autoscale=\" scale:"
    + alias4(((helper = (helper = lookupProperty(helpers,"model_scale") || (depth0 != null ? lookupProperty(depth0,"model_scale") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model_scale","hash":{},"data":data,"loc":{"start":{"line":22,"column":88},"end":{"line":22,"column":103}}}) : helper)))
    + "; rotation: "
    + alias4(((helper = (helper = lookupProperty(helpers,"model_rotation") || (depth0 != null ? lookupProperty(depth0,"model_rotation") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"model_rotation","hash":{},"data":data,"loc":{"start":{"line":22,"column":115},"end":{"line":22,"column":133}}}) : helper)))
    + "\"></a-entity>\r\n    ";
},"11":function(container,depth0,helpers,partials,data) {
    return "<p>Vítejte ve webovém prohlížeči 3D objektů. Snad Vám tato nápověda usnadní jeho používání.</p>\r\n<p><b>Ovládání: </b>v této variantě pouze otáčení pohledu myší.</p>\r\n<p>\r\n    V bočním panelu, kde se nachází tato nápověda, najdete také tlačítko anotace, kterým můžete vypnout zobrazování anotací,\r\n    pokud si chcete nerušeně prohlížet model.\r\n</p>\r\n</div>\r\n</div>\r\n\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "<p>Vítejte ve webovém prohlížeči 3D objektů. Snad Vám tato nápověda usnadní jeho používání.</p>\r\n<p><b>Ovládání: </b>pomocí šipek nebo WASD a myší otáčení pohledu. Na dotykovém zařízení joystickem.</p>\r\n<p>\r\n    Pokud byste zabloudili, tlačítkem <b>domečku</b> se můžete navrátit zpět na <b>počáteční pozici.</b></p>\r\n<p>\r\n    V bočním panelu, kde se nachází tato nápověda, najdete další užitečné funkce. <br>Můžete <b>vypnout zobrazování \r\n    anotací,</b> pokud si chcete nerušeně prohlédnout model. Také se zde nachází možnost nastavení rychlosti pohybu.\r\n</p>\r\n<p>\r\n    Dvojicí tlačítek <b>Kopírovat pozici</b> a <b>Přejít na pozici</b> si můžete uschovat svoji aktuální polohu a následně se na \r\n    ni kdykoliv vrátit. <br>Tlačítko <b>Kopírovat pozici</b> ji zkopíruje do schránky.\r\n</p>\r\n</div>\r\n</div>\r\n\r\n<img id=\"home_button\" title=\"Return back to origin.\" src=\"../../control_graphic/home.png\"></img>\r\n\r\n\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a-scene  background=\" color: "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"background_color") || (depth0 != null ? lookupProperty(depth0,"background_color") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"background_color","hash":{},"data":data,"loc":{"start":{"line":1,"column":91},"end":{"line":1,"column":111}}}) : helper)))
    + "\" joystick>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"orbit_control") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":10,"column":11}}})) != null ? stack1 : "")
    + "\r\n    <a-entity raycaster=\"objects: [data-clickable]\" id=\"raycaster\" cursor=\"rayOrigin:mouse\"></a-entity>\r\n    <!--<a-assets timeout=\"100000000\">\r\n"
    + ((stack1 = (lookupProperty(helpers,"if_equals")||(depth0 && lookupProperty(depth0,"if_equals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"model_src") : depth0),"",{"name":"if_equals","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":15,"column":8},"end":{"line":18,"column":22}}})) != null ? stack1 : "")
    + "    </a-assets>\r\n"
    + ((stack1 = (lookupProperty(helpers,"if_equals")||(depth0 && lookupProperty(depth0,"if_equals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"model_src") : depth0),"",{"name":"if_equals","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":20,"column":4},"end":{"line":23,"column":18}}})) != null ? stack1 : "")
    + "-->\r\n    <a-entity light=\"type: point; intensity: 1; distance: 100; decay: 2\" position=\"0 0 0\"></a-entity>\r\n    <a-entity light=\"type: ambient; color: #CCC\"></a-entity>\r\n</a-scene>\r\n\r\n<div class=\"popup\" id=\"help_popup\">\r\n<div class=\"popup_heading\"> <span class=\"back_icon\"><img src=\"../control_graphic/back_icon.png\"></span>Nápověda</div>\r\n<div class=\"popup_body\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"orbit_control") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data,"loc":{"start":{"line":31,"column":0},"end":{"line":60,"column":7}}})) != null ? stack1 : "");
},"useData":true});
this["Handlebars"]["templates"]["popup"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":2,"column":23},"end":{"line":2,"column":31}}}) : helper)))
    + "\">\r\n    <div class=\"popup_heading\"> <span class=\"back_icon\" onclick=\"close_windows()\"><img src=\"../../control_graphic/back_icon.png\"></span><span class=\"heading_span\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"heading") || (depth0 != null ? lookupProperty(depth0,"heading") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"heading","hash":{},"data":data,"loc":{"start":{"line":3,"column":164},"end":{"line":3,"column":175}}}) : helper)))
    + "</span></div>\r\n    <div class=\"popup_body\"> <span class=\"popup_text\"> "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":4,"column":55},"end":{"line":4,"column":65}}}) : helper))) != null ? stack1 : "")
    + "</span> </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"edit_mode") : depths[1]),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":8,"column":11}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <button class=\"button ed_button\" id=\"edit"
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":6,"column":49},"end":{"line":6,"column":57}}}) : helper)))
    + "\">Upravit</button>\r\n        <button class=\"button ed_button delete\" id=\"delete"
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":7,"column":58},"end":{"line":7,"column":66}}}) : helper)))
    + "\">Smazat</button>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"annotations") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":10,"column":9}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
this["Handlebars"]["templates"]["popup_button"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a-text \r\n    value=\""
    + alias3((lookupProperty(helpers,"get_number")||(depth0 && lookupProperty(depth0,"get_number"))||alias2).call(alias1,(data && lookupProperty(data,"key")),{"name":"get_number","hash":{},"data":data,"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":30}}}))
    + "\" width=\"6\" align=\"center\"\r\n    look-at=\"[camera]\" color=\"white\" id=\"rendered"
    + alias3(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":4,"column":49},"end":{"line":4,"column":57}}}) : helper)))
    + "\"\r\n    class=\"clickable rendered_annotation\" info-window=\" window_id:"
    + alias3(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":5,"column":66},"end":{"line":5,"column":74}}}) : helper)))
    + "\" position=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"position") || (depth0 != null ? lookupProperty(depth0,"position") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"position","hash":{},"data":data,"loc":{"start":{"line":5,"column":86},"end":{"line":5,"column":98}}}) : helper)))
    + "\" data-clickable\r\n></a-text>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"annotations") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":7,"column":9}}})) != null ? stack1 : "");
},"useData":true});