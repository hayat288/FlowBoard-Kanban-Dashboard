import{recup} from "./api.js"

  const todo = document.getElementById("todo")
  const inProgress = document.getElementById("inProgress")
  const done = document.getElementById("done")
  const error = document.getElementById("error")
  const tryAgain = document.getElementById("tryAgain")

  const search = document.getElementById("search")
  const filter = document.getElementById("filter")


  function charger(){
    recup(affichage , errhandl , search.value.trim() , filter.value)
  }

  charger()


  function affichage(product){
    todo.innerHTML = ""
    inProgress.innerHTML = ""
    done.innerHTML = ""

    error.classList.add("d-none")
  
    product.forEach(function(c){


        const card = document.createElement("div")
        card.classList.add("card")
        
        const title= document.createElement("p")
        title.textContent = c.title

        const assignee = document.createElement("h4")
        assignee.textContent = c.assignee

        const  status = document.createElement("p")
        status.textContent = c.status

        const priority = document.createElement("p")
        priority.textContent = c.priority

        card.append( title, assignee, status, priority)
        
        if (c.status === "todo"){
            todo.appendChild(card)
        }else if(c.status === "in-progress"){
            inProgress.appendChild(card)
        }else{
            done.appendChild(card)
        }  
    })
  }

  function errhandl(){
    error.classList.remove("d-none")
  }

  tryAgain.addEventListener("click" , charger)

  search.addEventListener("input" , charger)      
  filter.addEventListener("change" , charger)
      
//  l'ajout


        const btnNew = document.getElementById("btn-new")
        const cards = document.getElementById("cards")
        const modale = document.getElementById("modale")
        const assignee = document.getElementById("assignee")
        const errnom = document.querySelector(".errnom")
        const title = document.getElementById("title")
        const errDesc = document.querySelector(".errDesc")
        const status = document.getElementById("status")
        const errStatus = document.querySelector(".errStatus")
        const Priority = document.getElementById("Priority")
        const errPriopity = document.querySelector(".errPriopity")
        const suivants = document.querySelector(".next")

   

        let tableau = []

        // l ouverture de modale

         function ouvrir() {
             modale.style.display = "block"
             modale.classList.add("show")
        }
        btnNew.addEventListener("click", ouvrir)

      // fermeture de modale

        window.onclick = function (event) {
       if (event.target === modale) {
        modale.style.display = "none"
      }
      }

        suivants.addEventListener("click", () => {
            errnom.textContent = ""
            errDesc.textContent = ""
            errStatus.textContent = ""
            errPriopity.textContent = ""
// validation des info 
            let valide = true
            if (assignee.value.trim() === "") {
                errnom.textContent = "champ invalide"
                valide = false
            }
            if (title.value.trim() === "") {
                errDesc.textContent = "champ invalide"
                valide = false
            }
            if (status.value.trim() === "") {
                errStatus.textContent = "champ invalide"
                valide = false
            }
            if (Priority.value.trim() === "") {
                errPriopity.textContent = "champ invalide"
                valide = false
            }

            if (valide) {
                const tab = {
                    assignee: assignee.value.trim(),
                    title: title.value.trim(),
                    status: status.value.trim(),
                    priority: Priority.value
                }
                tableau.push(tab)

                const card = document.createElement("div")
                card.className = "card p-3 mb-2 shadow-sm"

                const nom = document.createElement("h5")
                const desc = document.createElement("p")
                const stat = document.createElement("p")
                const pri = document.createElement("p")

                nom.textContent = tab.assignee
                desc.textContent = tab.title
                stat.textContent = tab.status
                pri.textContent =  tab.priority

                card.appendChild(nom)
                card.appendChild(desc)
                card.appendChild(stat)
                card.appendChild(pri)
                cards.appendChild(card)
                
                 if (tab.status === "todo") {
                    todo.appendChild(card)
                 } else if (tab.status === "in-progress") {
                    inProgress.appendChild(card)
                 } else {
                    done.appendChild(card)
                 }

                assignee.value = ""
                title.value = ""
                status.value = ""
                Priority.value = ""

    
            }
        })


