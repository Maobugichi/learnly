import {questions,removeClass,capitalize} from "../action";
import { getAnswer } from "./getAnswer";
import { useCallback, useEffect, useRef , useState } from "react"
import Dialog from "./Dialog";

const Quiz = ({isWinState,setisWinState,setGoalPoint}) => {
    const [clickMade,setClickMade] = useState(false)
    const listRef = useRef(null)
    const [textContent, setTextContent] = useState({
        text:"",
        content:"",
        color:""
    })
    const [isPage,setIsPage] = useState(true);
    const [show,setShow] = useState(null);
    const [isAllow,setIsAllow] = useState(false);
    const list = listRef.current;
   
    useEffect(() => {
        setTextContent({
            text: isWinState ? "Right!" : "Think Again!",
            content: isWinState ? "They use Sunlight, Water & Carbondioxide" : "Think about what gives plant energy",
            color:isWinState ? "bg-green-100 " : "bg-red-100"
        })
        if (isWinState) {
            setGoalPoint(prev => {
                return {
                    goal:prev.goal,
                    points: prev.points++
                }
            })
        }
    },[isWinState])
    useEffect(() => {
    
        if (isAllow) {
            const listArray = Array.from(list.getElementsByTagName("li"))
            removeClass(listArray)
            setClickMade(!clickMade)
            setisWinState(false)
        }
    },[isAllow])
    const question = questions.map(question => {
        return(
            Object.entries(question).map(([key,value]) => {
                if (key == "question") {
                    return (
                        <div className="md:h-32 h-30 flex flex-col gap-5 p-5">
                           <h3 className="text-3xl">{capitalize(key)}</h3> 
                           <p className="md:text-lg text-md">{value}</p>
                        </div>
                )
                }
            })
        )
        
       return null
    })
    function addClass(target,color,border,select) {
            target.classList.add(color, border)
            target.parentNode.querySelector(select).classList.remove("hidden")
            setClickMade(prev => !prev)
            setShow("not null")  
    }

    const checkAnswer = useCallback( (e) => {
        const list = listRef.current;
        const listArray = Array.from(list.getElementsByTagName("li"));
        const clickText = e.target.parentNode.parentNode.parentNode.firstElementChild.childNodes[1].innerText.toString();
        const index =  questions.findIndex(item => {
            return item.question.trim().startsWith(clickText.trim())
        })
        if (questions[index]) {
            const correct = questions[index].choose.trim() == e.target.innerText.toString().slice(2).trim()
            console.log(correct)
            if (!clickMade) {
                if (correct) {
                    addClass(e.target,"bg-green-50","border-[green]",".svg");
                    setisWinState(true)
                } else {
                    addClass(e.target,"bg-red-50","border-[red]",".wrong");                
                    setTimeout(() => {
                        for (const list of listArray) {
                            if (list.innerText.toString().slice(2).trim() == questions[index].choose.trim()) {
                                list.classList.add("bg-green-50", "border-[green]")
                                list.parentNode.querySelector(".svg").classList.remove("hidden")
                            }
                        }
                    },2000)
                }
            } 
        }
    },[clickMade])

   
   
    const answer = questions.map(question => {
        return Object.entries(question).map(([key, value]) => {
            if (key ==="answers") {
                return Object.entries(value).map(([subKey, subValue]) => (
                    <div onClick={checkAnswer} className="relative h-20 md:h-24 flex  border border-[#ccc] rounded-lg">
                          <li className="   flex items-center gap-2.5  w-full  text-lg lg:text-2xl px-7 " key={subKey}><b>{capitalize(subKey)}</b> {subValue}</li>
                          <svg className="hidden svg absolute lg:top-[28px] top-[20px] right-10" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path fill="#C6F4D6" stroke="#000" d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z"/><path stroke="#fff" d="M17 24L22 29L32 19"/></g></svg>
                          <svg className="hidden wrong absolute top-[20px] lg:top-[28px] right-10" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#FFC5C5" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.712T12 7t-.712.288T11 8v4q0 .425.288.713T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                    </div>
                  
                ));
            }
            return null;
        });
    });

    const flattenedAnswer = answer.flat().slice(0,3);
    const flattenedAnswer2 = answer.flat().slice(3);
    return(
        isPage ?
        <div className="w-full mx-auto h-auto min-h-[60vh] lg:min-h-[88vh] flex flex-col gap-5 md:justify-between ">
            {question.slice(0,1)}
            <ul ref={listRef} className="grid gap-7">{flattenedAnswer}</ul>
            <Dialog
             text={textContent.text}
             content={textContent.content}
             color={textContent.color}
             show={show}
             isWinState={isWinState}
             setShow={setShow}
             isPage={isPage}
             setIsPage={setIsPage}
             setIsAllow={setIsAllow}
            />
        </div> : 
        
            <div className="w-full mx-auto h-auto min-h-[60vh] lg:min-h-[88vh] flex flex-col gap-5 md:justify-between ">
                {question.slice(1)}
                <ul ref={listRef} className="grid gap-7">{flattenedAnswer2}</ul>
                <Dialog
                text={textContent.text}
                content={textContent.content}
                color={textContent.color}
                show={show}
                isWinState={isWinState}
                setShow={setShow}
                isPage={isPage}
                setIsPage={setIsPage}
                setIsAllow={setIsAllow}
                />
          </div> 
    )
}

export default Quiz