// set the dimensions and margins of the graph



function plot(n, vals, lim, tix, ax, w, h){
	var data = vals;
	var margin = {
		top: 0, right: 0, bottom: 0, left: 0}

	width = w - margin.left - margin.right,
	height = h - margin.top - margin.bottom;
	// radius = Math.min(width, height) / 2
	radius = width/2;

	// append the svg object to the body of the page
	var svg = d3.select('#graph')
				.append('svg')
				.attr("width", width + margin.left + margin.right)
	    		.attr("height", height + margin.top + margin.bottom);

	d3.select('body').style('background-color','#161a19');

	// radial axes data
	max_limit = lim;
	data_radial = Array.from({length: max_limit}, (_, index) => index + 1);

	var xScale = d3.scaleLinear().domain([0, max_limit]).range([0, radius]);

	var white_lines=0;
	if(ax){
		white_lines = svg.append('g').attr('id','axes_white')
						     .selectAll('g')
							 .data(d3.range(0, 360, 90))
							 .enter().append("g")
							 .attr("transform", function(d) { return "translate("+width/2+" "+height/2+")"+ "rotate(" + -d + ")"; })
							 .attr('stroke', 'white')
							 .attr('stroke-width', '0.6px');

		white_lines.append("line").attr("x2", radius);
	}

	var xAxis = d3.axisBottom(xScale).ticks(max_limit).tickSize(1).tickValues(data_radial);
	// var xAxis = d3.axisBottom(xScale).ticks(max_limit).tickSize(1);

	var xAxisPlot = 0;
	if(tix){
		xAxisPlot = svg.append("g").attr("class", "axis")
									   .attr("transform", `translate(${width/2 + 10},${height/2})`)
						               .call(xAxis)
									   .attr('stroke', 'white')
									   .attr('stroke-width', '0.6px');
	}

	data = data.slice(0,n);

	var data_points = svg.append('g').attr("id", "data")
								 .selectAll('g')
								 .data(data)
								 .enter().append('circle')
								 .attr("transform", `translate(${width/2},${height/2})`)
								 .attr('cx', (d,i) => xScale(d) * Math.cos(d))
								 .attr('cy', (d,i) => -xScale(d) * Math.sin(d))
								 .attr('r','3px')
								 .style('fill', '#00FFFF');
};

// plot(7);
