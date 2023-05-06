import { getBezierPath } from "reactflow";
import "./CustomEdge.css";
import { useState } from "react";

const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert("edge removal request!");
};
const foreignObjectSize = 40;
export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [showButton, setShowButton] = useState(false);

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        onMouseEnter={() => setShowButton(true)}
      />
      {showButton && (
        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={labelX - foreignObjectSize / 2}
          y={labelY - foreignObjectSize / 2}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div>
            <button
              className="edgebutton"
              onClick={(event) => onEdgeClick(event, id)}
            >
              x
            </button>
          </div>
        </foreignObject>
      )}
    </>
  );
}
