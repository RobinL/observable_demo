 // Load the Observable runtime and inspector.
 import { Runtime, Inspector } from "../javascripts/notebook_runtime.js";


 // Your notebook, compiled as an ES module.
//  import notebook from "https://api.observablehq.com/@robinl/hello-world.js?key=050f8f02950258e1";
 import notebook from "./notebook2.js"

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
