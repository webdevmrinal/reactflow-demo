import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import CustomEdge from "./CustomEdge";

const edge = [];
const edgeTypes = {
  customedge: CustomEdge,
};

export default function App() {
  const [elements, setElements, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edge);

  console.log(edges);

  const onConnect = useCallback((params) => {
    console.log(params);
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: "customedge",
          markerEnd: { type: MarkerType.ArrowClosed, color: "#5b6ce9" },
        },
        eds
      )
    );
  }, []);
  
  const handleCreateNode = () => {
    const newNodeId = `node ${elements.length}`;
    const newNode = {
      id: newNodeId,
      data: { label: newNodeId },
      position: {
        x: Math.floor(Math.random() * 500) + 50,
        y: Math.floor(Math.random() * 200) + 50,
      },
    };
    setElements((els) => els.concat(newNode));
  };

  return (
    <>
      <div style={{ height: "100vh", width: "100vw" }}>
        <button onClick={handleCreateNode} className="create-node__btn">
          Create Node
        </button>
        <ReactFlow
          nodes={elements}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          snapToGrid={true}
          edgeTypes={edgeTypes}
          attributionPosition="top-right"
          onNodeMouseEnter={(event, node)=>{}}
          onEdgeMouseEnter={()=>{}}
          onEdgeMouseLeave={()=>{}}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
}
