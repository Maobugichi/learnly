import { motion ,AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
const Block = ({children,on}) => {
    const handleDrop = (event) => {
        event.preventDefault();
        const draggedElementId = event.dataTransfer.getData("text/plain"); // Retrieve the ID of the dragged element
        if (onDropCheck) {
          onDropCheck(draggedElementId, answer); // Call the validation function
        }
      };
    
      const allowDrop = (event) => {
        event.preventDefault(); // Allow drop
      };
    return(
        <div 
        onDrop={handleDrop}
        onDragOver={allowDrop}
        data-id="droppable"
        draggable="true"
        className="bg-sky-400 h-32 w-[45%] grid place-items-center rounded-lg ">
            {children}
        </div>
    )
}

export default Block

