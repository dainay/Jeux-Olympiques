//timer dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
var countDownDate = new Date("Jul 26, 2024 20:00:00").getTime();
var timer = setInterval(function() {

  // Получить текущее время 
  var now = new Date().getTime();
  
  // Вычислить оставшееся время 
  var timeleft = countDownDate - now;
  
  // Рассчитать дни, часы, минуты и секунды 
  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24)); var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)); var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
  
  // Обновить значения на странице 
  document.getElementById("days").innerHTML = days + " <br><span>days</span> "; document.getElementById("hours").innerHTML = hours + "<br><span> hours</span> "; document.getElementById("mins").innerHTML = minutes + "<br><span>mins</span> "; document.getElementById("secs").innerHTML = seconds + "<br><span>sec</span>";
  
  }, 1000);
//dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
 
var totalMedals = 0;
var goldMedals = 0;
var silverMedals = 0;
var bronzeMedals = 0;
 
d3.csv("main_data.csv").then(function (data) {
  
  data.forEach(function (row) {
    var medal = row.Medal;
    
    
    if (medal === "GOLD") {
      goldMedals++;
    } else if (medal === "SILVER") {
      silverMedals++;
    } else if (medal === "BRONZE") {
      bronzeMedals++;
    }
    
    // all medals
    totalMedals++;
    
  });
  console.log(totalMedals,goldMedals,silverMedals,bronzeMedals, "check total medals");
//put all medals on the page

// document.getElementById('total').innerText = totalMedals; 


let start = 0; 
 
var timerTotal = setInterval(function() {
  if (start < totalMedals) {
    document.getElementById('total').innerText = start + 1;
    start=Math.min(start+53, totalMedals); 
  } 
}, 0.0001);



var timerTotal = setInterval(function() {
  if (start < goldMedals) {
    document.getElementById('gold').innerText  = start + 1;
    start++; 
  } 
}, 1);


var timerTotal = setInterval(function() {
  if (start < silverMedals) {
    document.getElementById('silver').innerText  = start + 1;
    start++; 
  } 
}, 1);

var timerTotal = setInterval(function() {
  if (start < bronzeMedals) {
    document.getElementById('bronze').innerText  = start + 1;
    start++; 
  } 
}, 1);

});
 
//ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

var medalCountByYear = {};

//function who counts medals of every country every year
function aaa(data) {
  data.forEach(function (row) {
    var year = row.year;
    var team = row.team;
    var medal = row.Medal; //create fast var

    if (medal === "GOLD" || medal === "SILVER" || medal === "BRONZE") {
      if (!medalCountByYear[team]) {
        //if any medal exists we creat team if it wasnt created before
        medalCountByYear[team] = {};
      }

      if (!medalCountByYear[team][year]) {
        medalCountByYear[team][year] = {
          //we create year if it wasnt created before
          medals: 0,
        };
      }

      medalCountByYear[team][year].medals++; // we add medals by every line who correspond the team and the year

      //table is ready to use for all code
    }
  });

  ///input/////////////////////

  var years = data
    .map((d) => d.year) // Фильтруем только уникальные значения из столбца 'year'
    .filter((value, index, self) => self.indexOf(value) === index);

  // Минимум и максимум только из отфильтрованных данных
  var minYear = d3.min(years);
  console.log(minYear);
  var maxYear = d3.max(years);
  console.log(maxYear);

  years.sort((a, b) => a - b);
  console.log(years);

  var step = 4;

  console.log(step);

  d3.select("#year")
    .attr("min", minYear)
    .attr("max", maxYear)
    .attr("step", step);
}

// Новая таблица для хранения данных

d3.csv("main_data.csv").then(function (data) {
  aaa(data);
  console.log(medalCountByYear); // check that table is working
  // check that table is working
  var selectedYear = 2000;



  

  var rangeInput = d3.select("#year");
  dessin (selectedYear)
  rangeInput.on("input", function  () {
    selectedYear = this.value; //take input
    dessin(selectedYear);
  });
  function dessin(selectedYear){
    console.log("Selected Year:", selectedYear); //check input
 
    if (selectedYear <= 1994) {
      var step = 4;
    }
    if (selectedYear > 1994) {
      var step = 2;
    }


    console.log(step);

    d3.select("#year").attr("step", step);

    var dataToBind = Object.entries(medalCountByYear);
    // Сортировка данных
    var sortedData = Object.entries(medalCountByYear)
      .sort((a, b) => {
        const aMedals = a[1][selectedYear]?.medals ?? 0;
        const bMedals = b[1][selectedYear]?.medals ?? 0;
        return bMedals - aMedals;
      })
      .slice(0, 10);

      console.log(sortedData)
    // showing bars with d3
    d3.select("#selected-year").text(selectedYear);

    let maxMedals = 0;

    for (let team in medalCountByYear) {
      for (let year in medalCountByYear[team]) {
        const medals = medalCountByYear[team][year].medals;
        if (medals > maxMedals) {
          maxMedals = medals;
        }
      }
    }

    const maxValue = maxMedals;
    console.log(maxValue); // max medals in history by one country

    if (selectedYear == 1916 || selectedYear == 1940 || selectedYear == 1944) {
      d3.select("#section1").selectAll(".barre").remove();
      d3.select("#div-section1").style("display", "block");
    } else {
      d3.select("#div-section1").style("display", "none");
      d3.select("#section1")
        .selectAll(".barre")
        .data(sortedData)
        .join("div")
        .attr("class", "barre")
        .transition()
        .style("width", (d) => {
          const medals = d[1][selectedYear]?.medals ?? 0;
          return (medals / maxValue) * 200 + "%";
        })
        .style("background", d => {
          return "linear-gradient(to right, #570047, #A340B2)"; 
        })
        .style("height", "60px")
        .style("margin", "3px 0px")
        .style("border-radius", "0 25px 25px 0")
        .text((d) => d[0] + ", " + d[1][selectedYear].medals + "  medals ")
        .style("color", (d) => {
          const qty = d[1][selectedYear].medals;
          if (qty < 15) {
            return "black"; 
          } else {
            return "white"; 
          }
        })
        .style("white-space", "nowrap") 
        .style("padding", "17px  0 0 10px")     
         ;
      // .text(d => )
    }
  }
});

// SECTION 2 dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

var bronzeSilverGold = {}; // Iable who has all data about medals of last olympic game and chosen teams

var allowedTeams = [
  //places of last olympic games
  "Japan",
  "Republic of Korea",
  "Brazil",
  "Russian Federation",
  "ROC",
  "Great Britain",
  "Canada",
  "People's Republic of China",
  "Italy",
  "Greece",
  "United States",
  "Australia",
  "Japan",
  "United States of America",
  "Norway",
  "France",
];

var teamAliases = {
  "Russian Federation": "Russia",
  ROC: "Russia",
};

d3.csv("main_data.csv").then(function (data) {
  data.forEach(function (row) {
    var year = row.year;
    var team = row.team;
    var medal = row.Medal;

    // Check if the year is greater than or equal to 1994 and the team is in the allowedTeams list
    if (
      year >= 1994 &&
      (medal === "GOLD" || medal === "SILVER" || medal === "BRONZE") &&
      allowedTeams.includes(team)
    ) {
      // put together  "Russian Federation" and "ROC" under "Russia"
      if (teamAliases[team]) {
        team = teamAliases[team];
      }

      if (!bronzeSilverGold[team]) {
        bronzeSilverGold[team] = {};
      }

      // Add missing years
      var startYear = 1994;
      var endYear = 2022;
      for (var i = startYear; i <= endYear; i++) {
        if (!bronzeSilverGold[team][i]) {
          bronzeSilverGold[team][i] = {
            Gold: 0,
            Silver: 0,
            Bronze: 0,
          };
        }
      }

      if (medal === "GOLD") {
        bronzeSilverGold[team][year].Gold++;
      } else if (medal === "SILVER") {
        bronzeSilverGold[team][year].Silver++;
      } else if (medal === "BRONZE") {
        bronzeSilverGold[team][year].Bronze++;
      }
    }
  });

  console.log(bronzeSilverGold, "HERE MEDALS");

  // Get a list of all countries (teams) from the data
  var countries = Object.keys(bronzeSilverGold);
  console.log(countries, "countries");

  var select = d3.select("#selectedTeam");
  select
    .selectAll("option")
    .data(countries)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    })
    .attr("value", function (d) {
      return d;
    })
    .property("selected", function (d) {
      return d === "France";
    });

  function updateStreamgraph() {
    var selectedTeam = d3.select("#selectedTeam").property("value");

    // Clear the existing graph
    d3.select("#section3").select("svg").remove();

    var data = Object.entries(bronzeSilverGold[selectedTeam]).map(
      ([year, medals]) => ({
        year: year,
        Bronze: medals.Bronze,
        Silver: medals.Silver,
        Gold: medals.Gold,
      })
    );

    var data = Object.entries(bronzeSilverGold[selectedTeam]).map(
      ([year, medals]) => ({
        year: year,
        Bronze: medals.Bronze,
        Silver: medals.Silver,
        Gold: medals.Gold,
      })
    );

    var svg = d3
      .select("#section3")
      .append("svg")
      .attr("width", 3000)
      .attr("height", 600);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.Bronze + d.Silver + d.Gold)])
      .range([400, 10]);

    var xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([30, 1090])
      .padding(1);

    var colorScale = d3
      .scaleOrdinal()
      .domain(["Gold", "Silver", "Bronze"])
      .range(["#FFD700", "#C0C0C0", "#CD7F32"]);

    var areaBronze = d3
      .area()
      .x((d) => xScale(d.year))
      .y0((d) => yScale(0))
      .y1((d) => yScale(d.Bronze))
      .curve(d3.curveCatmullRom);

    var areaSilver = d3
      .area()
      .x((d) => xScale(d.year))
      .y0((d) => yScale(d.Bronze))
      .y1((d) => yScale(d.Bronze + d.Silver))
      .curve(d3.curveCatmullRom);

    var areaGold = d3
      .area()
      .x((d) => xScale(d.year))
      .y0((d) => yScale(d.Bronze + d.Silver))
      .y1((d) => yScale(d.Bronze + d.Silver + d.Gold))
      .curve(d3.curveCatmullRom);

    svg
      .append("path")
      .datum(data)
      .attr("d", areaBronze)
      .attr("fill", colorScale("Bronze"))
      .attr("transform", "translate(0, 0)");

    svg
      .append("path")
      .datum(data)
      .attr("d", areaSilver)
      .attr("fill", colorScale("Silver"));

    svg
      .append("path")
      .datum(data)
      .attr("d", areaGold)
      .attr("fill", colorScale("Gold"));

    var xAxis = d3.axisBottom(xScale);
    svg.append("g").attr("transform", "translate(0, 400)")
    .call(xAxis);

 
    var yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", "translate(65, 0)").call(yAxis);

    console.log("Updated streamgraph for team: " + selectedTeam);

    var olympicGames = [
      { country: "Norway", city: "Lillehammer", year: 1994, season: "Winter" },
      { country: "United States of America", city: "Atlanta", year: 1996, season: "Summer" },
      { country: "Japan", city: "Nagano", year: 1998, season: "Winter" },
      { country: "Australia", city: "Sydney", year: 2000, season: "Summer" },
      { country: "United States of America", city: "Salt Lake City", year: 2002, season: "Winter" },
      { country: "Greece", city: "Athens", year: 2004, season: "Summer" },
      { country: "Italy", city: "Turin", year: 2006, season: "Winter" },
      { country: "People's Republic of China", city: "Beijing", year: 2008, season: "Summer" },
      { country: "Canada", city: "Vancouver", year: 2010, season: "Winter" },
      { country: "Great Britain", city: "London", year: 2012, season: "Summer" },
      { country: "Russia", city: "Sochi", year: 2014, season: "Winter" },
      { country: "Brazil", city: "Rio", year: 2016, season: "Summer" },
      { country: "Republic of Korea", city: "PyeongChang", year: 2018, season: "Winter" },
      { country: "Japan", city: "Tokyo", year: 2020, season: "Summer" },
      { country: "People's Republic of China", city: "Beijing", year: 2022, season: "Winter" }
    ];

    var selectedTeam = d3.select("#selectedTeam").property("value");

    // Check if the selected team is "France"
    if (selectedTeam === "France") {
      d3.select("#host").html("<p>Last Time that france were hosting the Olympic games was 1992. She was shared her duties with Spain.</p>");

    }

    // Find the year for the selected team
    var selectedGame = olympicGames.find(function (game) {
      return game.country === selectedTeam;
    });

    // Check if a matching game is found
    if (selectedGame) {
      var selectedYear = selectedGame.year;
      var selectedCity = selectedGame.city;
      var selectedSeason = selectedGame.season;

      // Remove existing content inside the "host" element
  d3.select("#host").html("");

  // Append the new div with the content
  d3.select("#host").append("div").html(`
    <p>In <span id="year-host">${selectedYear}</span> <span id="host-country">${selectedTeam}</span> hosted ${selectedSeason} Olympic Games in ${selectedCity}</p>
  `);

      console.log(
        "Updated streamgraph for team: " +
          selectedTeam +
          " in year: " +
          selectedYear
      );
    } else {
      console.log("No data found for team: " + selectedTeam);
    }
  }

  // Initial update to show the streamgraph for the default selected team
  updateStreamgraph();

  // Add an event listener to the select element
  d3.select("#selectedTeam").on("change", updateStreamgraph);
});
