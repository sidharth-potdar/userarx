import * as d3 from "d3";

const height = 600;
const width = 600;
const radius = 32;

const draw = () => {
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("stroke-width", 2);

  const circles = d3.range(20).map(i => ({
    x: Math.random() * (width - radius * 2) + radius,
    y: Math.random() * (height - radius * 2) + radius,
  }));

  svg.selectAll("circle")
    .data(circles)
    .join("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", radius)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
      // .call(drag)
      // .on("click", clicked);

  function clicked(d, i) {
    if (d3.event.defaultPrevented) return; // dragged

    d3.select(this).transition()
        .attr("fill", "black")
        .attr("r", radius * 2)
      .transition()
        .attr("r", radius)
        .attr("fill", d3.schemeCategory10[i % 10]);
  }

  return svg.node();
}

export default draw;
