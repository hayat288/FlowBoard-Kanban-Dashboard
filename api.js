// recupération des cartes
// let product = []
// fetch("https://flowboard-api-virid.vercel.app/cards")
// .then(response =>{
//     return response.json()
// })
// .then(data =>{
//     product = data
     
//     affichage()
// })
//   const todo = document.querySelector(".todo")
//   const inProgress = document.querySelector(".inProgress")
//   const done = document.querySelector(".done")

//   function affichage(){
  
//     product.forEach(function(c){

//         const card = document.createElement("div")
//         card.classList.add("card")
        
//         const title= document.createElement("p")
//         title.textContent = c.title

//         const assignee = document.createElement("h4")
//         assignee.textContent = c.assignee

//         const  status = document.createElement("p")
//         status.textContent = c.status

//         const priority = document.createElement("p")
//         priority.textContent = c.priority

//         card.append( title, assignee, status, priority)
        
//         if (c.status === "todo"){
//             todo.appendChild(card)
//         }else if(c.status === "in-progress"){
//             inProgress.appendChild(card)
//         }else{
//             done.appendChild(card)
//         }  
//     })
//   }
//   affichage()


let product = []
fetch("https://flowboard-api-virid.vercel.app/cards")
.then(response =>{
    return response.json()
})
.then(data =>{
    product = data
    affichage()
})

const todo = document.querySelector(".todo")
const inProgress = document.querySelector(".inProgress")
const done = document.querySelector(".done")


function affichage(){
    product.forEach(function(c){
      
        const card = document.createElement("div")
        card.classList.add("card")

         card.innerHTML = `
          <h5>${c.assignee}</h5>
          <p>${c.title}</p>
          <p>${c.status}</p>
          <p>${c.priority}</p>
         `
        if (c.status === "todo"){
            todo.appendChild(card)
        }else if(c.status === "in-progress"){
            inProgress.appendChild(card)
        }else{
            done.appendChild(card)
        }
    })
}
affichage()
