import DraggableBlock from "./DragAndDrop";
import Droppable from "./Droppable";
import { useState ,useCallback } from "react";
import { dragDrop } from "../action";

const DragQuiz = () => {
    const [blockPositions, setBlockPositions] = useState(
        dragDrop.reduce((acc, item) => ({ ...acc, [item.block]: { x: 0, y: 0 } }), {})
      );
      const [isCorrect,setIsCorrect] = useState(true);
      const [correctAnswer, setCorrectAnswer] = useState("")
      const [matches, setMatches] = useState({});
      const dragStops = () => {
        isDraggingRef.current = false;
      };
    
      const validateMatch = useCallback((draggedContent, targetAnswer) => {
          
          const isCorrect = dragDrop.some(
            (item) => item.block === draggedContent && item.piece === targetAnswer
          );         
          if (isCorrect) {
            setMatches((prevMatches) => ({
              ...prevMatches,
              [draggedContent]: targetAnswer,
            }));
          } else {
            setMatches((prevMatches) => ({
              ...prevMatches,
              [draggedContent]: targetAnswer, // Store the match
            }));
          }
      
          setTimeout(() => {
              setIsDraggingEnabled(prev => !prev);
            },500)
          
      },[]);

    return(
        <>
        <div className="w-full  lg:w-[50%] mx-auto h-[300px]  flex flex-wrap justify-center gap-7">
            {dragDrop.map((item) => (
                <DraggableBlock
                key={item.block}
                content={item.block}
                position={blockPositions[item.block]}
                setPosition={(newPosition) =>
                    setBlockPositions((prevPositions) => ({
                    ...prevPositions,
                    [item.block]: newPosition,
                    }))
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
                setPosition={(newPosition) =>
                  setBlockPositions((prevPositions) => ({
                  ...prevPositions,
                  [item.block]: newPosition,
                  }))
              }
               />
               ) 
            })}
         
        </div>
           
        </>
        
    )
}

export default DragQuiz