// URL: https://beta.observablehq.com/@robinl/hello-world
// Title: Here's my amazing open data!
// Author: Robin Linacre (@robinl)
// Version: 160
// Runtime version: 1

const m0 = {
    id: "019cc27370dc9c91@160",
    variables: [
      {
        name: "title",
        inputs: ["md"],
        value: (function(md){return(
  md`# Here's my amazing open data!`
  )})
      },
      {
        name: "d3",
        inputs: ["require"],
        value: (function(require){return(
  require('d3')
  )})
      },
      {
        name: "vega_embed",
        inputs: ["require"],
        value: (function(require){return(
  require("vega-embed@3")
  )})
      },
      {
        from: "@rohscx/inputs",
        name: "htmlTable",
        remote: "htmlTable"
      },
      {
        name: "data",
        inputs: ["d3"],
        value: (function(d3){return(
  d3.csv("https://gist.githubusercontent.com/RobinL/5a3fb37c43c017a051ea7ece1804d18b/raw/bb0816955fbd30514d993ab7c2cb379837abc41a/tidy_timeliness.csv")
  )})
      },
      {
        name: "table",
        inputs: ["htmlTable","data"],
        value: (function(htmlTable,data){return(
  htmlTable(data.slice(0,5))
  )})
      },
      {
        name: "commentary",
        inputs: ["data","md"],
        value: (function(data,md)
  {
    let row = data[0]

    return md`In ${row.yearquarter} there were ${row.receipts} receipts for ${row.offence_type} in ${row.crown_court_centre}`

  }
  )
      },
      {
        name: "viewof chart_1",
        inputs: ["vega_embed","data"],
        value: (function(vega_embed,data)
  {
    return vega_embed(
      {
      '$schema': 'https://vega.github.io/schema/vega-lite/v2.4.3.json',
      'data': {
          'values': data
      },
      'encoding': {
          'x': {
            'field': 'yearquarter',
            'type': 'ordinal'
          },
          'y': {
            'aggregate': 'sum',
            'field': 'outstanding',
            'type': 'quantitative'
          }
        },
      'mark': {'type':'line', 'point' : 'true'},
      'title': `Oustanding cases`,
      'width': 600
      })
  }
  )
      },
      {
        name: "chart_1",
        inputs: ["Generators","viewof chart_1"],
        value: (G, _) => G.input(_)
      },
      {
        name: "dl",
        inputs: ["DOM","d3","chart_1"],
        value: (function(DOM,d3,chart_1){return(
  DOM.download(
    new Blob([d3.csvFormat(chart_1._runtime.data.data_1.values.value)], {type: "text/csv"}),
    "chartdata.csv",
    'Download chart  data'
  )
  )})
      }
    ]
  };

  const m1 = {
    id: "@rohscx/inputs",
    variables: [
      {
        name: "htmlTable",
        value: (function(){return(
  (data,fontSize) => {
    const table = document.createElement("table");
    const trHeader = document.createElement("tr");
    const trRows = document.createElement("tr");
    const thHeaderData = Object.keys(data[0]);
    const thRowData = data;
    const dataLength = data.length;
    thHeaderData.map(data => {
      const tempTh = document.createElement("th")
      tempTh.appendChild(document.createTextNode(data))
      trHeader.appendChild(tempTh)
    })
    table.appendChild(trHeader)
    thRowData.map((data,index) => {
      if (index) {
        const tdKeys = Object.keys(data);
        const tempTr = document.createElement("tr")
        tdKeys.map((data2,index) => {
          const tempTd = document.createElement("td")
          tempTd.appendChild(document.createTextNode(data[data2]))
          tempTr.appendChild(tempTd).style.fontSize = fontSize ? fontSize : "small"
        })
        table.appendChild(tempTr)
      } else {

      }

    })
    return table;
  }
  )})
      }
    ]
  };

  const notebook = {
    id: "019cc27370dc9c91@160",
    modules: [m0,m1]
  };

  export default notebook;