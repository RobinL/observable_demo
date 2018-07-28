##  Extremely fast open data prototypes

### Introduction

- This talk is about a little experiment we've done with open data that makes it much easier to use on the web.

- Over the past years, data visualisation has increasingly become something done in a web browser.

- Open data offerings not kept up with this trend - data has historically been locked away in Excel and pdfs.

- Until recently, this didn't matter too much because building web content was difficult - so few could take advantage of machine readable open data.

- But new tools make this much easier, to the point where most analysts should be able to do without much trouble.

- I'm now going to attempt to prove this by building a dashboard using the new open data we've recently published, using free an open source tools.

1 minute.
---

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
  let row = data[-1]
  return md`In ${row.yearquarter} threre were ${row.receipts} receipts for ${row.offence_type} in ${row.crown_court_centre}`

}
```


```
viewof chart_1 = {
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
```

```
dl = DOM.download(
  new Blob([d3.csvFormat(chart_1._runtime.data.data_1.values.value)], {type: "text/csv"}),
  "chartdata.csv",
  'Download chart  data'
)
```

So in 5 minutes we've created an open data site that contains some statistical commentary and some charts that reads directly from our published open data.

This is important because this site will stay evergreen - as we update our open data, the chart and commentary will update to reflect the latest figures.

With these new tools, I hope to see much more innovative uses of open data going forward.