import { useCallback, useEffect, useRef, useState } from "react";
import { getCoordinates } from "../action";


const DraggableBlock = ({content,position,setPosition,isCorrect,correctAnswer,matches,isDropped}) => {
    const isDraggingRef = useRef(null);
    const initialPositionRef = useRef({x:0,y:0});
    const isMatched = Boolean(matches[content]);
   
    function dragStart(e) {
      if (isDropped || isMatched ) return
        e.dataTransfer.setData("text/plain",content);
        const {clientX , clientY} = getCoordinates(e);
        initialPositionRef.current = {
            x: clientX - position.x,
            y: clientY - position.y,
        }
        isDraggingRef.current = true;
    }

  function handleTouchStart(e) {
    if (isDropped || isMatched) return
    if (!isCorrect) return; 
    const { clientX, clientY } = getCoordinates(e);
    initialPositionRef.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
    isDraggingRef.current = true;
  }

  
   function dragContinue(e) {
     if (!isDraggingRef.current || isDropped ||   isMatched) return
     const {clientX, clientY} = getCoordinates(e);
     setPosition({
        x:clientX - initialPositionRef.current.x,
        y: clientY - initialPositionRef.current.y
     })
   }

   function dragStops() {
    isDraggingRef.current = false;
   }

   useEffect(() => {
    if (!isDropped || !isMatched) {
      document.addEventListener("mousemove", dragContinue);
      document.addEventListener("touchmove", dragContinue, { passive: false });
      document.addEventListener("mouseup", dragStops);
      document.addEventListener("touchend", dragStops);
    }
   

    return () => {
      document.removeEventListener("mousemove", dragContinue);
      document.removeEventListener("touchmove", dragContinue);
      document.removeEventListener("mouseup", dragStops);
      document.removeEventListener("touchend", dragStops);

      isDraggingRef.current = false;
    };

  }, [isMatched]);


  
  return(
    <div className=" relative h-20 w-[44%] bg-gray-100 rounded-xl">
      <div
       draggable={!isDropped && !isMatched}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: `${isMatched ? "default" : "move"}`,
          userSelect: "none",
          touchAction: "none",
        }}
        onDragStart={dragStart}
        onTouchStart={handleTouchStart}
        data-droppable={content}
        className={`absolute dragable
          ${isDropped && !isMatched ?  "border-3 border-dashed border-gray-500 bg-red-200 text-amber-400": ""}
          text-[0.8rem] dragable p-4 lg:text-sm h-20 w-full text-center grid place-items-center rounded-xl shadow-md ${
          isDropped || isMatched ? "bg-green-100 border-2 border-dashed border-gray-500 text-black" : "bg-[#282828] text-white"
        }`}
      >
      {content}
    </div>
    </div>
    
   
  )
}

export default DraggableBlock