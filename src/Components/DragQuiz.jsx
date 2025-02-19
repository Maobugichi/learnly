import DraggableBlock from "./DragAndDrop";
import Droppable from "./Droppable";
import { useState ,useCallback } from "react";
import { dragDrop } from "../action";

const DragQuiz = ({setGoalPoint}) => {
    const [blockPositions, setBlockPositions] = useState(
        dragDrop.reduce((acc, item) => ({ ...acc, [item.block]: { x: 0, y: 0 } }), {})
      );
      const [isCorrect,setIsCorrect] = useState(true);
      const [correctAnswer, setCorrectAnswer] = useState("")
      const [matches, setMatches] = useState({});
      const dragStops = () => {
        isDraggingRef.current = false;
      };
      const [droppedBlocks, setDroppedBlocks] = useState({});

      const updateBlockPosition = (content, newPosition) => {
        setBlockPositions((prevPositions) => ({
          ...prevPositions,
          [content]: newPosition,
        }));
      };
    
      const validateMatch = useCallback((draggedContent, targetAnswer,e) => {
          const isCorrect = dragDrop.some(
            (item) => item.block.trim() === draggedContent.trim() && item.piece.trim() === targetAnswer.trim()
          );         
          if (isCorrect) {
            setMatches((prevMatches) => ({
              ...prevMatches,
              [draggedContent]: targetAnswer,
            }));
            setGoalPoint(prev => {
              return{
                ...prev,
                points:prev.points + 1
              }
            })
          } else {
            console.log("hello")
          }
          setDroppedBlocks((prevDroppedBlocks) => ({
            ...prevDroppedBlocks,
            [draggedContent]: true,
          }));
      
          console.log("Dropped Blocks:", droppedBlocks);
      
          setTimeout(() => {
              setIsDraggingEnabled(prev => !prev);
            },500)
          
      },[isCorrect]);

    return(
        <>
        <div className="w-full  lg:w-[50%] mx-auto h-[300px]  flex flex-wrap justify-center gap-7">
            {dragDrop.map((item) => (
                <DraggableBlock
                key={item.block}
                content={item.block}
                position={blockPositions[item.block]}
                setPosition={(newPosition) =>
                    updateBlockPosition(item.block, newPosition)
                  }
                isCorrect={isCorrect}
                correctAnswer={correctAnswer}
                matches={matches}
                />
            ))}
        </div>
        <div className="flex  h-[300px] w-full lg:w-[50%] mx-auto flex-wrap-reverse justify-around">
            {dragDrop.map((item) => {
               return(
                <Droppable
                setIsCorrect={setIsCorrect}
                setCorrectAnswer={setCorrectAnswer}
                onDropCheck={validateMatch}
                dragStops={dragStops}
                content={item.piece}
                setPosition={updateBlockPosition}
                matches={matches}
               />
               ) 
            })}
         
        </div>
           
        </>
        
    )
}

export default DragQuiz