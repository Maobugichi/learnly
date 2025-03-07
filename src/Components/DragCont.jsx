import { motion } from "motion/react";
import { dragDrop } from "../action";
import Blocks from "./DroppedBox";
import { useRef, useEffect, useState } from "react";
const DragCont = ({isDropZone,blockRefs,dropOnElement,setIsDropOnElement,setDropZoneContent, handleDropZone,isVisible,handleDropZone2}) => {
    const itemRefs = useRef(dragDrop.map(() => useRef(null)));
    const [droppedBlocks,setDroppedBlocks] = useState([]);
    const draggedBlock = dragDrop.map((item,i) => {
        return(
            <motion.div ref={itemRefs.current[i]}
             style={{ position: 'relative' }}
             className="bg-gray-200 rounded-xl w-[45%] lg:w-[40%]">
                <Blocks
                 content={item.piece}
                 className="z-20  text-black"
                 drag={true}
                 dropZones={isDropZone}
                 dropOnElement={dropOnElement}
                 dragConstraintsRef={itemRefs.current[i]}
                 blockContraint={blockRefs.current[i]}
                 setIsDropOnElement={setIsDropOnElement}
                 setDroppedBlocks={setDroppedBlocks}
                 droppedBlocks={droppedBlocks}
                 setDropZoneContent={setDropZoneContent}
                 handleDropZone={handleDropZone}
                 handleDropZone2={handleDropZone2}
                 isVisible={!isVisible[item.id]}
                />
            </motion.div>
        )
    })

    return(
        <div className="flex flex-wrap w-[90%]  lg:w-[50%] justify-center gap-5 mx-auto h-[300px] items-center">
         {draggedBlock}
        </div>
    )
}

export default DragCont