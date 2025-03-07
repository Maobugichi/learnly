import { dragDrop } from "../action";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Piece from "./Piece";
const DropCont = ({isDropZone,setIsDropZone,blockRefs, isVisible,occupiedZones}) => { 
    const [dropZones, setDropZones] = useState([]);
    useEffect(() => {
        dragDrop.forEach((_, i) => {
            if (!blockRefs.current[i]) {
                blockRefs.current[i] = null;
            }
        });
    }, [dragDrop]);

    function calculateDropZone() {
        const zones = []
        blockRefs.current.forEach((ref,index) => {
            if (ref) {
                const rect = ref.getBoundingClientRect()
                
                zones.push({
                    id:`zone${index + 1}`,
                    top:rect.top + window.scrollY,
                    bottom: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                    right: rect.right + window.scrollX,
                    content: ref.innerText
                })
            }
        })
        
        const validZones = zones.filter((zone) => !occupiedZones.includes(zone.id));
        setDropZones(validZones)
        setIsDropZone(validZones)
    }

    useEffect(() => {
      if (isDropZone) {
        const dro = dropZones.filter((zone) => !occupiedZones.includes(zone.id));
        setIsDropZone(dro)
      } 
    },[occupiedZones,dropZones])

    useEffect(() => {
        calculateDropZone();
        window.addEventListener("resize", calculateDropZone);
        return () => window.removeEventListener("resize", calculateDropZone);
      }, []);


    
    const draggedBlock = dragDrop.map((item,i) => {
        return(
           <motion.div 
           className="w-[45%]">
           
            <Piece
             key={item.piece}
             content={item.block}
             ref={(el) => (blockRefs.current[i] = el)}
             dropZones={isDropZone && isDropZone}
             isVisible={!isVisible[item.id]}
            />
            </motion.div>
        )
    })
  
    return(
        <div className="  flex flex-wrap-reverse w-[90%] lg:w-[50%] justify-center gap-8 mx-auto h-[300px] items-center text-sm text-center">
         {draggedBlock}
        </div>
    )
}

export default DropCont