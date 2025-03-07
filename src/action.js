function capitalize(target) {
    const newValue = target.slice(0,1).toUpperCase() + target.slice(1)
    return newValue
}

function removeClass(listArray) {
    for (const list of listArray) {
        list.classList.remove("border-[green]","border-[red]","bg-green-50","bg-red-50")
        !list.nextElementSibling.classList.contains("hidden") && list.nextElementSibling.classList.add("hidden")
    }
}

const questions = [
    {
        question:"What do plants need for photosynthesis?",
        answers:{
            a:"Oxygen & Sugar",
            b:"Sunlight, Water & Carbondioxide",
            c:"Protein & Soil"
        },
        choose: "Sunlight, Water & Carbondioxide"
    },
    {
        question:"What is the role of sunlight in photosynthesis?",
        answers:{
            a:"It provides energy to make food",
            b:"it lets plants absorb water",
            c:"It turns leaaves green"
        },
        choose: "It provides energy to make food"
    }
]

const dragDrop = [{
    id:"zone1",
    block: "A number that ",
    piece:"multiplier"
},
{
    id:"zone2",
    block:"A statement that",
    piece:"Equasion"
},
{
    id:"zone3",
    block:"A combination of",
    piece:"Expression"

},
{
    id:"zone4",
    block:"A syntax that data",
    piece:"Object"
},
{
    id:"zone5",
    block:"A block of code",
    piece:"function"
},
]

function getCoordinates(e) {
    return e.touches ? e.touches[0] : e
}




export {questions,removeClass,capitalize,dragDrop,getCoordinates}

