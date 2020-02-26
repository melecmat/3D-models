function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002F01_pug\u002Fto_be_compiled\u002Fstara_voda\u002Fceiling.pug":"extends ..\u002F..\u002Fincludes\u002Fmain-template.pug\n\nblock title\n    +head(\"Strop\")\n\nblock 3d-player\n    +3d-player(\"models\u002Fceiling.glb\")","01_pug\u002Fincludes\u002Fmain-template.pug":"doctype html\nhtml(lang='cs')\n    include head.pug\n    block title\n        +head(\"Default title\")\n        \u002F\u002F- Setup title here by doing +head(\"Title\")\n    body\n        \n        include 3d-player.pug\n        include simple-annotation.pug\n        include gallery-popup.pug\n\n        \u002F\u002F- ----- ALL SOURCES RELATIVE TO COMPILATION FOLDER: 02_html -----\n            extend and fill blocks\n        \u002F\u002F- \n            here you can add annotations\n            +annotation(\n                heading, -- of text\n                text, -- main text -- text can be formatted by standart html\n                picture_src, -- source of a picture -- optional -- leave out by inputting =\"\"\n                position, -- location in the a-scene \n                id -- of the annotation -- connects annotation to its button\n            )\n\n            for galleries of pictures:\n            +gallery-popup(heading,\n                json_gallery_src, -- source of the gallery json -- pictures should be located in the same folder.\n                    Descriptions to photos should be located in the json.\n                position, -- location in the a-scene\n                id -- of gallery -- please put in numbers from 1 to n where n is the number of galleries.\n                                    These will be used to generate number visible in 3D -- if there is no number\n                                    specified, there will be only icon of picture. \n            )\n        block annotations\n\n        \u002F\u002F-\n            add your 3d player here\n            +3d-player(\n                src, -- model source\n                orbit_controls=false, -- orbit controls = camera orbits around object\n                camera_position=\"0 0 0\" -- camera position\n                                        -- default values 0 0 0 for first person movement and 0 -2 20 for orbit-controls\n                )\n        block 3d-player","01_pug\u002Fincludes\u002Fhead.pug":"mixin head(title)\r\n\r\n    head\r\n        title #{title}\r\n        meta(charset=\"UTF-8\")\r\n\r\n        script(src=\"..\u002F..\u002Fjavascript_aframe\u002Faframe.min.js\")\r\n\r\n        \u002F\u002F- Script used to register events  https:\u002F\u002Fwww.npmjs.com\u002Fpackage\u002Faframe-event-set-component\r\n        script(src=\"..\u002F..\u002Fjavascript_aframe\u002Faframe-event-set-component.min.js\")\r\n\r\n        \u002F\u002F- Component for objects to look at camera\r\n        script(src=\"..\u002F..\u002Fjavascript_aframe\u002Faframe-look-at-component.min.js\")\r\n\r\n        \u002F\u002F- Script enabling pointclouds PROBABLY WONT BE NEEDED\r\n        \u002F\u002Fscript(src=\"https:\u002F\u002Funpkg.com\u002Faframe-pointcloud-component\u002Fdist\u002Faframe-pointcloud-component.min.js\")\r\n\r\n        \u002F\u002F- Joystick script\r\n        script(src=\"..\u002F..\u002F04_javascript\u002Fjoystick.js\")\r\n\r\n        \u002F\u002F- TODO Script for disabling gyroscope on mobile\r\n        script(src=\"..\u002F..\u002F04_javascript\u002Fa-touch-controls.js\" )\r\n\r\n        \u002F\u002F- For restricting cameras movement\r\n        \u002F\u002Fscript(src=\"..\u002F..\u002Fjavascript_aframe\u002Faframe-fence-component.min.js\")\r\n        \r\n        \u002F\u002F- Orbit controls\r\n        script(src=\"..\u002F..\u002Fjavascript_aframe\u002Faframe-orbit-controls.min.js\")\r\n\r\n        \u002F\u002F- My scripts\r\n        script(src=\"..\u002F..\u002F04_javascript\u002Fcontrol.js\")\r\n        script(src=\"..\u002F..\u002F04_javascript\u002Fgallery_control.js\")\r\n        script(src=\"..\u002F..\u002F04_javascript\u002Fcontrol-panel.js\")\r\n        script(src=\"..\u002F..\u002F04_javascript\u002Fpopup_control.js\")\r\n       \r\n        link(rel='stylesheet' type='text\u002Fcss' href=\"..\u002F..\u002Fcss\u002Fmain.css\")\r\n        link(rel='stylesheet' type='text\u002Fcss' href=\"..\u002F..\u002Fcss\u002Floading.css\")\r\n        link(rel='stylesheet' type='text\u002Fcss' href=\"..\u002F..\u002Fcss\u002Fgallery.css\")  \r\n        link(rel='stylesheet' type='text\u002Fcss' href=\"..\u002F..\u002Fcss\u002Fcontrol-panel.css\")     ","01_pug\u002Fincludes\u002F3d-player.pug":"mixin 3d-player(src, heading=\"3D model\", orbit_controls=false, camera_position=\"0 0 0\")\r\n    \u002F\u002F- loading screen\r\n    div(id=\"loading_screen\")\r\n        div(id=\"heading\") #{heading}\r\n        div(id=\"container\")\r\n            div(class=\"lds-ellipsis\")\r\n                div\r\n                div\r\n                div\r\n                div\r\n    style(type=\"text\u002Fcss\").\r\n        #loading_screen {\r\n            background-image:  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('background.jpg');\r\n            background-position:center;\r\n            background-size: cover;\r\n        }\r\n        \r\n    \r\n    if !orbit_controls        \r\n        img(id=\"home_button\" title=\"Return back to origin.\" src=\"..\u002F..\u002Fcontrol_graphic\u002Fhome.png\")\r\n    include back_icon.pug\r\n    +back-icon(camera_position)\r\n\r\n    img(src=\"..\u002F..\u002Fcontrol_graphic\u002Fright.png\" id=\"control_trigger\")\r\n    \r\n    \u002F\u002F- control-panel\r\n    include control-panel.pug\r\n\r\n    a-scene(cursor=\"rayOrigin:mouse\" raycaster=\"objects: .clickable\" gltf-model=\"dracoDecoderPath: ..\u002F..\u002Fdraco\u002F;\" background=\"color: black\" joystick)\r\n        a-assets\r\n            a-asset-item(id=\"main_model\" src=src)\r\n        \r\n        a-entity(gltf-model=\"#main_model\" id=\"gltf_model\" big_model autoscale=\"scale:30; rotation: -90, 0, 0\")\r\n        if orbit_controls\r\n            if camera_position === \"0 0 0\"\r\n                -camera_position = \"0 -2 20\" \u002F\u002F- different default for orbit controls\r\n            a-entity(id=\"camera\" look-controls orbit-controls=\"\\\r\n                target: 0 0 0; minDistance: 1; \\\r\n                maxDistance: 50; initialPosition: \"+ camera_position + \"\\\r\n                ; maxPolarAngle: 180\"\r\n            )\r\n            script.\r\n                document.addEventListener(\"joystick-created\", function(event) { \r\n                    document.getElementById(\"joystick\").style.display = \"none\" \u002F\u002F remove joystick\r\n                });\r\n        else\r\n            a-entity(id=\"camera_rig\")\r\n                a-entity(id=\"camera\" camera position=camera_position touch-controls=\"gyroEnabled:false\" wasd-controls=\" fly:true; acceleration:40\")\r\n            \u002F\u002F- custom lighting for viewing inside of models\r\n            a-entity(light=\"type: point; intensity: 1; distance: 100; decay: 2\" position=\"0 0 0\")\r\n            a-entity(light=\"type: ambient; color: #CCC\")","01_pug\u002Fincludes\u002Fback_icon.pug":"mixin back-icon(default_pos)\n    script.\n        document.addEventListener(\"DOMContentLoaded\", function() {\n            var camera = document.getElementById(\"camera\");\n            var homeButton = document.getElementById(\"home_button\");\n            homeButton.addEventListener(\"click\", function() {\n                camera.setAttribute(\"position\", \"#{default_pos}\");\n            });\n        });","01_pug\u002Fincludes\u002Fcontrol-panel.pug":"div(id=\"control_panel\")\r\n        h3 Nastavení\r\n        div(class=\"item\")\r\n            |Anotace\r\n            label(class=\"switch\" id=\"change_visibility\")\r\n                input(type=\"checkbox\" checked)\r\n                span(class=\"slider round\")\r\n        div(class=\"item\" id=\"gyroscope\")\r\n            |Gyroskop\r\n            label(class=\"switch\" id=\"switch_gyro\")\r\n                input(type=\"checkbox\")\r\n                span(class=\"slider round\")\r\n        div(class=\"item\" id=\"speed\")\r\n            |Rychlost\r\n            input(type=\"range\" class=\"speed_slider\" value=\"40\" min=\"5\" max=\"130\" step=\"1\" oninput=\"change_acceleration(this)\")\r\n            div(id=\"speed_val\") 40\r\n        button(class=\"item\" class=\"button\" id=\"copy_pos\" title=\"Zkopíruje pozici do schránky\")\r\n            |Kopírovat pozici\r\n        div(class=\"item\" id=\"goto\")\r\n            |Přejít na pozici\r\n            input(type=\"text\" id=\"user_pos\")\r\n            button(id=\"goto_pos\" class=\"button\") OK\r\n\r\n        button(class=\"item\" id=\"help\" class=\"button\") Nápověda\r\n\r\ndiv(class=\"popup\" id=\"help_popup\")\r\n    div(class=\"popup_heading\") \r\n        span(class=\"back_icon\")\r\n            img(src=\"..\u002F..\u002Fcontrol_graphic\u002Fback_icon.png\")\r\n        |Nápověda\r\n    div(class=\"popup_body\")\r\n        p Vítejte ve webovém prohlížeči 3D objektů. Snad Vám tato nápověda usnadní jeho používání.\r\n        p\r\n            b Ovládání: \r\n            |pomocí šipek nebo WASD a myší otáčení pohledu. Na dotykovém zařízení joystickem.\r\n        p \r\n            |Pokud byste zabloudili, tlačítkem \u003Cb\u003Edomečku\u003C\u002Fb\u003E se můžete navrátit zpět na \u003Cb\u003Epočáteční pozici.\u003C\u002Fb\u003E\r\n        p\r\n            |V bočním panelu, kde se nachází tato nápověda, najdete další užitečné funkce. \u003Cbr\u003EMůžete \u003Cb\u003Evypnout zobrazování \r\n            |anotací,\u003C\u002Fb\u003E pokud si chcete nerušeně prohlédnout model. Také se zde nachází možnost nastavení rychlosti pohybu.\r\n        p\r\n            |Dvojicí tlačítek \u003Cb\u003EKopírovat pozici\u003C\u002Fb\u003E a \u003Cb\u003EPřejít na pozici\u003C\u002Fb\u003E si můžete uschovat svoji aktuální polohu a následně se na \r\n            |ni kdykoliv vrátit. \u003Cbr\u003ETlačítko \u003Cb\u003EKopírovat pozici\u003C\u002Fb\u003E ji zkopíruje do schránky.\r\n","01_pug\u002Fincludes\u002Fsimple-annotation.pug":"mixin annotation(heading, text, picture_src, position, id)\n    div(id=id class=\"popup\")\n        \n        div(class=\"popup_heading\") \n            span(class=\"back_icon\")\n                img(src=\"..\u002F..\u002Fcontrol_graphic\u002Fback_icon.png\")\n            |#{heading}\n            \n            \n        div(class=\"popup_body\")\n            p !{text}\n            if picture_src != ''\n                img(src=picture_src)\n\n    \u002F\u002F- Script to add element into aframe\n    script.\n        document.addEventListener(\"DOMContentLoaded\", function() {\n        var ascene = document.querySelector(\"a-scene\");\n            create_popup(\"#{id}\", \"#{position}\", false);\n        });\n ","01_pug\u002Fincludes\u002Fgallery-popup.pug":"mixin gallery-popup(heading, json_gallery_src, position, id)\n    -var picture_src = picture_src\n    div(id=id class=\"popup\")\n        \n        div(class=\"popup_heading\") \n            span(class=\"back_icon\")\n                img(src=\"..\u002F..\u002Fcontrol_graphic\u002Fback_icon.png\")\n\n            img(src=\"..\u002F..\u002Fcontrol_graphic\u002Fmaximize.png\" class=\"enlarge_icon\")\n            |#{heading}\n            \n            \n        div(class=\"popup_body\")\n            \u002F\u002F- ability to put text here as well TODO\n            include gallery.pug\n\n    \u002F\u002F- Script to add element into aframe\n    script.\n        document.addEventListener(\"DOMContentLoaded\", function() {\n            create_popup(\"#{id}\", \"#{position}\", true);\n        });\n ","01_pug\u002Fincludes\u002Fgallery.pug":"\u002F\u002F-\n    This is template for gallery (photo viewer)\n\n\u002F\u002F- get gallery\ndiv(class=\"gallery_wrapper\" id=\"gal_wrapper\" + id)\n    img(class=\"gal_left_click\" id=\"glc\" + id src=\"..\u002F..\u002Fcontrol_graphic\u002Fback_icon.png\")\n    img(class=\"gal_right_click\" id=\"grc\" + id src=\"..\u002F..\u002Fcontrol_graphic\u002Fright.png\")\n    div(class=\"gall_num\" id=\"g_num\" + id)\n        \u002F\u002F- providing functionality of counter\n        span(class=\"current_img\")\n        span(class=\"total\")\n\nscript.\n    \u002F\u002F ajax\n    document.addEventListener(\"DOMContentLoaded\", function() {\n        create_gallery(\"#{id}\", \"#{json_gallery_src}\");\n    });\n"};
var pug_indent = [];
;pug_debug_line = 1;pug_debug_filename = "01_pug\u002Fincludes\u002Fmain-template.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "01_pug\u002Fincludes\u002Fmain-template.pug";
pug_html = pug_html + "\n\u003Chtml lang=\"cs\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_mixins["head"] = pug_interp = function(title){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 3;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 4;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ctitle\u003E";
;pug_debug_line = 4;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E";
;pug_debug_line = 5;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cmeta charset=\"UTF-8\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript src=\"..\u002F..\u002Fjavascript_aframe\u002Faframe.min.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 10;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript src=\"..\u002F..\u002Fjavascript_aframe\u002Faframe-event-set-component.min.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 13;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript src=\"..\u002F..\u002Fjavascript_aframe\u002Faframe-look-at-component.min.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 16;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C!--script(src=\"https:\u002F\u002Funpkg.com\u002Faframe-pointcloud-component\u002Fdist\u002Faframe-pointcloud-component.min.js\")--\u003E";
;pug_debug_line = 19;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript src=\"..\u002F..\u002F04_javascript\u002Fjoystick.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 22;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript src=\"..\u002F..\u002F04_javascript\u002Fa-touch-controls.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 25;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C!--script(src=\"..\u002F..\u002Fjavascript_aframe\u002Faframe-fence-component.min.js\")--\u003E";
;pug_debug_line = 28;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript src=\"..\u002F..\u002Fjavascript_aframe\u002Faframe-orbit-controls.min.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 31;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript src=\"..\u002F..\u002F04_javascript\u002Fcontrol.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 32;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript src=\"..\u002F..\u002F04_javascript\u002Fgallery_control.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 33;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript src=\"..\u002F..\u002F04_javascript\u002Fcontrol-panel.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 34;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript src=\"..\u002F..\u002F04_javascript\u002Fpopup_control.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 36;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" type=\"text\u002Fcss\" href=\"..\u002F..\u002Fcss\u002Fmain.css\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" type=\"text\u002Fcss\" href=\"..\u002F..\u002Fcss\u002Floading.css\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" type=\"text\u002Fcss\" href=\"..\u002F..\u002Fcss\u002Fgallery.css\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "01_pug\u002Fincludes\u002Fhead.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" type=\"text\u002Fcss\" href=\"..\u002F..\u002Fcss\u002Fcontrol-panel.css\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fhead\u003E";
};
;pug_debug_line = 4;pug_debug_filename = "01_pug\u002Fincludes\u002Fmain-template.pug";
;pug_debug_line = 4;pug_debug_filename = ".\u002F01_pug\u002Fto_be_compiled\u002Fstara_voda\u002Fceiling.pug";
pug_indent.push('  ');
pug_mixins["head"]("Strop");
pug_indent.pop();
;pug_debug_line = 7;pug_debug_filename = "01_pug\u002Fincludes\u002Fmain-template.pug";
pug_html = pug_html + "\n  \u003Cbody\u003E";
;pug_debug_line = 1;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_mixins["3d-player"] = pug_interp = function(src, heading="3D model", orbit_controls=false, camera_position="0 0 0"){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 3;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv id=\"loading_screen\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv id=\"heading\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = heading) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv id=\"container\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"lds-ellipsis\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n          ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n          ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 9;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n          ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n          ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv\u003E\u003C\u002Fdiv\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 12;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "#loading_screen {";
;pug_debug_line = 13;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 13;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "    background-image:  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('background.jpg');";
;pug_debug_line = 14;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 14;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "    background-position:center;";
;pug_debug_line = 15;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 15;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "    background-size: cover;";
;pug_debug_line = 16;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 16;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "}";
;pug_debug_line = 17;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 17;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "";
;pug_debug_line = 18;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 18;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fstyle\u003E";
;pug_debug_line = 19;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
if (!orbit_controls) {
;pug_debug_line = 20;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\u003Cimg id=\"home_button\" title=\"Return back to origin.\" src=\"..\u002F..\u002Fcontrol_graphic\u002Fhome.png\"\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_mixins["back-icon"] = pug_interp = function(default_pos){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 3;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "document.addEventListener(\"DOMContentLoaded\", function() {";
;pug_debug_line = 4;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 4;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "    var camera = document.getElementById(\"camera\");";
;pug_debug_line = 5;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 5;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "    var homeButton = document.getElementById(\"home_button\");";
;pug_debug_line = 6;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 6;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "    homeButton.addEventListener(\"click\", function() {";
;pug_debug_line = 7;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 7;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "        camera.setAttribute(\"position\", \"";
;pug_debug_line = 7;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = default_pos) ? "" : pug_interp));
;pug_debug_line = 7;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "\");";
;pug_debug_line = 8;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 8;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "    });";
;pug_debug_line = 9;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 9;pug_debug_filename = "01_pug\u002Fincludes\u002Fback_icon.pug";
pug_html = pug_html + "});\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fscript\u003E";
};
;pug_debug_line = 22;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_indent.push('    ');
pug_mixins["back-icon"](camera_position);
pug_indent.pop();
;pug_debug_line = 24;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\u003Cimg src=\"..\u002F..\u002Fcontrol_graphic\u002Fright.png\" id=\"control_trigger\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv id=\"control_panel\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 2;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Nastavení\u003C\u002Fh3\u003E";
;pug_debug_line = 3;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"item\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Anotace";
;pug_debug_line = 5;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"switch\" id=\"change_visibility\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n          ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" type=\"checkbox\""+pug_attr("checked", true, true, true)) + "\u003E";
;pug_debug_line = 7;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\u003Cspan class=\"slider round\"\u003E\u003C\u002Fspan\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"item\" id=\"gyroscope\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Gyroskop";
;pug_debug_line = 10;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"switch\" id=\"switch_gyro\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n          ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput type=\"checkbox\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\u003Cspan class=\"slider round\"\u003E\u003C\u002Fspan\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 13;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"item\" id=\"speed\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Rychlost";
;pug_debug_line = 15;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput class=\"speed_slider\" type=\"range\" value=\"40\" min=\"5\" max=\"130\" step=\"1\" oninput=\"change_acceleration(this)\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv id=\"speed_val\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "40\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"item button\" id=\"copy_pos\" title=\"Zkopíruje pozici do schránky\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Kopírovat pozici\u003C\u002Fbutton\u003E";
;pug_debug_line = 19;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"item\" id=\"goto\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Přejít na pozici";
;pug_debug_line = 21;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput type=\"text\" id=\"user_pos\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"button\" id=\"goto_pos\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "OK\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 24;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"item button\" id=\"help\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Nápověda\u003C\u002Fbutton\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 26;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"popup\" id=\"help_popup\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"popup_heading\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + " ";
;pug_debug_line = 28;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\u003Cspan class=\"back_icon\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\u003Cimg src=\"..\u002F..\u002Fcontrol_graphic\u002Fback_icon.png\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 30;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Nápověda\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"popup_body\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 32;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Vítejte ve webovém prohlížeči 3D objektů. Snad Vám tato nápověda usnadní jeho používání.\u003C\u002Fp\u003E";
;pug_debug_line = 33;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 34;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 34;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Ovládání: \u003C\u002Fb\u003E";
;pug_debug_line = 35;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "pomocí šipek nebo WASD a myší otáčení pohledu. Na dotykovém zařízení joystickem.\u003C\u002Fp\u003E";
;pug_debug_line = 36;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp\u003E\n          ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 36;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + " ";
;pug_debug_line = 37;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Pokud byste zabloudili, tlačítkem \u003Cb\u003Edomečku\u003C\u002Fb\u003E se můžete navrátit zpět na \u003Cb\u003Epočáteční pozici.\u003C\u002Fb\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 38;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp\u003E\n          ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 39;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "V bočním panelu, kde se nachází tato nápověda, najdete další užitečné funkce. \u003Cbr\u003EMůžete \u003Cb\u003Evypnout zobrazování ";
;pug_debug_line = 40;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n          ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 40;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "anotací,\u003C\u002Fb\u003E pokud si chcete nerušeně prohlédnout model. Také se zde nachází možnost nastavení rychlosti pohybu.\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 41;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp\u003E\n          ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 42;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "Dvojicí tlačítek \u003Cb\u003EKopírovat pozici\u003C\u002Fb\u003E a \u003Cb\u003EPřejít na pozici\u003C\u002Fb\u003E si můžete uschovat svoji aktuální polohu a následně se na ";
;pug_debug_line = 43;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "\n          ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 43;pug_debug_filename = "01_pug\u002Fincludes\u002Fcontrol-panel.pug";
pug_html = pug_html + "ni kdykoliv vrátit. \u003Cbr\u003ETlačítko \u003Cb\u003EKopírovat pozici\u003C\u002Fb\u003E ji zkopíruje do schránky.\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fp\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ca-scene" + (" cursor=\"rayOrigin:mouse\" raycaster=\"objects: .clickable\" gltf-model=\"dracoDecoderPath: ..\u002F..\u002Fdraco\u002F;\" background=\"color: black\""+pug_attr("joystick", true, true, true)) + "\u003E";
;pug_debug_line = 30;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ca-assets\u003E";
;pug_debug_line = 31;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ca-asset-item" + (" id=\"main_model\""+pug_attr("src", src, true, true)) + "\u003E\u003C\u002Fa-asset-item\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fa-assets\u003E";
;pug_debug_line = 33;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ca-entity" + (" gltf-model=\"#main_model\" id=\"gltf_model\""+pug_attr("big_model", true, true, true)+" autoscale=\"scale:30; rotation: -90, 0, 0\"") + "\u003E\u003C\u002Fa-entity\u003E";
;pug_debug_line = 34;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
if (orbit_controls) {
;pug_debug_line = 35;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
if (camera_position === "0 0 0") {
;pug_debug_line = 36;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
camera_position = "0 -2 20" //- different default for orbit controls
}
;pug_debug_line = 37;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ca-entity" + (" id=\"camera\""+pug_attr("look-controls", true, true, true)+pug_attr("orbit-controls", "\
                target: 0 0 0; minDistance: 1; \
                maxDistance: 50; initialPosition: "+ camera_position + "\
                ; maxPolarAngle: 180", true, true)) + "\u003E\u003C\u002Fa-entity\u003E";
;pug_debug_line = 42;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cscript\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 43;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "document.addEventListener(\"joystick-created\", function(event) { ";
;pug_debug_line = 44;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 44;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "    document.getElementById(\"joystick\").style.display = \"none\" \u002F\u002F remove joystick";
;pug_debug_line = 45;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
;pug_debug_line = 45;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "});\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fscript\u003E";
}
else {
;pug_debug_line = 47;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ca-entity id=\"camera_rig\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ca-entity" + (" id=\"camera\""+pug_attr("camera", true, true, true)+pug_attr("position", camera_position, true, true)+" touch-controls=\"gyroEnabled:false\" wasd-controls=\" fly:true; acceleration:40\"") + "\u003E\u003C\u002Fa-entity\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fa-entity\u003E";
;pug_debug_line = 50;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ca-entity light=\"type: point; intensity: 1; distance: 100; decay: 2\" position=\"0 0 0\"\u003E\u003C\u002Fa-entity\u003E";
;pug_debug_line = 51;pug_debug_filename = "01_pug\u002Fincludes\u002F3d-player.pug";
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ca-entity light=\"type: ambient; color: #CCC\"\u003E\u003C\u002Fa-entity\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fa-scene\u003E";
};
;pug_debug_line = 1;pug_debug_filename = "01_pug\u002Fincludes\u002Fsimple-annotation.pug";







































































;pug_debug_line = 1;pug_debug_filename = "01_pug\u002Fincludes\u002Fgallery-popup.pug";












































































































;pug_debug_line = 34;pug_debug_filename = "01_pug\u002Fincludes\u002Fmain-template.pug";
;pug_debug_line = 44;pug_debug_filename = "01_pug\u002Fincludes\u002Fmain-template.pug";
;pug_debug_line = 7;pug_debug_filename = ".\u002F01_pug\u002Fto_be_compiled\u002Fstara_voda\u002Fceiling.pug";
pug_indent.push('    ');
pug_mixins["3d-player"]("models/ceiling.glb");
pug_indent.pop();
pug_html = pug_html + "\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}