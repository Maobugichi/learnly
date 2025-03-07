import { motion , AnimatePresence } from "motion/react"

const Piece = ({ref,content,isVisible}) => {
    return(
        <AnimatePresence>
           
                <motion.div 
                 ref={ref} 
                 animate={!isVisible ? {scale:0} : null}
                 exit={{opacity:0}}
                 className={`${!isVisible ? "invisible" : null}  w-full lg:w-[250px] h-[80px] rounded-lg border-dashed border-2 grid place-content-center bg-[#F3E8FF] z-10 text-[12px] lg:text-sm text-black`} style={{
                    position: 'relative',
                   }}>
                     <p>{content}</p>
                </motion.div> 
        </AnimatePresence>
        
    )
}

export default Piece