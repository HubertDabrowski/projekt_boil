import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import { Link, useLocation } from "react-router-dom";

const CPMResults = () => {
  const { state } = useLocation();
  const { calc, form } = state;

  const graph = {
    nodes: [{ id: "-", label: "start" }],
    edges: [
      // { from: "1", to: 2 },
      // { from: 1, to: 3 },
      // { from: 2, to: 4 },
      // { from: 2, to: 5 },
    ],
  };

  form.forEach((el, index) => {
    const data = calc[index];
    graph.nodes.push({
      id: el.name,
      label: `${el.name}\nES: ${data.earlyStart} EF: ${data.earlyFinish}\nR: ${data.slack}`,
    });
  });
  graph.nodes.push({ id: "end", label: "finish" });

  form.forEach((el) => {
    el.dependencies.forEach(function (dependency) {
      graph.edges.push({ from: dependency, to: el.name });
    });
  });

  let depAll = [];
  let nodeIdAll = [];
  form.forEach((el) => {
    nodeIdAll.push(el.name);
    el.dependencies.forEach(function (dependency) {
      if (dependency !== "-") depAll.push(dependency);
    });
  });
  console.log(depAll);
  console.log(nodeIdAll);
  for (let i = 0; i < depAll.length; i++) {
    if (!depAll.includes(nodeIdAll[i])) {
      graph.edges.push({ from:nodeIdAll[i] , to: "end" });
    }
  }
  console.log(graph);

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
    height: "540px",
  };

  return (
    <div className="pt-10">
      <Graph graph={graph} options={options} />
      <div className="flex justify-center pt-10">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <Link to="/">Home</Link>
        </button>
      </div>
    </div>
  );
};

export default CPMResults;
