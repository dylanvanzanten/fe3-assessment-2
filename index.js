// Original: https://bl.ocks.org/mbostock/3887051
// Author: https://b.locks.org/mbostock

// Give the svg margins and calculate the width and height with the margins. 
let margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 20
    },
    width = 1500 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

// Create the svg and calculate the width and height with the margins.
let svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

let x1 = d3.scaleBand()
    .padding(0.05);

let y = d3.scaleLinear()
    .rangeRound([
        height, 0
    ]);

let z = d3.scaleOrdinal()
    .range([
        "#0D47A1",
        "#1565C0",
        "#1976D2",
        "#1E88E5"
    ]);

// Get the data text file.
d3.text("index.txt")
    .get(onload)

function onload(err, data) {
    if (err) throw err;

    // Variable doc that is the data.
    let doc = data;

    // Select header to slice. Slice the index of header.
    let header = data.indexOf("Perioden");
    // Select all header to slice. Add trim to remove white-space.
    let headerEnd = data.indexOf('\n', header);
    doc = doc.slice(headerEnd).trim();

    // Select footer to slice. Slice the index of footer.
    let footer = doc.indexOf("� Centraal Bureau voor de Statistiek");
    doc = doc.slice(0, footer - 3);
    // Remove the quotation marks. g is to globally remove al the semicolons.
    doc = doc.replace(/"/g, '');
    // Remove the semicolons. g is to globally remove al the semicolons.
    doc = doc.replace(/;/g, ',');

    // Add a variable for parsing the data to an .csv file.
    let csv = d3.csvParseRows(doc, map)

    function map(d) {
        // Get the data. Return a value with al the month and years.
        return {
            Year: d[0],
            "15 tot 75 jaar": Number(d[1]),
            "15 tot 25 jaar": Number(d[2]),
            "25 tot 45 jaar": Number(d[3]),
            "45 tot 75 jaar": Number(d[4]),
        }
    };

    // Make a variable for the keys. The keys contain the string I'm getting from the map function.
    let keys = [
        "15 tot 75 jaar",
        "15 tot 25 jaar",
        "25 tot 45 jaar",
        "45 tot 75 jaar"
    ];

    // Data param is now going to be csv param.
    data = csv;

    // X0.domain has got the date and years from the data. Returns the data.
    x0.domain(data.map(function (d) {
        return d.Year;
    }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function (d) {
        return d3.max(keys, function (key) {
            return d[key];
        });
    })]).nice();

    g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {
            return "translate(" + x0(d.Year) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
            return keys.map(function (key) {
                return {
                    key: key,
                    value: d[key]
                };
            });
        })
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x1(d.key);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("width", x1.bandwidth())

        // Animation for the bars. Has a delay of 0.5 seconds. Source: https://bl.ocks.org/jamesleesaunders/f32a8817f7724b17b7f1
        .transition()
        .duration(500)
        .ease(d3.easeCubic)
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .attr("fill", function (d) {
            return z(d.key);
        });

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Aantal werkloos");

    let legend = g.append("g")
        .attr("font-family", "roboto")
        .attr("font-size", 16)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 30 + ")";
        });
    // Make the legend to the bar, and give it a width. And fill.
    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });

    // Select the button and create a .on("click") event for the function.
    d3.select("#year2017").on("click", showYear2017);

    function showYear2017(){
        d3.selectAll(".bar").remove();
    }
    

}