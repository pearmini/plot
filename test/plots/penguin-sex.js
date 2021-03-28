import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

export default async function() {
  const data = await d3.csv("data/penguins.csv", d3.autoType);
  return Plot.plot({
    marks: [
      Plot.barY(data, Plot.groupX({y: "count"}, {x: "sex"})),
      Plot.ruleY([0])
    ]
  });
}