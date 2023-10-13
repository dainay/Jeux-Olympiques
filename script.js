// d3.csv("main_data.csv") //count all medals for all the time
//   .then(function(data) {
//     var medalCount = {};

//     data.forEach(function(row) {
//       var year = row.year;
//       var team = row.team;
//       var medal = row.Medal;

//       if (medal === "GOLD" || medal === "SILVER" || medal === "BRONZE") {
//         if (!medalCount[team]) {
//           medalCount[team] = {
//             Gold: 0,
//             Silver: 0,
//             Bronze: 0
//           };
//         }

//         if (medal === "GOLD") {
//           medalCount[team].Gold++;
//         } else if (medal === "SILVER") {
//           medalCount[team].Silver++;
//         } else if (medal === "BRONZE") {
//           medalCount[team].Bronze++;
//         }
//       }
//     });

//     // Вывод обновленной таблицы объектов в консоль
//     console.log(medalCount);
//   })

//dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

//dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

var medalCountByYear = {}

//function who counts medals of every country every year
function aaa (data) {
  data.forEach(function (row) {
    var year = row.year
    var team = row.team
    var medal = row.Medal //create fast var

    if (medal === 'GOLD' || medal === 'SILVER' || medal === 'BRONZE') {
      if (!medalCountByYear[team]) {
        //if any medal exists we creat team if it wasnt created before
        medalCountByYear[team] = {}
      }

      if (!medalCountByYear[team][year]) {
        medalCountByYear[team][year] = {
          //we create year if it wasnt created before
          medals: 0
        }
      }

      medalCountByYear[team][year].medals++ // we add medals by every line who correspond the team and the year

      //table is ready to use for all code
    }
  })

  ///function to change new table who will collect medals by years, totals.

  ///input/////////////////////

  var years = data
    .map(d => d.year) // Фильтруем только уникальные значения из столбца 'year'
    .filter((value, index, self) => self.indexOf(value) === index)
  console.log(years)

  // Минимум и максимум только из отфильтрованных данных
  var minYear = d3.min(years)
  console.log(minYear)
  var maxYear = d3.max(years)
  console.log(maxYear)

  years.sort((a, b) => a - b)
  console.log(years)

  var step = years[1] - years[0]
  console.log(step)

  d3.select('#year')
    .attr('min', minYear)
    .attr('max', maxYear)
    .attr('step', step)
}

// Новая таблица для хранения данных

d3.csv('main_data.csv').then(function (data) {
  aaa(data)
  console.log(medalCountByYear) // check that table is working
  // check that table is working
  var selectedYear = 1890

  var rangeInput = d3.select('#year')

  rangeInput.on('input', function () {
    selectedYear = this.value //take input
    console.log('Selected Year:', selectedYear) //check input

    var dataToBind = Object.entries(medalCountByYear)
    // Сортировка данных
    var sortedData = Object.entries(medalCountByYear)
      .sort((a, b) => {
        const aMedals = a[1][selectedYear]?.medals ?? 0
        const bMedals = b[1][selectedYear]?.medals ?? 0
        return bMedals - aMedals
      })
      .slice(0, 10)

    // showing bars with d3

    if (selectedYear == 1916 || selectedYear == 1940 || selectedYear == 1944) {
      d3.select('#section1').selectAll('.barre').remove()
      d3.select('#div-section1')
      .style("display", 'block')
    } else {
      const maxValue = Math.max(...sortedData.map(item => item[1][selectedYear].medals))

      console.log(maxValue)

      // const maxValue = sortedData
      d3.select('#div-section1')
      .style("display", 'none')
      d3.select('#section1')
        .selectAll('.barre')
        .data(sortedData)
        .join('div')
        .attr('class', 'barre')
        .transition()
        .style('width', d => {
          const medals = d[1][selectedYear]?.medals ?? 0
          return medals / maxValue * 100 + '%'
        })
        .style('background-color', 'red')
        .style('height', '20px')
        .style('margin', '7px 0px')
        .text(d => d[0])
    }
  })
})

//   // Функция для отображения топ-10 стран по количеству медалей на выбранный год
//   function displayTop10Countries(selectedYear) {
//     if (medalCountByYear[selectedYear]) {
//       // Преобразование объекта в массив и сортировка по общему количеству медалей
//       var countriesArray = Object.keys(medalCountByYear[selectedYear]).map(function (team) {
//         return { team: team, total: medalCountByYear[selectedYear][team].Total };
//       }).sort(function (a, b) {
//         return b.total - a.total;
//       });

//       // Выберите только топ-10 стран
//       var top10Countries = countriesArray.slice(0, 10);

//       // Отобразите результаты в HTML-элементе
//       var resultsDiv = d3.select("#results");
//       resultsDiv.html("");
//       resultsDiv.append("h3").text("Top 10 Countries in " + selectedYear);

//       var ul = resultsDiv.append("ul");
//       top10Countries.forEach(function(country) {
//         ul.append("li").text(country.team + " - " + country.total + " medals");
//       });
//     } else {
//       d3.select("#results").html("No data available for the selected year.");
//     }
//   }

//   // Начальное отображение результатов для выбранного года по умолчанию
//   displayTop10Countries(2001);

//   // Добавьте обработчик событий для элемента ввода range, чтобы обновлять результаты при выборе года

// });

// d3.json("medals.json").then(function(data) {
//   // Preprocess the data
//   var stack = d3.stack()
//     .keys(["gold", "silver", "bronze"])
//     .order(d3.stackOrderNone)
//     .offset(d3.stackOffsetNone);

//   var layers = stack(data);

//   // Set up scales
//   var xScale = d3.scaleLinear()
//     .domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function(d) { return d.year; })])
//     .range([0, 800]);

//   var yScale = d3.scaleLinear()
//     .domain([0, d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d[1]; }); })])
//     .range([400, 0]);

//   // Define color scale
//   var colorScale = d3.scaleOrdinal()
//     .domain(["gold", "silver", "bronze"])
//     .range(["#ffd700", "#c0c0c0", "#cd7f32"]);

//   // Generate the area generator
//   var area = d3.area()
//     .x(function(d, i) { return xScale(data[i].year); })
//     .y0(function(d) { return yScale(d[0]); })
//     .y1(function(d) { return yScale(d[1]); })
//     .curve(d3.curveBasis);

//   // Draw the steamgraph
//   var steamgraph = d3.select("#steamgraph");
//   steamgraph.selectAll("path")
//     .data(layers)
//     .enter()
//     .append("path")
//     .attr("d", area)
//     .style("fill", function(d) { return colorScale(d.key); });

//   // Draw x-axis
//   steamgraph.append("line")
//     .attr("x1", 0)
//     .attr("y1", 400)
//     .attr("x2", 800)
//     .attr("y2", 400)
//     .style("stroke", "black");

//   // Add x-axis labels
//   data.forEach(function(d) {
//     steamgraph.append("text")
//       .attr("x", xScale(d.year))
//       .attr("y", 420)
//       .text(d.year);
//   });

//   // Draw y-axis
//   steamgraph.append("line")
//     .attr("x1", 0)
//     .attr("y1", 0)
//     .attr("x2", 0)
//     .attr("y2", 400)
//     .style("stroke", "black");

//   // Add y-axis labels
//   var yAxisLabels = yScale.ticks();
//   yAxisLabels.forEach(function(d) {
//     steamgraph.append("text")
//       .attr("x", -30)
//       .attr("y", yScale(d))
//       .attr("dy", 5)
//       .text(d);
//   });

//   // Update the steamgraph based on the selected year
//   d3.select("#year-slider").on("input", function() {
//     var selectedYear = this.value;

//     // Filter the data to include only the selected year
//     var filteredData = data.filter(function(d) {
//       return d.year <= selectedYear;
//     });

//     // Update scales based on filtered data
//     xScale.domain([d3.min(filteredData, function(d) { return d.year; }), selectedYear]);

//     // Update the area generator
//     area.x(function(d, i) { return xScale(filteredData[i].year); });

//     // Update the paths of the steamgraph
//     steamgraph.selectAll("path")
//       .data(stack(filteredData))
//       .attr("d", area);
//   });
// });
