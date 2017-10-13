# ![Assessment 2][banner]
This is assessement 2 of Frontend 3. I've made a D3 chart of visualsing the amount of the labor participation and unemployment per month. This assignment is made with [D3](https://d3js.org/). I've chosen the [Grouped Bar Chart](https://bl.ocks.org/mbostock/3887051) to visualise my data. You can filter between the years and also the amount.

![Final version](preview.png)

## Background
First of I copied the files from the original [Grouped Bar Chart](https://bl.ocks.org/mbostock/3887051). After that I've made a directory with the following files:

* `index.html`, This is basically the file that's being show in the browser.
* `index.css`, Stylesheet.
* `index.js`, Here is where the animations and the data is being loaded in.
* `index.csv`, This is the data I just for the datavisualisation.

### index.html
I've added a `<main>` and `<section>` to the file. The `<main>` I used for the CSS later on added the `<section>` tag for the `<button>` to sort the data on.
  
### index.css
In the index.css file I've positioned the body so that it's centered in the middle of the browser. To the `<main>` I've added 

### index.js
First of I copied the code from the original file. After that I looked into the file and read down the code to understand it.

For creating the svg I changed it from: 
```javascript
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
``` 

Into this:
```javascript
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
```


### index.csv
I used the data from the [CBS](http://statline.cbs.nl/statweb/publication/?vw=t&dm=slnl&pa=80590ned&d1=10,12&d2=a&d3=0&d4=(l-26)-l&hd=160414-1419&hdr=t,g1&stb=g2,g3) website. The data contains how much labor participation and unemployment per month in three years:

#### 2015 example:

* `2015, August`
* `2015, September`
* `2015, October`
* `2015, November`
* `2015, December` and so on..

The data is a .CSV file. The data is a a little bit dirty with some minor mistakes. 

This is how the data is looking:

| Perioden          | Totaal    | Mannen    | Vrouwen   |
| ----------------- | --------- | ----------| ----------|  
| 2015 augustus     | 8 353     | 4 500     | 3 853     | 
| 2015 september    | 8 303     | 4 466     | 3 837     |
| 2015 oktober      | 8 313     | 4 474     | 3 840     |
| 2015 november     | 8 315     | 4 484     | 3 831     |
| 2015 december     | 8 306     | 4 472     | 3 834     |

I loaded the data into my JS file. After that I removed some things in the file:

* `Removed the header and made a static header into the index.html file.`
* `Removed the footer.`
* `Removed the quotation marks and changed them into comma's.`

You can see the code below how I removed them:
```javascript
function onload (err, data) {
    if (err) throw err;

    let doc = data;

    let header = data.indexOf("Leeftijd");
    let headerEnd = data.indexOf('\n', header);
        doc = doc.slice(headerEnd).trim();

    let footer = doc.indexOf("� Centraal Bureau voor de Statistiek");
        doc = doc.slice(0, footer -3);
        
        doc = doc.replace(/"/g, '');
        doc = doc.replace(/;/g, ',');
```

I removed the header and footer from the dataset. I also removed the additional `semicolons` and `quotation marks`. When I was done with this I then went to focus to parse the file to a `.csv` file. 

```javascript
let csv = d3.csvParseRows(doc, map)
    function map(d) {
        return {
            Year: d[0],
            "15 tot 75 jaar": Number(d[1]),
            "15 tot 25 jaar": Number(d[2]),
            "25 tot 45 jaar": Number(d[3]),
            "45 tot 75 jaar": Number(d[4]),
        }
    };
    let keys = [
        "15 tot 75 jaar",
        "15 tot 25 jaar",
        "25 tot 45 jaar",
        "45 tot 75 jaar"
    ];
    data = csv;
```

Here I made the .txt file and converted into a .csv file. I gave it a map function and I stored the years as a string into a number in an array. Here I set the number to the specific title: "15 tot 75 jaar" for example. Later on I added a variable with the keys, which I later on can get them into the bar chart. Finally I made sure dat the parameter data is now csv. So the script knows that it is now reading as a .csv file.

I also gave the bar a classname, which you can see below:
```javascript
    .enter().append("rect")
```

Into this:
```javascript
    .enter().append("rect")
    .attr("class", "bar")
```



## Features
* [D3](https://d3js.org/)
* [Original Bar chart](https://bl.ocks.org/mbostock/3887051)
* [Author](https://b.locks.org/mbostock)
* [Used data from CBS](http://statline.cbs.nl/statweb/publication/?vw=t&dm=slnl&pa=80590ned&d1=10,12&d2=a&d3=0&d4=(l-26)-l&hd=160414-1419&hdr=t,g1&stb=g2,g3)
* [CBS](https://www.cbs.nl/)
* [D3 scaleBand](https://github.com/d3/d3-scale/blob/master/README.md#scaleBand)
* [D3 csv](https://github.com/d3/d3/wiki/CSV)
* [D3 csvParseRows](https://github.com/d3/d3-dsv/blob/master/README.md#csvParseRows)
* [D3 nest](https://github.com/d3/d3-collection/blob/master/README.md#nest)
* [D3 map](https://github.com/d3/d3-collection/blob/master/README.md#map) 
* [D3 transition](https://github.com/d3/d3-transition/blob/master/README.md#transition)
* [D3 select](https://github.com/d3/d3-selection/blob/master/README.md#select)
* [D3 selectAll](https://github.com/d3/d3-selection/blob/master/README.md#selectAll)
* [Selection append](https://github.com/d3/d3-selection/blob/master/README.md#selection_append)
* [Selection attr](https://github.com/d3/d3-selection/blob/master/README.md#selection_attr)
* [Selection enter](https://github.com/d3/d3-selection/blob/master/README.md#selection_enter)

## Thoughts
This assessment was really hard for me. I took a little bit time to load and clean up (a little bit I know!). I think a other chart would maybe be better for it. Maybe a map of a country with a slider that is showing the amount in the months or years.

## License

GPL 3.0 © 2017 Dylan van Zanten

[banner]: https://cdn.rawgit.com/cmda-fe3/logo/a4b0614/banner-assessment-2.svg
