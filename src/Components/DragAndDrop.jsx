import { useCallback, useEffect, useRef, useState } from "react";
import { getCoordinates } from "../action";


const DraggableBlock = ({content,position,setPosition,isCorrect,correctAnswer,matches}) => {
    const isDraggingRef = useRef(null);
    const initialPositionRef = useRef({x:0,y:0});
    function dragStart(e) {
        e.dataTransfer.setData("text/plain",content)
        const {clientX , clientY} = getCoordinates(e)
        initialPositionRef.current = {
            x: clientX - position.x,
            y: clientY - position.y,
        }
        isDraggingRef.current = true;
    }

  function handleTouchStart(e) {
    if (!isCorrect) return; // Prevent dragging if not allowed
    const { clientX, clientY } = getCoordinates(e);
    initialPositionRef.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
    isDraggingRef.current = true;
  }

  
   function dragContinue(e) {
     if (!isDraggingRef.current) return
     const {clientX, clientY} = getCoordinates(e)
     setPosition({
        x:clientX - initialPositionRef.current.x,
        y: clientY - initialPositionRef.current.y
     })
   }

   function dragStops() {
    isDraggingRef.current = false;
   }

   useEffect(() => {
    document.addEventListener("mousemove", dragContinue);
    document.addEventListener("touchmove", dragContinue, { passive: false });
    document.addEventListener("mouseup", dragStops);
    document.addEventListener("touchend", dragStops);

    return () => {
      document.removeEventListener("mousemove", dragContinue);
      document.removeEventListener("touchmove", dragContinue);
      document.removeEventListener("mouseup", dragStops);
      document.removeEventListener("touchend", dragStops);

      isDraggingRef.current = false;
    };

  }, []);

  const isMatched = Boolean(matches[content])
  
  return(
    <div className=" relative h-20 w-[44%] bg-gray-400 rounded-xl">
      <div
      draggable={isCorrect}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: `${isCorrect ? "move" : "default"}`,
        userSelect: "none",
        touchAction: "none",
      }}
        onDragStart={dragStart}
        onTouchStart={handleTouchStart}
        data-droppable={content}
        className={`dragable absolute ${isMatched ? ("bg-green-100") : "bg-[#282828]"} ${isMatched ?  "text-black" : "text-white"} text-[0.8rem] p-4 lg:text-sm h-20 w-full text-center grid place-items-center rounded-xl shadow-md`}
      >
      {content}
    </div>
    </div>
    
   
  )
}

export default DraggableBlock