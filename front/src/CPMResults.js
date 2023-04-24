import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import { Link, useLocation } from "react-router-dom";
import "./network.css";

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
      label: `${el.name}`,
      title: `${el.name}\nES: ${data.earlyStart} EF: ${data.earlyFinish}\nR: ${data.slack}`,
    });
  });
  graph.nodes.push({ id: "end", label: "finish" });

  form.forEach((el, index) => {
    //console.log(index)
    const data = calc[index];

    el.dependencies.forEach(function (dependency, index2) {
      // console.log("DEPENDENCJA"+dependency)
      // console.log("ELEMENTACJA"+el.name)
      let prev = calc.find((element) => element.name === dependency);
      let curr = calc.find((element) => element.name === el.name);
      if (typeof prev === "undefined") {
        prev = { critical: true };
      }

      graph.edges.push({
        from: dependency,
        to: el.name,
        ...(prev.critical && curr.critical
          ? { color: "red" }
          : { color: "black" }),
      });
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
  for (let i = 0; i < nodeIdAll.length; i++) {
    const data = calc[i];
    if (!depAll.includes(nodeIdAll[i])) {
      graph.edges.push({
        from: nodeIdAll[i],
        to: "end",
        ...(data.critical ? { color: "red" } : { color: "black" }),
      });
    }
  }
  console.log(graph);

  const options = {
    layout: {
      hierarchical: false,
    },
    // edges: {
    //   color: "#000000",
    // },
    height: "540px",
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  const table = calc.map((element) => {
    return (
      <tr>
        <th>{element.name}</th>
        <th>{element.earlyStart}</th>
        <th>{element.earlyFinish}</th>
        <th>{element.latestStart}</th>
        <th>{element.latestFinish}</th>
        <th>{element.slack}</th>
        <th>{element.critical.toString()}</th>
      </tr>
    );
  });

  return (
    <div className="pt-10">
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
      <div className="flex justify-center pt-10">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <Link to="/">Home</Link>
        </button>
      </div>
      <table>
        {" "}
        <tr>
          <th>Name</th>
          <th>ES</th>
          <th>EF</th>
          <th>LS</th>
          <th>LF</th>
          <th>Slack</th>
          <th>Is critical</th>
        </tr>
        {table}
      </table>
    </div>
  );
};

export default CPMResults;
