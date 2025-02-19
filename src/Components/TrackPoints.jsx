import {capitalize} from "../action";

const TrackPoints = ({goalPoint})  => {
    const items = Object.entries(goalPoint);
     const newItems = items.map(([key,value],index) => {
            return(
                <div 
                key={index} 
                className={`flex text-2xl lg:text-3xl w-[45%] items-center mx-auto ${
                    index % 2 === 0 ? '' : 'justify-end'
                }`}>
                    <p className="flex">{capitalize(key)}: {value}</p> 
                </div>
            )
})
    return(
        <div className="bg-[#6F42C1] text-white flex w-full mx-auto h-20 lg:h-24 rounded-lg">
               {newItems}
         </div>
    )
  
}

export default TrackPoints