import { motion } from "motion/react";
import { capitalize } from "../action";
const AnswerBlock = ({content,span,handleClick,ref,width}) => {
    return(
        <div ref={ref} onClick={handleClick} className="w-full flex items-center p-5 transition-all duration-700 ease-out h-24 border rounded-md relative">
            <div className="flex gap-5 text-xl items-center">
                <span className="font-bold">{capitalize(span)}</span>
                <p className="text-sm md:text-xl">{content}</p> 
            </div>
           

            <div>
            <motion.svg 
             initial={{scale:0,opacity:0}}
             whileInView={{scale:1,opacity:1}}
             className="hidden svg absolute lg:top-[28px] top-8 md:right-10 right-2" xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 48 48"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path fill="#C6F4D6" stroke="#000" d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z"/><path stroke="#fff" d="M17 24L22 29L32 19"/></g></motion.svg>
            <motion.svg 
              initial={{scale:0,opacity:0}}
              whileInView={{scale:1,opacity:1}}
              className="hidden wrong absolute top-8 lg:top-[28px] md:right-10 right-2" xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 24 24"><path fill="#FFC5C5" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.712T12 7t-.712.288T11 8v4q0 .425.288.713T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></motion.svg></div>  
        </div>
    )
}

export default AnswerBlock