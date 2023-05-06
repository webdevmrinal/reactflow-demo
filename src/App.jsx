import { useCallback, useMemo, useState } from "react";
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

const CustomNode = ({ data, id, onRemove }) => {
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  console.log(id);
  const handleRemove = () => {
    onRemove(id);
    alert("yay!");
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
        <div className="close-icon" onClick={handleRemove}>
          x
        </div>
      )}
      <Handle type="source" position="bottom" />
      <Handle type="target" position="top" />
    </div>
  );
};

const edge = [];
const edgeTypes = {
  customedge: CustomEdge,
};

export default function App() {
  const [elements, setElements] = useState([]);
  const [edges, setEdges] = useState([]);
  const [clickedElement, setClickedElement] = useState(null);

  const onElementClick = useCallback((event, element) => {
    setClickedElement(element);
  }, []);
  const onClickElementDelete = useCallback(() => {
    const allEdges = elements.filter((element) => isEdge(element));
    const edgesToRemove = getConnectedEdges([clickedElement], allEdges);

    setElements((els) =>
      els.filter((el) => ![clickedElement, ...edgesToRemove].includes(el))
    );

    setClickedElement(null);
  }, [elements, clickedElement]);
  const onNodesChange = useCallback(
    (changes) => setElements((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  console.log(edges);

  const handleNodeRemove = (nodeId) => {
    setElements((els) => deleteElements({ nodes: [{ id: nodeId }] }, els));
  };

  const nodeTypes = useMemo(
    () => ({
      custom: (props) => <CustomNode {...props} />,
    }),
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
          onElementClick={onElementClick}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          snapToGrid={true}
          edgeTypes={edgeTypes}
          attributionPosition="top-right"
          onNodeMouseEnter={(event, node) => {}}
          onEdgeMouseEnter={() => {}}
          onEdgeMouseLeave={() => {}}
        >
          <Background />
          <Controls showInteractive={false}>
            <button onClick={onClickElementDelete}></button>
          </Controls>
        </ReactFlow>
      </div>
    </>
  );
}
