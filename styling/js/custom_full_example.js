 // Load the Observable runtime and inspector.
 import { Runtime, Inspector } from "../javascripts/notebook_runtime.js";


 // Your notebook, compiled as an ES module.
 import notebook from "https://api.observablehq.com/@robinl/draft-prototype-receipts-disposals-and-cases-outstanding-.js";
//  import notebook from "https://api.observablehq.com/@robinl/untitled/4.js";
//  import notebook from "./notebook1.js"


// const outputs = ["title", "subtitle_1", "main_commentary", "viewof chart", "commentary", "viewof chart_1", "table"]
const outputs = ["title",
                 "report_period_html",
                 "subtitle_1",
                 "main_commentary",
                 "summary_charts_title",
                 "viewof summary_chart",
                 "chart_md_output",
                 "viewof heatmap",
                 "customised_report_title",
                 "choose_court",
                 "customised_report_md",
                "populate_custom_select_boxes"]


     var cells = document.getElementById("cells")

     let outputs_divs = outputs.map(function(d) {
        let new_cell = document.createElement("div")
        new_cell.id = d
        new_cell.className = "cell"
        cells.appendChild(new_cell)
        return new_cell
    })

 Runtime.load(notebook, (cell) => {

    // Skip cells without names

    if ("name" in cell) {



        if (outputs.includes(cell.name)) {
            var this_cell = document.getElementById(cell.name)
            return {
                fulfilled: (value) => {
                    this_cell.innerHTML = '';
                    this_cell.appendChild(value)
                }
            };
        }

}




 });
