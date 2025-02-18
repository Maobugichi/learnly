import { useCallback, useEffect, useRef, useState } from "react";
import { getCoordinates } from "../action";


const DraggableBlock = ({content,position,setPosition,isCorrect,correctAnswer,matches}) => {
    const isDraggingRef = useRef(null);
    const initialPositionRef = useRef({x:0,y:0});
    const isMatched = Boolean(matches[content])
    function dragStart(e) {
      if (isMatched) return
        e.dataTransfer.setData("text/plain",content)
        const {clientX , clientY} = getCoordinates(e)
        initialPositionRef.current = {
            x: clientX - position.x,
            y: clientY - position.y,
        }
        isDraggingRef.current = true;
    }

  function handleTouchStart(e) {
    if (isMatched) return
    if (!isCorrect) return; // Prevent dragging if not allowed
    const { clientX, clientY } = getCoordinates(e);
    initialPositionRef.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
    isDraggingRef.current = true;
  }

  
   function dragContinue(e) {
     if (!isDraggingRef.current ||   isMatched) return
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

  }, [isMatched]);


  
  return(
    <div className=" relative h-20 w-[44%] bg-gray-100 rounded-xl">
      <div
      draggable={isMatched ? false : true}
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
        className={`dragable  absolute ${isMatched ? ("bg-green-100") : "bg-[#282828]"} ${isMatched ?  "text-black" : "text-white"} text-[0.8rem] p-4 lg:text-sm h-20 w-full text-center grid place-items-center rounded-xl shadow-md  ${isMatched ? "border-2" : null} ${isMatched ? "border-dashed":null}  ${isMatched ? "border-gray-500" : null}`}
      >
      {content}
    </div>
    </div>
    
   
  )
}

export default DraggableBlock