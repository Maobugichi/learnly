import { dragDrop } from "../action";
import { useRef ,useEffect } from "react";
const Droppable = ({setIsCorrect,setCorrectAnswer,onDropCheck,dragStops,setPosition,content}) => {
    const blockRef = useRef(null)
    const handleDrop = (e) => {
        e.preventDefault();
        const savedInfo = e.dataTransfer?.getData("text/plain") || e.target.dataset.draggedContent
        if (savedInfo) {
            const targetRect = e.target.getBoundingClientRect();
            const centerX = e.clientX
            const centerY = e.clientY
            const block = blockRef.current
            const dropRect = {
                left: targetRect.left,
                right: targetRect.right,
                top: targetRect.top,
                bottom: targetRect.bottom,
              };

          
           
            if (
                clientX >= dropRect.left &&
                clientX <= dropRect.right &&
                clientY >= dropRect.top &&
                clientY <= dropRect.bottom
              )  {
                const index = dragDrop.findIndex(item => item.block.trim() == savedInfo.trim())
                const centerX = targetRect.left + targetRect.width / 2 - 50;
                const centerY = targetRect.top + targetRect.height / 2 - 50;
              
          
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
    }

    const allowDrop = (e) => {
        e.preventDefault()
        dragStops()
    }

    useEffect(() => {
        const handleTouchEnd = (e) => {
            const target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            //const index = dragDrop.findIndex(item => item.block.trim() == savedInfo.trim())
            if (target && target.classList.contains("dragable")) {
              const savedInfo = e.target.dataset.droppable; // Get dragged content from data attribute
              console.log(e.target.dataset)
              if (savedInfo) {
                onDropCheck(savedInfo,e.target.innerText.toString().slice(10).trim())
                //setIsCorrect(false)
                //setCorrectAnswer(dragDrop[index].block.toString().trim())
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
                 className={`droppable bg-purple-100 w-[43%] p-3 text-center lg:w-64 h-20 grid place-items-center rounded-lg border-2 border-dashed border-gray-500`}
                 onDrop={handleDrop}
                 onDragOver={allowDrop}
                 data-droppable={content}
                >
                Drop Here: {content}
            </div>
        
        )
}

export default Droppable
