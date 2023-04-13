import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import { Link } from "react-router-dom";

const CPMResults = () => {
  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  };

  const options = {
    layout: {
      hierarchical: true,
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
