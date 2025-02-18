import { motion ,AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
const Piece = ({children,cc}) => {
    const [check,setCheck] = useState(false)
    useEffect(() => {

    })
    return(
        <motion.div 

        className="bg-sky-400 h-32 w-[45%] grid place-items-center rounded-lg ">
            {children}
        </motion.div>
    )
}

export default Piece