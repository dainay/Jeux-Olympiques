
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