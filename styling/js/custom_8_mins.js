 // Load the Observable runtime and inspector.
 import { Runtime, Inspector } from "../javascripts/notebook_runtime.js";


 // Your notebook, compiled as an ES module.
 import notebook from "https://api.observablehq.com/@robinl/untitled/4.js";
//  import notebook from "./notebook1.js"


const outputs = ["title", "viewof offence_type", "commentary", "viewof chart_1", "table"]


     var cells = document.getElementById("cells")

     let outputs_divs = outputs.map(function(d) {
        let new_cell = document.createElement("div")
        new_cell.id = d
        new_cell.className = "cell"
        cells.appendChild(new_cell)
        return new_cell
    })

 Runtime.load(notebook, (cell) => {


    if (outputs.includes(cell.name)) {
        var this_cell = document.getElementById(cell.name)
        return {
            fulfilled: (value) => {
                this_cell.innerHTML = '';
                this_cell.appendChild(value)
            }
        };
    }




 });
