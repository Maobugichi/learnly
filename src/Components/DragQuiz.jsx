import DragCont from "./DragCont";
import DropCont from "./DropCont";
import { useState,useRef, useEffect } from "react";
const DragQuiz = () => {
  const [isDropZone, setIsDropZone] = useState(null);
  const [dropOnElement, setIsDropOnElement] = useState(false);
  const [dropZoneContent, setDropZoneContent] = useState([])
  const blockRefs = useRef([]);
  const dropContRefs = useRef([]);

  const [filledDropZones, setFilledDropZones] = useState({});
  const [occupiedZones, setOccupiedZones] = useState([]);
 
  const handleDropZone2 = (dropZoneId) => {
    setOccupiedZones((prev) => [...prev, dropZoneId]);
    
  };
  const handleDropZoneFill = (dropZoneId) => {
    setFilledDropZones((prev) => ({
      ...prev,
      [dropZoneId]: true, // Mark the drop zone as filled
    }));
  };

  const onDropContRefs = (refs) => {
   return dropContRefs.current = refs;
  };

    return(
        <div className="w-full h-auto min-h-[100vh] lg:min-h-[120vh] grid place-items-center">
          <DragCont
           isDropZone={isDropZone}
           setIsDropZone={setIsDropZone}
           dropOnElement={dropOnElement}
           setIsDropOnElement={setIsDropOnElement}
           blockRefs={blockRefs}
           dropContRef={dropContRefs}
           setDropZoneContent={setDropZoneContent}
           handleDropZone={handleDropZoneFill}
           handleDropZone2={handleDropZone2}
           occupiedDropZones={occupiedZones}
           isVisible={filledDropZones}
          />
          <DropCont
           occupiedZones={occupiedZones}
           isDropZone={isDropZone}
           setIsDropZone={setIsDropZone}
           setIsDropOnElement={setIsDropOnElement}
           blockRefs={blockRefs}
           onRef={onDropContRefs}
           isVisible={filledDropZones}

          />
        </div>
      
    )
}  

export default DragQuiz