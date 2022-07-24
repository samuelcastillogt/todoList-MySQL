const main = document.querySelector(".main")
const createButton = document.getElementById("create")
const taskform = document.querySelector(".taskform")
const formbutton = document.getElementById("formbutton")
const mainContainer = document.getElementById("principal")

const getTareas=async()=>{
    main.innerHTML="Cargando..."
    const response = await fetch("./tasks")
    const data = await response.json()
    if(data.length == 0){
        main.innerHTML="<div class=`alerta`>No hay tareas, crea una para comenzar</div>"
    }else{
        main.innerHTML=""
        data.map(item => task(item))
    }
}

function task(data){
    const fechaFiltro = data.fecha.slice(0, 10)
    const titleContainer = document.createElement("h3")
    const descContainer = document.createElement("p")
    const taskContainer = document.createElement("div")
    const taskContentContainer = document.createElement("div")
    const fecha = document.createElement("p")
    fecha.textContent= fechaFiltro
    titleContainer.textContent= data.title
    descContainer.textContent= data.descripcion
    taskContentContainer.appendChild(titleContainer) 
    taskContentContainer.appendChild(descContainer)
    taskContentContainer.appendChild(fecha)
    taskContainer.appendChild(taskContentContainer)
    taskContainer.setAttribute("class", "task")
    taskContainer.setAttribute("id", data.id)
    
        const deleteTask = document.createElement("div")
        deleteTask.textContent ="X"
        
        taskContainer.appendChild(deleteTask)
        deleteTask.setAttribute("class", "delete")
        deleteTask.classList.add("hidden")
    main.appendChild(taskContainer)
    taskContainer.addEventListener("click", async(e)=>{
        if(data.finished==0){
await fetch("./tasks/delete/"+ data.id)
        await getTareas()
        }else{
            await fetch("./tasks/reactive/"+ data.id)
        await getTareas()
        }
        
    })
       deleteTask.addEventListener("click", async(e)=>{   
        await fetch("./tasks/remove/"+ data.id)
        await getTareas()
         })
         if(data.finished==1){
       taskContainer.setAttribute("class", "finished") 
       deleteTask.classList.remove("hidden")
    }
}

async function createTask(){
    const data ={
        title: document.getElementById("title").value,
        descripcion: document.getElementById("descripcion").value,
        fecha: document.getElementById("date").value
    }
    await fetch("./tasks/create",{
         method: "POST",   
         headers:{
            "content-type": "application/json"
         },
        body: JSON.stringify(data) 
    })
    await getTareas()
    taskform.classList.add("hidden")
    formbutton.classList.remove("hidden")
    mainContainer.classList.remove("blur")
}

window.addEventListener("load", getTareas)

createButton.addEventListener("click", createTask)

formbutton.addEventListener("click", ()=>{
    taskform.classList.remove("hidden")
    formbutton.classList.add("hidden")
    mainContainer.classList.add("blur")
    
})

window.addEventListener("DOMContentLoaded", ()=>{
    const fecha = new Date
    const fechaPro ={
        dia: fecha.getDate(),
     mes: fecha.getMonth(),
     año: fecha.getFullYear()
    }
    
    document.getElementById("fecha").innerHTML = `<div>
    <h4>TaskList With MySQL</h4>
    </div>`
})
document.getElementById("cerrar").addEventListener("click", ()=>{
    document.getElementById("title").value = ""
    document.getElementById("descripcion").value =""
    document.getElementById("date").value=""
    taskform.classList.add("hidden")
formbutton.classList.remove("hidden")
mainContainer.classList.remove("blur")
})
