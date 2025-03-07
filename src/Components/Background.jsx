import { motion } from "motion/react"
import { useRef } from "react"
const Background = () => {
    
    return(
        <motion.div ref={(el) => (myRefs.current[i] = el)}
        className="bg-gray-500"></motion.div>
    )
}

export default Background