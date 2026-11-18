import { recup, create_card, modify_card, get_card, delete_card } from "./api.js"

const todo = document.getElementById("todo")
const inProgress = document.getElementById("inProgress")
const done = document.getElementById("done")
const error = document.getElementById("error")
const tryAgain = document.getElementById("tryAgain")

const search = document.getElementById("search")
const filter = document.getElementById("filter")
const member = document.getElementById("member")


const modalDelete = document.getElementById("modalDelete")
const suppTexte = document.getElementById("suppTexte")
const suppErreur = document.getElementById("suppErreur")
const annulerSupp = document.getElementById("annulerSupp")
const confirmerSupp = document.getElementById("confirmerSupp")

let carteASupprimer = null

let allCards = []

function charger() {
    recup(data => {
        allCards = data
        appliquerFiltres()
    }, errhandl)
}

function appliquerFiltres() {
    const texte = search.value.trim().toLowerCase()
    const prio = filter.value
    const membre = member.value

    const resultat = allCards.filter(c =>
        c.title.toLowerCase().includes(texte) &&
        (prio === "" || c.priority === prio) &&
        (membre === "" || c.assignee === membre)
    )
    affichage(resultat)
}

charger()

search.addEventListener("input", appliquerFiltres)
filter.addEventListener("change", appliquerFiltres)
member.addEventListener("change", appliquerFiltres)


function affichage(product) {
    todo.innerHTML = ""
    inProgress.innerHTML = ""
    done.innerHTML = ""

    error.classList.add("d-none")

    product.forEach(function (c) {

        const card = document.createElement("div")
        card.classList.add("card", "p-3", "shadow-sm", "d-flex", "flex-column")

        const title = document.createElement("p")
        title.textContent = c.title

        const assignee = document.createElement("h4")
        assignee.textContent = c.assignee

        const status = document.createElement("p")
        status.textContent = c.status

        const priority = document.createElement("p")
        priority.textContent = c.priority


        const btnModif = document.createElement("button")
        btnModif.className = "btn btn-outline-secondary btn-sm rounded-pill px-3"
        btnModif.textContent = "Modifier"
        btnModif.setAttribute("data-id", c.id)
        btnModif.addEventListener("click", () => ouvrirModif(c))


        const btnSupp = document.createElement("button")
        btnSupp.className = "btn btn-outline-danger btn-sm rounded-pill px-3"
        btnSupp.textContent = "Supprimer"
        btnSupp.setAttribute("data-id", c.id)
        btnSupp.addEventListener("click", () => ouvrirSupp(c))


        card.append(title, assignee, status, priority, btnModif, btnSupp)

        if (c.status === "todo") {
            todo.appendChild(card)
        } else if (c.status === "in-progress") {
            inProgress.appendChild(card)
        } else {
            done.appendChild(card)
        }
    })
}

function errhandl() {
    error.classList.remove("d-none")
}

tryAgain.addEventListener("click", charger)

function ouvrirSupp(c) {
    carteASupprimer = c

    suppTexte.textContent =
        `Voulez-vous vraiment supprimer "${c.title}" ?`

    suppErreur.classList.add("d-none")

    modalDelete.style.display = "block"
    modalDelete.classList.add("show")
}

//  l'ajout et modification

const btnNew = document.getElementById("btn-new")
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

let idModif = null

// l ouverture de modale (ajout)

function ouvrir() {
    modale.style.display = "block"
    modale.classList.add("show")
}
btnNew.addEventListener("click", ouvrir)

// l ouverture de modale (modification)

function ouvrirModif(c) {
    idModif = c.id
    assignee.value = c.assignee || ""
    title.value = c.title || ""
    status.value = c.status || ""
    Priority.value = c.priority || ""
    modale.style.display = "block"
    modale.classList.add("show")
}

// fermeture de modale

window.onclick = function (event) {
    if (event.target === modale) {
        modale.style.display = "none"
    }
}

suivants.addEventListener("click", async () => {
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



        try {
            if (idModif) {
                await modify_card(idModif, tab)
            } else {
                await create_card(tab)
            }
            modale.style.display = "none"
            charger()
        } catch (e) {
            errhandl()
        }
    }
})