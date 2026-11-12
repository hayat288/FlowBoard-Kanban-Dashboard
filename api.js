

 export function recup (resolved , rejected){
fetch("https://flowboard-api-virid.vercel.app/cards")
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


