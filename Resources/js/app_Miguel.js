
var svgWidth = 900;
var svgHeight = 300;

var margin = {
    top: 20, 
    right: 75, 
    bottom: 60, 
    left: 75};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

//var parseTime = d3.timeParse("%Y");

// Get the data
d3.csv("../Resources/data/yearlyCoin.csv").then(function(data) {

    data.forEach(function(d) {
        d.date_part = +d.date_part;
        d.bitcoin = +d.bitcoin;
        d.litecoin = +d.litecoin;
        d.etherium = +d.etherium;
        d.doge = +d.doge;
    });

    var xValue = (d) => {return d.date_part;},
        xScale = d3.scaleLinear().range([0, width]),
        xAxis = d3.axisBottom(xScale);
    
    var yValue, 
        yScale, 
        yAxis;


    function featureSelection(dataColumn){
        yValue = (d) => {return d[dataColumn];},
        yScale = d3.scaleLinear().range([height, 0]),
        yAxis = d3.axisLeft(yScale);
    }

    var currentAxisLabelY0 = 'bitcoin'
    featureSelection(currentAxisLabelY0);

    var x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.date_part))
        .range([0, width]);
    var y0 = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.bitcoin)])
        .range([height, 0]);
    var y1 = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.litecoin)])
        .range([height, 0]);


    var valueline = d3.line()
        .x(function(d) { return x(d.date_part); })
        .y(function(d) { return y0(d.bitcoin); });
        
    var valueline2 = d3.line()
        .x(function(d) { return x(d.date_part); })
        .y(function(d) { return y1(d.litecoin); });




    var xAxis = d3.axisBottom(x).tickFormat(d3.format("d")).ticks(5);

    var yAxisLeft = d3.axisLeft(y0);

    var yAxisRight = d3.axisRight(y1);

    // Scale the range of the data


    chartGroup.append("path")        // Add the valueline path.
        .style("stroke", "goldenrod")
        .style("fill","none")
        .attr("d", valueline(data));


    chartGroup.append("path")        // Add the valueline2 path.
        .style("stroke", "green")
        .style("fill","none")
        .attr("d", valueline2(data));

    chartGroup.append("g")            // Add the X Axis
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chartGroup.append("g")
        .attr("class", "y axis")
        .style("font-size", "12px")
        .style("fill", "goldenrod")
        .call(yAxisLeft);	

    chartGroup.append("g")				
        .attr("class", "y axis")
        .style("font-size", "12px")	
        .attr("transform", "translate(" + width + " ,0)")	
        .style("fill", "green")		
        .call(yAxisRight);
    
    chartGroup.append("text")
        .attr("transform", "translate(" + -margin.left*2/6 + "," + height/2 + ") rotate(270)")
        .attr("class", "axis-text active")
        .attr("data-axis-name", "bitcoin")
        .text("Bitcoin");

    chartGroup.append("text")
        .attr("transform", "translate(" + -margin.left*2/6 + "," + height/2 + ") rotate(270)")
        .attr("class", "axis-text inactive")
        .attr("data-axis-name", "doge")
        .text("Doge")

    chartGroup.append("text")
        .attr("transform", "translate(" + -margin.left*2/6 + "," + height/2 + ") rotate(270)")
        .attr("class", "axis-text inactive")
        .attr("data-axis-name", "etherium")
        .text("Etherium")

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Year");

    
    function labelChange(clickedAxis){
        d3.selectAll(".axis-text")
            .filter(".active")
            .classed("active", false)
            .classed("inactive", true);
        
        clickedAxis.classed("inactive", false).classed("active", true);
    }

    d3.selectAll(".axis-text").on("click", function(){
        var clickedSelection = d3.select(this);

        var isClickedSelectionInactive = clickedSelection.classed("inactive");

        var clickedAxis = clickedSelection.attr("data-axis-name");

        if (isClickedSelectionInactive){
            currentAxisLabelY0 = clickedAxis;
            featureSelection(currentAxisLabelY0);

            yScale.domain([d3.min(data, yValue)-1, d3.max(data,yValue)+1]);

            svg.select(".y-axis")
                .transition()
                .duration(1800)
                .call(yAxis);

            d3.selectAll(".dot").each(function (){
                d3.select(this)
                    .transition()
                    .attr("cy", (d) => {
                        return yScale(+d[currentAxisLabelY0]);
                    })

                    .duration(1800);
            });


            d3.selectAll(".state").each(function (){
                d3.select(this)
                .transition()
                .attr("y", (d) => {
                    return yScale(+d[currentAxisLabelY0]);
                })

                .duration(1800);
            });

            labelChange(clickedSelection);
        }

        
    })
    // THIS IS WHERE I LEFT OFF IN THE FILTER BUTTON*************************** 
    //ITS JUST BASIC CODE WE JUST NEED TO CHANGE IT ARROUND. 
//toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
//   }
  
//   function filterFunction() {
//     var input, filter, ul, li, a, i;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     div = document.getElementById("myDropdown");
//     a = div.getElementsByTagName("a");
//     for (i = 0; i < a.length; i++) {
//       txtValue = a[i].textContent || a[i].innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         a[i].style.display = "";
//       } else {
//         a[i].style.display = "none";
//       }
//     }
//   }
 });


$(document).ready(function () {
    //Pagination full Numbers
    $('#paginationFullNumbers').DataTable({
      "pagingType": "full_numbers",
      "pageLength": 50
    });
  });