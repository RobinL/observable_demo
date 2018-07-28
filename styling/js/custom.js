 // Load the Observable runtime and inspector.
 import { Runtime, Inspector } from "https://unpkg.com/@observablehq/notebook-runtime?module";


 // Your notebook, compiled as an ES module.
 import notebook from "https://api.observablehq.com/@robinl/first-cell.js?key=025de3d3eed8b7cd";


 Runtime.load(notebook, (cell) => {

     const outputs = ["first_cell", "second_cell", "third_cell"]
     var cells = document.getElementById("cells")
     if (outputs.includes(cell.name)) {

        var div = document.createElement("div");

        var cell = cells.appendChild(div)

        cell.className = "cell"


         return {
             fulfilled: (value) => {


                 cell.appendChild(value)
             }
         };
     }



 });


