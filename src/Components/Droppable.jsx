import { dragDrop } from "../action";
import { useRef ,useEffect, useState } from "react";
const Droppable = ({setCorrectAnswer,onDropCheck,dragStops,setPosition,content,matches}) => {
    const blockRef = useRef(null)
    
    const handleDrop = (e) => {
        e.preventDefault();
        const savedInfo = e.dataTransfer?.getData("text/plain") || e.target.dataset.draggedContent;
        if (savedInfo) {
            setTimeout(() => {
                onDropCheck(savedInfo,e.target.innerText.toString().slice(10).trim());
                setCorrectAnswer(dragDrop[index].block.toString().trim());
                setPosition(savedInfo, { x: centerX, y: centerY });
            },1000)
            const index = dragDrop.findIndex(item => item.block.trim() == savedInfo.trim());
            
              } else {
                setPosition({ x: 0, y: 0 }); 
              }
          
         
        }
    const allowDrop = (e) => {
        e.preventDefault();
        dragStops();
    }

    useEffect(() => {
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
                 const droppedInfo = dropZone.innerText.slice(10) || dropZone.dataset.droppable;
                 const savedInfo = e.target.dataset.droppable;
                 const index = dragDrop.findIndex(item => item.block.trim() == savedInfo.trim()); 
              if (savedInfo && droppedInfo) {
                    setTimeout(() => {
                        onDropCheck(savedInfo,droppedInfo)
                    },1000);
                if (matches[savedInfo]) return;
               
              }
            }
    };
          
        document.addEventListener("touchend", handleTouchEnd);
        return () => {
            document.removeEventListener("touchend", handleTouchEnd);
      };
    }, []);

   
    return (
                <div
                 ref={blockRef}
                 className={` droppable bg-purple-100 w-[43%] p-3 text-center lg:w-64    border-2 border-dashed h-20 grid place-items-center rounded-lg  border-gray-500`}
                 onDrop={handleDrop}
                 onDragOver={allowDrop}
                 data-droppable={content}
                >
                Drop Here: {content}
              </div>
        
        )
}

export default Droppable