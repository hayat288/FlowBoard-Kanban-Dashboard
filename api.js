
// 1ere fetch 



//  export function recup (resolved , rejected){
// fetch("https://flowboard-api-virid.vercel.app/cards")
// .then(response =>{
//     if(!response.ok)
//         throw new Error(response.status)
//     return response.json()
// })
// .then(data => {

//     resolved(data)
// })
// .catch ( E =>{
//     rejected()
// })
// }

export function recup (resolved , rejected , title = "" , priority = ""){

    const url = new URL("/cards", "https://flowboard-api-virid.vercel.app")

    if (title !== "") {
        url.searchParams.set("title_like", title)         // live search
    }
    if (priority !== "") {
        url.searchParams.set("priority", priority)        // filtre par priority
    }

    fetch(url.toString())
    .then(response =>{
        if(!response.ok)
            throw new Error(response.status)
        return response.json()
    })
    .then(data => {
        resolved(data)
    })
    .catch ( E =>{
        rejected()
    })
}
