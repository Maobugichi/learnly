import { AnimatePresence } from "motion/react";
import { questions } from "../action"
import AnswerBlock from "./AnswerBlock"
import { useEffect, useRef, useState } from "react"
import Button from "./Button";
const AnswerCont = () => {
    const answerRef = useRef([]);
    const [chooseItem, setChooseItem] = useState(null)
    const [nextPage,setNextPage] = useState(false)
    const [isClick , setIsClick] = useState(null)
    const handleClick = (e) => {
        setIsClick(true)
        const index = questions.findIndex(item => e.target.childNodes[0].childNodes[1].innerText.trim() === item.choose);
            if (e.target.childNodes[0].childNodes[1].innerText.trim() ==  questions[index]?.choose) {
                e.target.childNodes[1].childNodes[0].classList.remove("hidden")
                e.target.classList.add("bg-green-50","border-green")
                setChooseItem(null)
            } else  {
                e.target.classList.add("bg-red-100","border-green")
                e.target.childNodes[1].childNodes[1].classList.remove("hidden")
                questions.map(item => {
                    if (Object.values(item.answers).includes(e.target.childNodes[0].childNodes[1].innerText.trim())) {
                        setChooseItem(item.choose)
                    }
                })
                //
            }
      
    }

   
    const handleNext = () => {
       
        if (answerRef.current && isClick) {
            setNextPage(prev => !prev)
            Array.from(answerRef.current).forEach(item => {
                item.classList.remove("bg-green-50")
                item.classList.remove("bg-red-100")
                item.childNodes[1].childNodes[0].classList.add("hidden")
                item.childNodes[1].childNodes[1].classList.add("hidden")
            })
            setIsClick(null)
            
        }
       
    }


    useEffect(() => {
        console.log(chooseItem)
        if (chooseItem) {
            setTimeout(() => {
                Array.from(answerRef.current).map(item => {
                    if (item.childNodes[0].childNodes[1].innerText.trim() == chooseItem) {
                        item.classList.add("bg-green-50")
                        item.childNodes[1].childNodes[0].classList.remove("hidden")
                    }
                })
            },1000)
            
        }
       
    },[answerRef,chooseItem])
   const question = questions[0].question
   const answer = Object.entries(questions[0].answers).map(([key,value],i) => {
        return (<AnswerBlock
                  ref={(el) => answerRef.current[i] = el}
                  span={key}
                  content={value}
                  handleClick={handleClick}
                  width={34}
                />)
   }) 

   const answer2 = Object.entries(questions[1].answers).map(([key,value],i) => {
    return (<AnswerBlock
              ref={(el) => answerRef.current[i] = el}
              span={key}
              content={value}
              handleClick={handleClick}
              width={34}
            />)
}) 


  
  return(
    <AnimatePresence>
    <div className="w-[90%] mx-auto grid gap-5">
       
            {
                nextPage ? 
                    <>
                      <p className="flex flex-col"><span className="text-2xl font-bold">Question</span> {question}</p>
                      {answer2}
                      <Button
                       handleNext={handleNext}
                      />
                    </>
                    :  
                    <>
                       <p className="flex flex-col"><span className="text-2xl font-bold">Question</span> {question}</p>
                      {answer}
                      <Button
                       handleNext={handleNext}
                      />
                    </>
                   
            }
        
        
       
    </div>
    </AnimatePresence>
  )
}

export default AnswerCont