import Button from "./Button";
import { useEffect, useState } from "react";
import TrackPoints from "./TrackPoints";
import Quiz from "./Quiz";

import DragAndDrop from "./TestElement";
import DragQuiz from "./DragQuiz";

const HomePage = () => {
    const [goalPoints, setGoalPoint] = useState({
        goal:30,
        points:0

    })
    const [isWinState,setisWinState] = useState(false)
    return(
        <section className="h-auto lg:min-h-[140vh] min-h-[100vh] grid place-items-center">
          <div className="h-auto lg:min-h-[130vh] min-h-[80vh] w-[90%] mx-auto flex flex-col gap-6  md:min-h-[60] pt-10 pb-10">
            <Button
             className="bg-purple-200 w-10 h-10 rounded-full grid place-items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"/></svg>
              </Button>
              <TrackPoints
                goalPoint={goalPoints}
              />
             <DragQuiz
              setGoalPoint={setGoalPoint}
             />
              <Quiz
               isWinState={isWinState}
               setisWinState={setisWinState}
               setGoalPoint={setGoalPoint}
              />
          </div>
            
        </section>
    )
    
}

export default HomePage


 /*<Quiz
isWinState={isWinState}
setisWinState={setisWinState}
goalPoints={goalPoints}
setGoalPoint={setGoalPoint}
/>*/