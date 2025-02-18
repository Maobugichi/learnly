import { div } from "motion/react-client";
import { useCallback, useEffect, useRef, useState } from "react";
import { dragDrop } from "../action";

const DraggableBlock = ({ content, matches,isDraggingEnabled }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const initialPositionRef = useRef({ x: 0, y: 0 });
  const blockRef = useRef(null);

  const handleMouseDown = (event) => {
    if (!isDraggingEnabled) return
    const { clientX, clientY } = getCoordinates(event);
    initialPositionRef.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
    isDraggingRef.current = true;
  };

  // Move the element
  const handleMouseMove = (event) => {
    if (!isDraggingRef.current || !isDraggingEnabled) return;
    const { clientX, clientY } = getCoordinates(event);
    setPosition({
      x: clientX - initialPositionRef.current.x,
      y: clientY - initialPositionRef.current.y,
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const getCoordinates = (event) => {
    return event.touches ? event.touches[0] : event; // Use touch coordinates if available
  };

  
  useEffect(() => {
    if (isDraggingEnabled) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleMouseMove, { passive: false });
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);

      isDraggingRef.current = false;
    };

  }, [isDraggingEnabled]);

  const isMatched = Boolean(matches[content])

  return (
    <div className="relative w-[35%] h-[100px]">
         <div
          ref={blockRef}
          className={`draggable absolute ${
          isMatched ? "bg-green-500" : "bg-[#282828]"
        } text-white text-sm  h-20 w-full text-center grid place-items-center rounded-lg shadow-md`}
          style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              cursor:  `${isDraggingEnabled ? "move" : "default"}`,
              userSelect: "none",
              touchAction: "none", // Disable default touch behavior
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          draggable={isDraggingEnabled}
          onDragStart={(e) => e.dataTransfer.setData("text/plain", content)} // Store block content in data transfer
    >
      {content}
    </div>
    </div>
   
  );
};

// Droppable Piece Component
const DroppablePiece = ({ answer, onDropCheck ,matches }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const draggedContent = event.dataTransfer.getData("text/plain"); 
    console.log(draggedContent)
    if (draggedContent && onDropCheck) {
      onDropCheck(draggedContent, answer); 
      const rect = event.target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - 50; // Adjust for block width
      const centerY = rect.top + rect.height / 2 - 50;

      const block = document.querySelector(`.draggable[data-content="${draggedContent}"]`);
      if (block) {
        block.style.left = `${centerX}px`;
        block.style.top = `${centerY}px`;
      }
    }
  };

  const allowDrop = (event) => {
    event.preventDefault(); 
  };
  const isMatched = Object.values(matches).includes(answer);
  return (
    <div
     className={`droppable bg-${isMatched ? "green-100" : "purple-100"} w-[47%] lg:w-64 h-20 grid place-items-center rounded-lg border-2 border-dashed border-gray-500`}
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      Drop Here: {answer}
    </div>
  );
};

// Parent Component to Manage State and Logic
const DragAndDrop = () => {
  const [matches, setMatches] = useState(() =>
    getStoredValue("matches", {})
  );

  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);

  const validateMatch = useCallback((draggedContent, targetAnswer) => {
    const isCorrect = dragDrop.some(
      (item) => item.block === draggedContent && item.piece === targetAnswer
    );
    if (isCorrect) {
      setMatches((prevMatches) => ({
        ...prevMatches,
        [draggedContent]: targetAnswer,
      }));
    } else {
      console.log("Incorrect!");
      setMatches((prevMatches) => ({
        ...prevMatches,
        [draggedContent]: targetAnswer, // Store the match
      }));
    }

    setTimeout(() => {
        setIsDraggingEnabled(prev => !prev);
      },500)
    
  },[]);

  return (
    <div className="relative min-h-screen bg-green-400  w-full">
      {/* Draggable Blocks */}
      <div className="flex bg-red-400 flex-wrap w-full  lg:w-[60%] mx-auto justify-center items-center gap-7 lg:gap-3.5">
        {dragDrop.map((item, index) => (
          <DraggableBlock
            key={index}
            content={item.block}
            onDropCheck={validateMatch}
            isDraggingEnabled={isDraggingEnabled}
            matches={matches}
          />
        ))}
      </div>

      {/* Droppable Pieces */}
      <div
        className="flex bg-amber-400 flex-wrap-reverse w-full lg:w-[60%] mx-auto justify-center gap-3.5 h-[400px] p-4"
      >
        {dragDrop.map((item, index) => (
          <DroppablePiece
            key={index}
            answer={item.piece}
            onDropCheck={validateMatch}
            matches={matches}
          />
        ))}
      </div>
    </div>
  );
};

export default DragAndDrop;