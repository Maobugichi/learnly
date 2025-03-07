import { useState } from "react"
import Blocks from "./DroppedBox"
import DragQuiz from "./DragQuiz"
import AnswerCont from "./AnswersCont"

const Homepage = () => {
    const [isGoalPoint, setIsGoalPoint] = useState({
        goal:30,
        point:0
    })
    return(
        <div>
           <AnswerCont/>
           <DragQuiz/>
          
        </div>
    )
}

export default Homepage