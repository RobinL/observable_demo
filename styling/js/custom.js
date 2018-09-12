 // Load the Observable runtime and inspector.
 import { Runtime, Inspector } from "../javascripts/notebook_runtime.js";


 // Your notebook, compiled as an ES module.
 import notebook from "https://api.observablehq.com/d/5fee84430b9f59d3.js?key=7cd60ee1c789e25c";
//  import notebook from "./notebook1.js"

 Runtime.load(notebook, (cell) => {


    const outputs = ["title", "commentary", "chart_1", "dl", "table"]


     var cells = document.getElementById("cells")
     if (outputs.includes(cell.name)) {

        var div = document.createElement("div");

        var cell = cells.appendChild(div)

        cell.className = "cell"


         return {
             fulfilled: (value) => {

                if ("_el" in value ){
                    value = value._el
                }

                 cell.appendChild(value)
             }
         };
     }



 });
