//timer dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
var countDownDate = new Date('Jul 26, 2024 20:00:00').getTime()
var timer = setInterval(function () {
  // Получить текущее время
  var now = new Date().getTime()

  // Вычислить оставшееся время
  var timeleft = countDownDate - now

  // Рассчитать дни, часы, минуты и секунды
  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24))
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000)

  // Обновить значения на странице
  document.getElementById('days').innerHTML = days + ' <br><span>days</span> '
  document.getElementById('hours').innerHTML =
    hours + '<br><span> hours</span> '
  document.getElementById('mins').innerHTML = minutes + '<br><span>mins</span> '
  document.getElementById('secs').innerHTML = seconds + '<br><span>sec</span>'
}, 1000)
//dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

var totalMedals = 0
var goldMedals = 0
var silverMedals = 0
var bronzeMedals = 0

d3.csv('main_data.csv').then(function (data) {
  data.forEach(function (row) {
    var medal = row.Medal

    if (medal === 'GOLD') {
      goldMedals++
    } else if (medal === 'SILVER') {
      silverMedals++
    } else if (medal === 'BRONZE') {
      bronzeMedals++
    }

    // all medals
    totalMedals++
  })
  console.log(
    totalMedals,
    goldMedals,
    silverMedals,
    bronzeMedals,
    'check total medals'
  )
  //put all medals on the page

  // document.getElementById('total').innerText = totalMedals;

  let start = 0

  var timerTotal = setInterval(function () {
    if (start < totalMedals) {
      document.getElementById('total').innerText = start + 1
      start = Math.min(start + 11, totalMedals)
    }
  }, 1)

  let start1 = 5000

  var timerTotal = setInterval(function () {
    if (start1 < goldMedals) {
      document.getElementById('gold').innerText = start1 + 1
      start1++
    }
  }, 1)

  var timerTotal = setInterval(function () {
    if (start1 < silverMedals) {
      document.getElementById('silver').innerText = start1 + 1
      start++
    }
  }, 1)

  var timerTotal = setInterval(function () {
    if (start1 < bronzeMedals) {
      document.getElementById('bronze').innerText = start1 + 1
      start++
    }
  }, 1)
})



//dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
//to county all medals by country

d3.csv('main_data.csv').then(function(data) {
  const countries = {};

  data.forEach(function(d) {
    const country = d.team;
    const medal = d.Medal;
    if (!countries[country]) {
      countries[country] = {
        totalMedals: 0,
        goldMedals: 0,
        silverMedals: 0,
        bronzeMedals: 0,
        points: 0,
      };
    }
    countries[country].totalMedals++;
    if (medal === "GOLD") {
      countries[country].goldMedals++;
    } else if (medal === "SILVER") {
      countries[country].silverMedals++;
    } else if (medal === "BRONZE") {
      countries[country].bronzeMedals++;
    }
    // Calculate points based on medals
    countries[country].points =
      countries[country].goldMedals * 3 +
      countries[country].silverMedals * 2 +
      countries[country].bronzeMedals;
  });

  const sortedCountries = Object.entries(countries)
    .sort((a, b) => b[1].points - a[1].points)
    .slice(0, 5);

  // Select the existing #countries-top-medals section
  const countriesTopMedals = d3.select('#countries-top-medals');

  // Append divs for the top 5 countries with class based on index (0 for the first, 1 for the second, and so on)
  d3.select('#countries-top-medals')
  .selectAll('div')
  .data(sortedCountries)
  .enter()
  .append('div')
  .attr('class', (d, i) => `country${i} countrybarre`)
  .style('width', '180px')
  .style('height', (d, i) => `${(6-i) * 65}px`)
  .style('border-radius', '5px 5px 0 0')
  .html((d, i) => {
    return ` <span class="place">${i+1}</span> <span class="topcon">${d[0]}</span> <span class="toppoints">${d[1].points} points</span> <span class="totalmedalstop">${d[1].totalMedals} medals</span>  <div class='medalsoftop'><span class="topgold">${d[1].goldMedals} gold</span> <span class="topsilver">${d[1].silverMedals} silver</span> <span class="topbronze">${d[1].bronzeMedals} bronze</span></div>`;
  })
  .style('color', 'black');
});

//ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

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

  ///input/////////////////////

  var years = data
    .map(d => d.year) // Фильтруем только уникальные значения из столбца 'year'
    .filter((value, index, self) => self.indexOf(value) === index)

  // Минимум и максимум только из отфильтрованных данных
  var minYear = d3.min(years)
  console.log(minYear)
  var maxYear = d3.max(years)
  console.log(maxYear)

  years.sort((a, b) => a - b)
  console.log(years)

  var step = 4

  console.log(step)

  d3.select('#year')
    .attr('min', minYear)
    .attr('max', maxYear)
    .attr('step', step)
}

d3.csv('main_data.csv').then(function (data) {
  aaa(data)
  console.log(medalCountByYear) // check that table is working
  // check that table is working
  var selectedYear = 2000

  var rangeInput = d3.select('#year')
  dessin(selectedYear)
  rangeInput.on('input', function () {
    selectedYear = this.value //take input
    dessin(selectedYear)
  })
  function dessin (selectedYear) {
    console.log('Selected Year:', selectedYear) //check input

    if (selectedYear <= 1994) {
      var step = 4
    }
    if (selectedYear > 1994) {
      var step = 2
    }

    console.log(step)

    d3.select('#year').attr('step', step)

    var dataToBind = Object.entries(medalCountByYear)
    // sorting data
    var sortedData = Object.entries(medalCountByYear)
      .sort((a, b) => {
        const aMedals = a[1][selectedYear]?.medals ?? 0
        const bMedals = b[1][selectedYear]?.medals ?? 0
        return bMedals - aMedals
      })
      .slice(0, 10)

    console.log(sortedData)
    // showing bars with d3
    d3.select('#selected-year').text(selectedYear)

    let maxMedals = 0

    for (let team in medalCountByYear) {
      for (let year in medalCountByYear[team]) {
        const medals = medalCountByYear[team][year].medals
        if (medals > maxMedals) {
          maxMedals = medals
        }
      }
    }

    const maxValue = maxMedals
    console.log(maxValue) // max medals in history by one country

    if (selectedYear == 1916 || selectedYear == 1940 || selectedYear == 1944) {
      d3.select('#section1').selectAll('.barre').remove()
      d3.select('#div-section1').style('display', 'block')
    } else {
      d3.select('#div-section1').style('display', 'none')
      d3.select('#section1')
        .selectAll('.barre')
        .data(sortedData)
        .join(
          enter =>
            enter
              .append('div')
              .attr('class', 'barre')
              .append('div')
              .attr('class', 'label'),
          update => update,
          exit => exit.remove()
        )
      d3.selectAll('.barre')
        .data(sortedData)
        .transition()
        .style('width', d => {
          const medals = d[1][selectedYear]?.medals ?? 0
          return (medals / maxValue) * 200 + '%'
        })
        .style('background', d => {
          return 'linear-gradient(to right, #570047, #A340B2)'
        })
        .style('height', '60px')
        .style('margin', '3px 0px')
        .style('border-radius', '0 25px 25px 0')
        .style('position', 'relative')

      // .style('padding', '17px  0 0 10px')
      d3.select('#section1')
        .selectAll('.label')

        .data(sortedData)
        .transition()
        .style('position', 'absolute')
        .text(d => {
          let name = d[0]
          if (
            name === 'Russian Federation' ||
            name === 'ROC' ||
            name === 'Olympic Athletes from Russia'
          ) {
            name = 'Russia'
          }

          if (name === 'United States of America') {
            name = 'USA'
          }

          if (name === "People's Republic of China") {
            name = 'China'
          }
          if (name === 'German Democratic Republic (Germany)') {
            name = 'GDR (Germany)'
          }
          if (name === 'Federal Republic of Germany') {
            name = 'FRG (Germany)'
          }
          if (name === 'Republic of Korea') {
            name = 'South Korea'
          }

    

          return name + ', ' + d[1][selectedYear].medals + ' medals'
        })

        .style('top', '14px')
        .style('color', d => {
          const qty = d[1][selectedYear].medals

          if (innerWidth < 1300) {
            if (qty < 40) {
              return `black`
            } else {
              return `white`
            }
          }
          if (innerWidth >= 1300) {
            {
              if (qty < 25) {
                return `black`
              }

              return 'white'
            }
          }
        })
        .style('text-align', 'left')
        .style('left', d => {
          const qty = d[1][selectedYear].medals
          console.log(qty, parent.innerWidth)
          if (innerWidth < 1300) {
            if (qty < 40) {
              return `${(parent.innerWidth * qty) / 170}px`
            } else {
              return '12px'
            }
          }
          if (innerWidth >= 1300) {
            {
              if (qty < 25) {
                return `${(parent.innerWidth * qty) / 170}px`
              }

              return '12px'
            }
          }
        })

        .style('white-space', 'nowrap')

      // .text(d => )
    }
  }
})

// SECTION 2 dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

var bronzeSilverGold = {} // Iable who has all data about medals of last olympic game and chosen teams

var allowedTeams = [
  //places of last olympic games
  'Japan',
  'Republic of Korea',
  'Brazil',
  'Russian Federation',
  'ROC',
  'Great Britain',
  'Canada',
  "People's Republic of China",
  'Italy',
  'Greece',
  'United States',
  'Australia',
  'Japan',
  'United States of America',
  'Norway',
  'France'
]

var teamAliases = {
  'Russian Federation': 'Russia',
  ROC: 'Russia',
  'Olympic Athletes from Russia': 'Russia'
}

d3.csv('main_data.csv').then(function (data) {
  data.forEach(function (row) {
    var year = row.year
    var team = row.team
    var medal = row.Medal

    // Check if the year is greater than or equal to 1994 and the team is in the allowedTeams list
    if (
      year >= 1994 &&
      (medal === 'GOLD' || medal === 'SILVER' || medal === 'BRONZE') &&
      allowedTeams.includes(team)
    ) {
      // put together  "Russian Federation" and "ROC" under "Russia"
      if (teamAliases[team]) {
        team = teamAliases[team]
      }

      if (!bronzeSilverGold[team]) {
        bronzeSilverGold[team] = {}
      }

      // Add missing years
      var startYear = 1994
      var endYear = 2022
      for (var i = startYear; i <= endYear; i++) {
        if (!bronzeSilverGold[team][i]) {
          bronzeSilverGold[team][i] = {
            Gold: 0,
            Silver: 0,
            Bronze: 0
          }
        }
      }

      if (medal === 'GOLD') {
        bronzeSilverGold[team][year].Gold++
      } else if (medal === 'SILVER') {
        bronzeSilverGold[team][year].Silver++
      } else if (medal === 'BRONZE') {
        bronzeSilverGold[team][year].Bronze++
      }
    }
  })

  console.log(bronzeSilverGold, 'HERE MEDALS')

  // Get a list of all countries (teams) from the data
  var countries = Object.keys(bronzeSilverGold)
  console.log(countries, 'countries')

  var select = d3.select('#selectedTeam')
  select
    .selectAll('option')
    .data(countries)
    .enter()
    .append('option')
    .text(function (d) {
      return d
    })
    .attr('value', function (d) {
      return d
    })
    .property('selected', function (d) {
      return d === 'Greece'
    })

  //to make graph responsive
  let newWidth = window.innerWidth

  d3.select(window).on('resize', () => {
    // Get the new width of the browser window
    const newSize = window.innerWidth

    if (newSize < 1024) {
      newWidth = 1024
    } else {
      newWidth = newSize
    }

    console.log(newWidth, 'newWidth')
 
    updateStreamgraph()
  })

  function updateStreamgraph () {
    var selectedTeam = d3.select('#selectedTeam').property('value')

    // Clear the existing graph
    d3.select('#section3').select('svg').remove()

    var data = Object.entries(bronzeSilverGold[selectedTeam]).map(
      ([year, medals]) => ({
        year: year,
        Bronze: medals.Bronze,
        Silver: medals.Silver,
        Gold: medals.Gold
      })
    )

    var data = Object.entries(bronzeSilverGold[selectedTeam]).map(
      ([year, medals]) => ({
        year: year,
        Bronze: medals.Bronze,
        Silver: medals.Silver,
        Gold: medals.Gold
      })
    )

    var svg = d3
      .select('#section3')
      .append('svg')
      .attr('width', newWidth + 100)
      .attr('height', 470)

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.Bronze + d.Silver + d.Gold)])
      .range([400, 10])

    var xScale = d3
      .scaleBand()
      .domain(data.map(d => d.year))
      .range([newWidth / 22.5 - 1, newWidth - 100])
      .padding(1)

    var colorScale = d3
      .scaleOrdinal()
      .domain(['Gold', 'Silver', 'Bronze'])
      .range(['#f3ea65', '#d6d6d6', '#e9a477'])

    var areaBronze = d3
      .area()
      .x(d => xScale(d.year))
      .y0(d => yScale(0))
      .y1(d => yScale(d.Bronze))
      .curve(d3.curveCatmullRom)

    var areaSilver = d3
      .area()
      .x(d => xScale(d.year))
      .y0(d => yScale(d.Bronze))
      .y1(d => yScale(d.Bronze + d.Silver))
      .curve(d3.curveCatmullRom)

    var areaGold = d3
      .area()
      .x(d => xScale(d.year))
      .y0(d => yScale(d.Bronze + d.Silver))
      .y1(d => yScale(d.Bronze + d.Silver + d.Gold))
      .curve(d3.curveCatmullRom)

    svg
      .append('path')
      .datum(data)
      .attr('d', areaBronze)
      .attr('fill', colorScale('Bronze'))
      .attr('transform', 'translate(0, 0)')

    svg
      .append('path')
      .datum(data)
      .attr('d', areaSilver)
      .attr('fill', colorScale('Silver'))

    svg
      .append('path')
      .datum(data)
      .attr('d', areaGold)
      .attr('fill', colorScale('Gold'))

    var xAxis = d3.axisBottom(xScale)
    svg
      .append('g')
      .attr('transform', 'translate(0, 400)')
      .call(xAxis)
      .attr('stroke-width', 1)

    var yAxis = d3.axisLeft(yScale)
    svg.append('g').attr('transform', 'translate(65, 0)').call(yAxis)

    console.log('Updated streamgraph for team: ' + selectedTeam)

    const gamesByCountry = {
      Norway: [
        {
          year: 1994,
          city: 'Lillehammer',
          season: 'Winter',
          fact: 'The Lillehammer Winter Olympics were held just two years after the end of the Cold War and the dissolution of the Soviet Union. It was the first Winter Olympics since the 1980 Lake Placid Games to take place without a boycott or major international political conflict, signifying a more peaceful era for international sporting events.'
        }
      ],
      'United States of America': [
        {
          year: 1996,
          city: 'Atlanta',
          season: 'Summer',
          fact: 'The 1996 Olympics marked the centennial celebration of the modern Olympic Games, as the first modern Olympics were held in Athens in 1896. The Atlanta Games were seen as a tribute to the origins of the Olympic movement. For the first time in Olympic history, all 197 of the National Olympic Committees (NOC) were represented at the Olympics. That same year, Italian archer Paola Fantato became the first athlete to compete in the Olympic and Paralympic Games in the same year.'
        },
        {
          year: 2002,
          city: 'Salt Lake City',
          season: 'Winter',
          fact: 'Due to concerns about the reliability of natural snow in the region, the Salt Lake City Olympics used extensive snowmaking and grooming equipment to ensure suitable conditions for the events. It was one of the early instances of such extensive snowmaking efforts in Olympic history. After 2002 the Olympic Charter added a new idea: legacy. It means the Olympics should not just be a sports event, but also help cities grow and benefit society. Now, cities wanting to host the Olympics need a long-term plan to be chosen by the International Olympic Committee.'
        }
      ],
      Japan: [
        {
          year: 1998,
          city: 'Nagano',
          season: 'Winter',
          fact: 'Snowboarding made its debut as an official Olympic sport at the Nagano Games. The inclusion of snowboarding represented a significant step toward embracing more modern and youth-oriented sports in the Olympic program.'
        },
        {
          year: 2020,
          city: 'Tokyo',
          season: 'Summer',
          fact: 'The 2020 Tokyo Olympics marked the first time in Olympic history that the Games were postponed. They were rescheduled to 2021 due to the global COVID-19 pandemic. To mitigate the spread of COVID-19, the Tokyo Olympics were held with minimal spectators. Most events took place in empty arenas, and fan attendance was limited. The medals for the Olympic Games are made from recycled materials.'
        }
      ],
      Australia: [
        {
          year: 2000,
          city: 'Sydney',
          season: 'Summer',
          fact: "At the Olympic Games in Sydney, North and South Korea marched together under the same flag at the opening ceremony. This was an unprecedented symbol of peace since diplomatic relations between the two states had ended after the Korean War of 1950 to 1953. The 2000 Olympics saw numerous world records and memorable athletic performances, including American swimmer Michael Phelps' debut at the age of 15."
        }
      ],
      Greece: [
        {
          year: 2004,
          city: 'Athens',
          season: 'Summer',
          fact: 'The Iraqi football team stunned at the Games in Athens. Despite the war ravaging their country, the team reached the semi‑finals of the tournament, offering a brief distraction for Iraqis and the entire world from their country’s dramatic situation. That same year was the first time that the Olympic torch relay, after leaving Olympia, crossed every habitable continent before returning to Greece.'
        }
      ],
      Italy: [
        {
          year: 2006,
          city: 'Turin',
          season: 'Winter',
          fact: "In a symbolic gesture of peace, North and South Korea marched together under a unified flag during the Opening Ceremony. They also fielded a unified women's ice hockey team, marking a rare moment of cooperation between the two countries. 39-year-old skeleton racer Duff Gibson became the oldest athlete in the history of the Winter Games to win gold in an individual sport."
        }
      ],
      "People's Republic of China": [
        {
          year: 2008,
          city: 'Beijing',
          season: 'Summer',
          fact: "Jamaican sprinter Usain Bolt made a historic mark in athletics by setting world records in the 100m and 200m sprints. His performances were not only record-breaking but also charismatic, making him a global sports superstar. For the first time, all the snow used for the Olympics will be artificial. American swimmer Michael Phelps had a remarkable Games, winning eight gold medals in swimming, breaking Mark Spitz's record of seven golds in a single Olympics."
        },
        {
          year: 2022,
          city: 'Beijing',
          season: 'Winter',
          fact: 'The 2022 Winter Olympics were the most gender-balanced Winter Olympics in history, with 45.44% of athletes being female. The 2022 Winter Olympics were also notable for the use of technology. For example, the Games used artificial intelligence to help with judging and to provide real-time data to athletes and coaches. The 2022 Winter Olympics were also the first Winter Olympics to feature a dedicated esports competition. The competition was held in the lead-up to the Games and featured athletes from around the world competing in the popular winter sports video game Snowboarding the Next Phase.'
        }
      ],
      Canada: [
        {
          year: 2010,
          city: 'Vancouver',
          season: 'Winter',
          fact: 'The first summer version of the Youth Olympic Games took place in 2010, with the first winter version taking place in 2012 — proof of the Olympic movement’s strong commitment to youth and education.'
        }
      ],
      'Great Britain': [
        {
          year: 2012,
          city: 'London',
          season: 'Summer',
          fact: "The medals of the London Games became the largest in history, with a diameter of about 85 millimeters, a thickness of 7 millimeters, and each weighing approximately 375 to 400 grams. The Olympic Stadium in London has a capacity of 80,000 seats and is the lightest stadium in Olympic history. It used around 10,000 tons of steel in its construction, making it 75% lighter than the Olympic Stadium in Beijing. The 2012 Olympics marked the introduction of women's boxing as an official Olympic sport. Female boxers from various countries competed in the inaugural tournament."
        }
      ],
      Russia: [
        {
          year: 2014,
          city: 'Sochi',
          season: 'Winter',
          fact: "Several events made their Olympic debut in Sochi, including women's ski jumping, team figure skating, and snowboard slopestyle. These additions reflected the evolving nature of the Winter Olympics. For the Winter Olympics in Sochi, a record number of medals in the history of winter sports competitions was produced, specifically 1,300 medals."
        }
      ],
      Brazil: [
        {
          year: 2016,
          city: 'Rio',
          season: 'Summer',
          fact: 'The 2016 Rio Olympics were the first-ever Olympic Games to be hosted in South America. Golf returned to the Olympic Games after a 112-year hiatus. The International Olympic Committee decided to reintroduce this sport, which had last been contested in 1900 and 1904.'
        }
      ],
      'Republic of Korea': [
        {
          year: 2018,
          city: 'PyeongChang',
          season: 'Winter',
          fact: 'A record 92 countries participated in the Winter Olympics, demonstrating the global appeal and inclusivity of the event.'
        }
      ]
    }

    var selectedTeam = d3.select('#selectedTeam').property('value')

    // Check if the selected team is "France"
    if (selectedTeam === 'France') {
      d3.select('#host').html(
        '<p>Last time that france were hosting the Olympic games was 1992. She was shared her duties with Spain. <br> The moment when the results of Olympic games 2024 in Paris will be avaliabe, new data will be added to this analyse</p>'
      )
    }

    // Find the year for the selected team
    let selectedGames = gamesByCountry[selectedTeam]

    // Check if a matching game is found

    if (selectedGames) {
      var content = '' // Initialize the content variable outside the loop

      selectedGames.forEach(game => {
        // Use game.year, game.city, etc., for each game
        var selectedYear = game.year
        var selectedCity = game.city
        var selectedSeason = game.season
        var selectedFact = game.fact

        content += `
        <p><span id="host-country">${selectedTeam}</span> hosted ${selectedSeason} Olympic Games in ${selectedCity} in <span id="year-host">${selectedYear} </span> </p> <br<br><div class="fact"> <p>${selectedFact}</p></div>
      `

        // Append the new div with the content
        //     d3.select('#host').append('div').html(`
        //   <p><span id="host-country">${selectedTeam}</span> hosted ${selectedSeason} Olympic Games in ${selectedCity} in <span id="year-host">${selectedYear}</span> </p> <div class="fact"> <p>${selectedFact}</p></div>
        // `)

        console.log(
          'Updated streamgraph for team: ' +
            selectedTeam +
            ' in year: ' +
            selectedYear
        )
        var tickText = d3.selectAll('#section3 .tick text')
        console.log(tickText, 'texts')

        var selectedYears = selectedGames.map(game => game.year)

        tickText.each(function () {
          var tickYear = parseInt(d3.select(this).text()) // Parse the text content as an integer
          if (selectedYears.includes(tickYear)) {
            // Apply your condition if the tick year matches any of the selected years
            d3.select(this)
              .attr('font-size', '1.2rem')
              .attr('font-weight', '700')
              .attr('transform', 'translate(0,10)')
          } else {
            // Apply a different style or condition for non-matching years
            d3.select(this)
              .attr('font-size', '.7rem')
              .attr('font-weight', 'normal')
          }
        })
      })

      // Remove existing content inside the "host" element
      d3.select('#host').html('')

      // Set the accumulated content after the loop is complete
      d3.select('#host').html(content)
    }
  }

  // Initial update to show the streamgraph for the default selected team
  updateStreamgraph()

  // Add an event listener to the select element
  d3.select('#selectedTeam').on('change', updateStreamgraph)

})

//dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

fetch('hosting.json')
  .then(response => response.json())
  .then(data => {
    // Count the occurrences of each country
    var locationCount = {}
    data.forEach(function (d) {
      if (locationCount[d.game_location]) {
        locationCount[d.game_location]++
      } else {
        locationCount[d.game_location] = 1
      }
    })

    //   top 5 countries
    var topLocations = Object.entries(locationCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
    console.log(topLocations)

    // Create the bar chart
    var chart = d3.select('#chart')

    chart
      .selectAll('div.bar')
      .data(topLocations)
      .enter()
      .append('div')
      .attr('class', 'bar')
      .style('width', '11%')
      .style('height', d => `${d[1] * 60}px`)
      .style('background', d => {
        return 'linear-gradient(to top, #6d494a, #bb4545)'
      })
      .style('padding', '5px')
      .style('margin', '1px')
      .style('border-radius', ' 5px 5px 0 0')
      .html(
        d =>
          `<div class="inscr"><span class="country">${d[0]}</span> <span class="count">${d[1]}</span></div>`
      )

    chart
      .selectAll('div.bar')
      .style('background-color', 'red')
      .style('color', 'white')
      .style('margin-bottom', '5px')
  })

//dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

d3.csv('main_data.csv').then(function (data) {
  var athleteMedals = {}

  data.forEach(function (d) {
    var athlete = d.athlete
    var sport = d.discipline_title
    var medal = d.Medal
    var country = d.team
    var url = d.athlete_url

    if (athlete) {
      if (!athleteMedals[athlete]) {
        athleteMedals[athlete] = {
          total: 0,
          sports: {},
          goldMedals: 0,
          silverMedals: 0,
          bronzeMedals: 0,
          countries: {},
          url: url // Store the URL for the athlete
        }
      }
      athleteMedals[athlete].total++
      athleteMedals[athlete].sports[sport] =
        (athleteMedals[athlete].sports[sport] || 0) + 1
      if (medal === 'GOLD') {
        athleteMedals[athlete].goldMedals++
      } else if (medal === 'SILVER') {
        athleteMedals[athlete].silverMedals++
      } else if (medal === 'BRONZE') {
        athleteMedals[athlete].bronzeMedals++
      }
      athleteMedals[athlete].countries[country] =
        (athleteMedals[athlete].countries[country] || 0) + 1
    }
  })

  var topAthletes = Object.keys(athleteMedals)
    .sort(function (a, b) {
      return athleteMedals[b].total - athleteMedals[a].total
    })
    .slice(0, 10)

  topAthletes.forEach(function (athlete) {
    d3.select('#top-athlets')
      .append('li')
      .html(
        `<div class="sportsman">
          <a href="${
            athleteMedals[athlete].url
          }"><span>${athlete}</span> from ${Object.keys(
          athleteMedals[athlete].countries
        ).join(', ')} won ${
          athleteMedals[athlete].total
        } medals </a> <div class="circle-total"> <span class="circle-gold">${
          athleteMedals[athlete].goldMedals
        }</span>   <span class="circle-silver">${
          athleteMedals[athlete].silverMedals
        } </span>   <span class="circle-bronze"> ${
          athleteMedals[athlete].bronzeMedals
        } </span></div>
          </div>`
      )
  })
})


