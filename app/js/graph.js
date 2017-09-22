'use strict'

const chartHeight = 800,
		  chartWidth = 800,
		  nodeHeight = 15,
		  nodeWidth = 20

const svg = d3.select("#svgchart")
svg.attr("height", chartHeight)
	 .attr("width", chartWidth)

// create a new simulation:
const simulation = d3.forceSimulation()
				// many-body force (force applied amongst all nodes, negative strength for repulsion):
				.force("charge", d3.forceManyBody().strength(-40).distanceMax(150))
				// centering force (mean position of all nodes):
				.force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2)) 
				// link force (pushes linked nodes together or apart according to the desired link distance):
				.force("link", d3.forceLink())

const url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json'
d3.json(url, (error, data) => {
	if (error) throw error
	const nodes = data.nodes
	const links = data.links

	// add links (lines):
	const link = svg.append("g")
					      .attr("class", "links")
					    .selectAll("line")
					    .data(links)
					    .enter().append("line") // line to connect nodes
					      .attr("stroke-width", 1) // line width

	// add nodes (rects):
	const node = svg.append("g")
					      .attr("class", "nodes")
					    .selectAll("rect")
					    .data(nodes)
					    .enter().append("rect")
					    	.attr("width", nodeWidth)
					    	.attr("height", nodeHeight)
					    	.attr("fill", "black")
					    	.call(d3.drag()
					    		.on("start", () => simulation.restart())
					    	)

  simulation
  	.nodes(nodes)
  	.on("tick", () => {
  		// set start (x1,y1) and point (x2,y2) coordinate of each link on each tick of the simulation:
  		link.attr("x1", d => d.source.x)
  		link.attr("y1", d => d.source.y)
  		link.attr("x2", d => d.target.x)
  		link.attr("y2", d => d.target.y)
  		// set each node's position on each tick of the simulation:
  		node.attr("x", d => d.x)
  		node.attr("y", d => d.y)
  	})

  // pass the links to the link force:
  simulation
  	.force("link")
  	.links(links)
  		.distance(25)
})
