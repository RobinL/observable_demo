---

Observable is our authoring environment.

What's we're going to do:

- Load some data in

- Put it in a table

- Write some commentary

- Show a chart.

- Lay this out in gov uk styling

```
title = md`# Receipts, Disposals and Outstanding`
```

```
import {datatable, rdo, vega_embed, rendertable, run_sql, _, run_sql_singleresult} from "@robinl/imports"
```

```
open_data = {
  let url = "https://gist.githubusercontent.com/RobinL/5a3fb37c43c017a051ea7ece1804d18b/raw/bb0816955fbd30514d993ab7c2cb379837abc41a/tidy_timeliness.csv"
  return rdo.get_csv_and_parse(url)
}
```

```
table = rendertable(open_data,  {limit: 5,  enableFilter: false})
```

```
viewof offence_type =  html`
<select id='offence_type'>
<option value="Criminal Damage And Arson">Criminal Damage And Arson</option>
<option value="Drug Offences">Drug Offences</option>
</select>
```

```
latest_year = run_sql_singleresult(open_data, 'select max(year) as max_year from df')
```

```
sum_disposals = run_sql_singleresult(open_data,
                            `select sum(disposals) as sum_diposals
                             from df
                             where year = ${latest_year}
                             and offence_type='${offence_type}'`)
```

```
commentary = md`In ${latest_year} there were ${rdo.int_fmt(sum_disposals)} disposals for ${offence_type}.`
```

```

chart_data =   run_sql(open_data, `
  select yearquarter, sum(disposals) as sum_disposals
  from df
  where offence_type = '${offence_type}'
  group by yearquarter


`)

```

```
viewof chart_1 = {
  return vega_embed(
    {
    'data': {
        'values': chart_data
    },
    'encoding': {
        'x': {
          'field': 'yearquarter',
          'type': 'ordinal'
        },
        'y': {
          'field': 'sum_disposals',
          'type': 'quantitative'
        }
      },
    'mark': {'type':'line', 'point' : 'true'},
    'title': `Disposals cases of ${offence_type}`,
    'width': 600
    })
}
```


Total of 19 lines of code and then a chart spec which was a further 20 lines of code.

Working with a pretty big dataset - of 15,000 rows of data, without any problems or optimisation.  Typical applications may be much more lightweight.

