
        let sportsmen = [
            { name: "aa", age: 25 },
            { name: "bb", age: 22 },
            { name: "cc", age: 5 }
        ];

        // Width and height of the streamgraph container
        const width = 400;
        const height = 200;

        // Create an SVG container
        const svg = d3.select("#streamgraph-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Create a function to stack the data
        const stack = d3.stack()
            .keys(["age"])
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetWiggle);

        // Prepare the data for stacking
        const stackedData = stack(sportsmen);

        // Create a color scale
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Create the area generator
        const area = d3.area()
            .x(d => d[0])
            .y0(d => d[1])
            .y1(d => d[2])
            .curve(d3.curveBasis);

        // Draw the streamgraph
        svg.selectAll("path")
            .data(stackedData)
            .enter()
            .append("path")
            .style("fill", (d, i) => color(i))
            .attr("d", area);



            x = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.year; }))
            .range([ 0, width ]);
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(5));
        
          // Add Y axis
          var y = d3.scaleLinear()
            .domain([-100000, 100000])
            .range([ height, 0 ]);
          svg.append("g")
            .call(d3.axisLeft(y));
        
          // color palette
          var color = d3.scaleOrdinal()
            .domain(keys)
            .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'])
        
          //stack the data?
          var stackedData = d3.stack()
            .offset(d3.stackOffsetSilhouette)
            .keys(keys)
            (data)
        
          // Show the areas
          svg
            .append("path").datum(data)
              .style("fill", function(d) { return color(d.key); })
              .attr("d", d3.area()
                .x(function(d, i) { return x(d.data.year); })
                .y0(function(d) { return y(0); })
                .y1(function(d) { return y(d.or); })
            )