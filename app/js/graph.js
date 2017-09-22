'use strict'

const url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json'
$.getJSON(url, (json, textStatus) => {
	const nodes = json.nodes
	const links = json.links

	const chartHeight = 800
	const chartWidth = 800
	
})
