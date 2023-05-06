import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  addEdge,
  Handle,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import CustomEdge from "./CustomEdge";

import { useSelector, useDispatch } from "react-redux";
import { addNode, removeNode, addEdges, removeEdge } from "./graphSlice";


const CustomNode = ({ data, id }) => {
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const dispatch = useDispatch();
  const handleRemove = (nodeId) => {
    alert("Node Removal Request! for "+ nodeId);
    dispatch(removeNode(nodeId));
  };
  return (
    <div
      className="custom-node"
      onMouseEnter={() => setShowCloseIcon(true)}
      onMouseLeave={() => {
        setShowCloseIcon(false);
      }}
    >
      {data.label}
      {showCloseIcon && (
        <div
          className="close-icon"
          onClick={() => {
            handleRemove(id);
          }}
        >
          x
        </div>
      )}
      <Handle type="source" position="bottom" />
      <Handle type="target" position="top" />
    </div>
  );
};

const edgeTypes = {
  customedge: CustomEdge,
};
const nodeTypes = {
  custom: (props) => <CustomNode {...props} />,
};

export default function App() {
  const nodes = useSelector((state) => state.graph.nodes);
  const branches = useSelector((state) => state.graph.edges);
  const [elements, setElements] = useState(nodes);
  const [edges, setEdges] = useState(branches);
  const dispatch = useDispatch();

  console.log("Redux Store Node Data:",nodes);
  console.log("Redux Store Branch Data:",branches);

  const onNodesChange = useCallback(
    (changes) => setElements((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

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
      type: "custom",
      data: { label: newNodeId },
      position: {
        x: Math.floor(Math.random() * 500) + 50,
        y: Math.floor(Math.random() * 200) + 50,
      },
    };
    setElements((els) => els.concat(newNode));
    dispatch(addNode(newNode));
  };

  return (
    <>
        <div style={{ height: "100vh", width: "100vw" }}>
          <button onClick={handleCreateNode} className="create-node__btn">
            Create Node
          </button>
          <ReactFlow
            nodes={elements}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            snapToGrid={true}
            edgeTypes={edgeTypes}
          >
            <Background />
            <Controls showInteractive={false}>
              <button></button>
            </Controls>
          </ReactFlow>
        </div>
    </>
  );
}
