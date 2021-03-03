var selectedCoin;
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 150, bottom: 30, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y0 = d3.scale.linear().range([height, 0]);
var y1 = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var y0Axis = d3.svg.axis().scale(y0)
    .orient("left").ticks(15);

var y1Axis = d3.svg.axis().scale(y1)
    .orient("right").ticks(15);

// Define the line
var valueline = d3.svg.line()	
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y0(d.price); });

var valueline2 = d3.svg.line()	
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.amount)});

// Adds the svg canvas
var svg = d3.select("#lineGraph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("Resources/data/deficit.csv", function(error, data) {
    data.forEach(function(d) {
		d.date = parseDate(d.date2);
        d.amount = +d.amount;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y1.domain([0, d3.max(data, function(d) { return d.amount; })]);
    y0.domain([0, d3.max(data.filter(function(dd) {return dd.coin == 'litecoin';}), function(d) { return '$' +d.price; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line");  

    svg.append("path")
        .style("stroke", "goldenrod")
        .style("fill","none")
        .attr ("class", "line")
        .attr("d", valueline2(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(y0Axis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + " ,0)")
        .call(y1Axis);

});

// ** Update data section (Called from the onclick)
function updateData(selectedCoin) {

	document.getElementById("selectedCoin").innerHTML = selectedCoin;
    // Get the data again
    d3.csv("Resources/data/yearlyCoin2.csv", function(error, data) {
       	data.forEach(function(d) {
	    	d.date = parseDate(d.date);
            d.price = +d.price;
            d.amount = +d.amount;
	    });

    	// Scale the range of the data again 
    	x.domain(d3.extent(data, function(d) { return d.date; }));
	   // y.domain([0, d3.max(data, function(d) { return d.price; })]);
	if (selectedCoin == 'bitcoin' ) {
	 	y0.domain([0, d3.max(data.filter(function(dd) {return dd.coin == 'bitcoin';}), function(d) { return d.price; })]);
	} else if (selectedCoin == 'litecoin' ) {
	 	y0.domain([0, d3.max(data.filter(function(dd) {return dd.coin == 'litecoin';}), function(d) { return d.price; })]);
	} else if (selectedCoin == 'etherium' ) {
	 	y0.domain([0, d3.max(data.filter(function(dd) {return dd.coin == 'etherium';}), function(d) { return d.price; })]);
	} else if (selectedCoin == 'doge' ) {
	 	y0.domain([0, d3.max(data.filter(function(dd) {return dd.coin == 'doge';}), function(d) { return d.price; })]);
	} 

    // Select the section we want to apply our changes to
    var svg = d3.select("#lineGraph").transition();            

	if (selectedCoin == 'bitcoin' ) {
	 	svg.select(".line").duration(750).attr("d", valueline(data.filter(function(dd) {return dd.coin == 'bitcoin';})));
	} else if (selectedCoin == 'litecoin' ) {
	 	svg.select(".line").duration(750).attr("d", valueline(data.filter(function(dd) {return dd.coin == 'litecoin';})));
	} else if (selectedCoin == 'etherium' ) {
	 	svg.select(".line").duration(750).attr("d", valueline(data.filter(function(dd) {return dd.coin == 'etherium';})));
	} else if (selectedCoin == 'doge' ) {
	 	svg.select(".line").duration(750).attr("d", valueline(data.filter(function(dd) {return dd.coin == 'doge';})));
    } 
         
        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(y0Axis);
        svg.select(".y1.axis") // change the y axis
            .duration(750)
            .call(y1Axis);

    });

}