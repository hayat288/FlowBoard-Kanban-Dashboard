// export function recup (resolved , rejected , title = "" , priority = "", assignee = ""){

                 
//     if (title !== "") {
//         url.searchParams.set("title", title)         // live search
//     }
//     if (priority !== "") {
//         url.searchParams.set("priority", priority)        // filtre par priority
//     }
//     if (assignee !== ""){
//         url.searchParams.set("assignee", assignee)        //filtre by member
//     } 
        

const url = new URL("/cards", "https://flowboard-api-virid.vercel.app")    

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
// }
