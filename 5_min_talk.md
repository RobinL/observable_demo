##  Extremely fast open data prototypes

https://www.gov.uk/government/collections/criminal-court-statistics

https://beta.observablehq.com/@robinl/untitled/3


### Introduction

- Over the past years, data presentation has increasingly become something done in a web browser.

- Open data offerings not kept up with this trend - data has historically been locked away in Excel and pdfs.

- Until recently, this didn't matter too much because building web content was difficult - so few could take advantage of machine readable open data.

- But new tools make this much easier, to the point where most analysts should be able to do without much trouble.  This is exciting, because analysts produce too much content to make bespoke websites for every report and open data product.

- To demonstrate why our new open data is such a big improvement, I'm going to do a quick demo of how easily we can now build some content on top of it.

1 minute.
---

Observable is our authoring environment.

```
title = md`# Here's some amazing open data!`
```

```
d3 = require('d3')
```


```
vega_embed = require("vega-embed@3")
```

```
import {htmlTable} from "@rohscx/inputs"
```

```
data = d3.csv("https://gist.githubusercontent.com/RobinL/5a3fb37c43c017a051ea7ece1804d18b/raw/bb0816955fbd30514d993ab7c2cb379837abc41a/tidy_timeliness.csv")
```

```
table = htmlTable(data.slice(0,10))
```

```
commentary = {
  let row = data[0]
  return md`In ${row.yearquarter} threre were ${row.receipts} receipts for ${row.offence_type} in ${row.crown_court_centre}`

}
```


```
viewof chart_1 = {
  return vega_embed(
    {
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
```

```
dl = DOM.download(
  new Blob([d3.csvFormat(chart_1._runtime.data.data_1.values.value)], {type: "text/csv"}),
  "chartdata.csv",
  'Download chart  data'
)
```

So in 4 minutes we've created an open data site that contains some statistical commentary and some charts that reads directly from our published open data.

This site will stay evergreen - as we update our open data, the chart and commentary will update to reflect the latest figures.

 We've seen that these new tools make things much easier for users of open data.  That means that the payoff from modernising open data offerings is increasing.

 So as a result of our work, we can expect to see our users creating better content that stays up to date automatically, because it reads directly from our new open data.