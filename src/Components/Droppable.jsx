import { dragDrop } from "../action";
import { useRef ,useEffect, useState } from "react";
const Droppable = ({setIsCorrect,setCorrectAnswer,onDropCheck,dragStops,setPosition,content,matches}) => {
    const blockRef = useRef(null)
    const isMatched = Boolean(matches[content])
    const handleDrop = (e) => {
        e.stopPropagation()
        e.preventDefault();
        const savedInfo = e.dataTransfer?.getData("text/plain") || e.target.dataset.draggedContent
        if (savedInfo) {
            const index = dragDrop.findIndex(item => item.block.trim() == savedInfo.trim())
            if (dragDrop[index].piece.toString().trim() == e.target.innerText.toString().slice(10).trim() 
                && dragDrop[index].block.toString().trim() == savedInfo.toString().trim()) {
                    
                    setTimeout(() => {
                        onDropCheck(savedInfo,e.target.innerText.toString().slice(10).trim())
                        //setIsCorrect(false)
                         
                        setCorrectAnswer(dragDrop[index].block.toString().trim())
                        setPosition(savedInfo, { x: centerX, y: centerY });
                    },1000)
                
                } 

                
              } else {
                // Drop event occurred outside the target area
                setPosition({ x: 0, y: 0 }); // Return to original position
              }
          
         
        }
    const allowDrop = (e) => {
        e.preventDefault()
        dragStops()
    }

    useEffect(() => {
        let timeoutId;
        const handleTouchEnd = (e) => {
            const touchX = e.changedTouches[0].clientX;
            const touchY = e.changedTouches[0].clientY;
            const target = document.elementFromPoint(touchX, touchY);
            const draggedBlock = e.target.closest(".dragable");
           
            if (draggedBlock) {
              draggedBlock.style.visibility = "hidden";
            }
            const dropZone = document.elementFromPoint(touchX, touchY)
            if (draggedBlock) {
                draggedBlock.style.visibility = "visible"; 
              }
           
            if (target && target.classList.contains("dragable") && dropZone && dropZone.classList.contains("droppable")) {
                 const droppedInfo = dropZone.innerText.slice(10) || dropZone.dataset.droppable
                 const savedInfo = e.target.dataset.droppable;
                 const index = dragDrop.findIndex(item => item.block.trim() == savedInfo.trim()) 
               
              if (savedInfo && droppedInfo) {
                if (dragDrop[index].piece.toString().trim() == droppedInfo.toString().trim() && dragDrop[index].block.toString().trim() == savedInfo.toString().trim()) {
                    draggedBlock.removeAttribute("draggable")

                   timeoutId =  setTimeout(() => {
                        onDropCheck(savedInfo,droppedInfo)
                        //setCorrectAnswer(dragDrop[index].block.toString().trim())
                       
                    },1000)
                   
                   }
              }
            }
    };
          
        document.addEventListener("touchend", handleTouchEnd);
    
        return () => {
            document.removeEventListener("touchend", handleTouchEnd);
            clearTimeout(timeoutId);

    };
    }, []);

   
    return (
                <div
                 ref={blockRef}
                 className={`${isMatched ? "hidden" : ""} droppable bg-purple-100 w-[43%] p-3 text-center lg:w-64 ${isMatched ? "h-[500px]" : "h-20"} grid place-items-center rounded-lg ${isMatched ? "border-0" : "border-2"} ${isMatched ? null : "border-dashed"} border-gray-500`}
                 onDrop={handleDrop}
                 onDragOver={allowDrop}
                 data-droppable={content}
                >
                Drop Here: {content}
              </div>
        
        )
}

export default Droppable