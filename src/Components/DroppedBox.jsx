import { motion } from "motion/react";
import { useState, useEffect, useRef,useLayoutEffect } from "react";
import { dragDrop } from "../action";
const Blocks = ({
  content,
  className,
  drag,
  dropZones,
  handleDropZone,
  isVisible,
  droppedBlocks,
  setDroppedBlocks,
  dropOnElement,
  handleDropZone2
}) => {
  const [isInCorrectZone, setIsInCorrectZone] = useState(true);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  
  const handleDragEnd = (e, info) => {
    const { x, y } = info.point;
    let dropTarget = null;
    dropZones.forEach((zone, i) => {
     
      if (x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom) {
        dropTarget = zone;
        handleDropZone(zone.id);
        setDroppedBlocks((prevDroppedBlocks) => [...prevDroppedBlocks, content]);
        setIsInCorrectZone(true); 
        const index = dragDrop.findIndex(item => item.block == zone.content);
        if (dragDrop[index].block == zone.content.trim() && dragDrop[index].piece == e.target.innerText.trim()) {
            e.target.classList.remove("text-white")
            e.target.classList.add("bg-green-200","text-[black]")
        } else {
          e.target.classList.remove("text-white")
          e.target.classList.add("bg-red-200","text-[black]")
        }
        handleDropZone2(zone.id);

      }
    });

   
    if (!dropTarget) {
      setIsInCorrectZone(false);

    }

  };

 

  useEffect(() => {
     
    if (isInCorrectZone) {
     setInitialPosition({})
    } 
    if (!isInCorrectZone) {
      setTimeout(() => {
        setIsInCorrectZone(true)
      },1000)
    }
  },[isInCorrectZone])
  return (
    <motion.div
      drag={droppedBlocks.includes(content) ? false : drag}
      whileDrag={{scale:0.9}}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      dragMomentum={false}
      initial={initialPosition}
      animate={isInCorrectZone ? initialPosition : {x:0,y:0}}
      className={`bg-[#333] transition-colors transition-border duration-700 ease-out text-white h-[80px] rounded-xl border-dashed border-3 grid place-content-center z-20 w-full lg:w-[250px] `}
      style={{ position: "relative" }}
    >
      <p>{content}</p>
    </motion.div>
  );
};

export default Blocks;
