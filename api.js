

// fetch("https://flowboard-api-virid.vercel.app/cards")
// .then(response =>{
//     if(!response.ok)
//
//     return response.json()
// })
// .then(data => {

//     product = data
//    affichage(product)
// })


// export function recup (resolved , rejected , title = "" , priority = "", assignee = ""){

//     const params = new URLSearchParams()


//     if (title !== "") {
//         params.append("title", title)         // live search
//     }
//     if (priority !== "") {
//         params.append("priority", priority)        // filtre par priority
//     }
//     if (assignee !== ""){
//         params.append("assignee", assignee)        //filtre by member
//     } 

// const url = "https://flowboard-api-virid.vercel.app/cards?" + params.toString();    

//     fetch(url)
//     .then(response =>{
//         if(!response.ok)
//             throw new Error(response.status)
//         return response.json()
//     })
//     .then(data => {
//         resolved(data)
//     })
//     .catch ( E =>{
//         rejected()
//     })
// }

export async function recup(resolved, rejected, title = "", priority = "", assignee = "") {
    let objet = {}

    if (title.trim() !== "") {
        objet.q = title
    }
    if (priority.trim() !== "") {
        objet.priority = priority
    }

    if (assignee) {
        objet.assignee = assignee
    }

    try {
        const response = await axios.get(`https://flowboard-api-virid.vercel.app/cards`, {
            headers: {
                'X-Workspace': 'public'
            },
            params: objet
        })
        resolved(response.data)

    } catch (error) {
        rejected(error)
    }
}


export async function get_card(id) {
    return await axios.get('https://flowboard-api-virid.vercel.app/cards/' + id)
}


export async function create_card(data) {
    const options = {
        method: 'POST',
        url: 'https://flowboard-api-virid.vercel.app/cards?password=1234',
        headers: {
            'X-Workspace': 'public',
            'Content-Type': 'application/json'
        },
        data: data
    }

    try {
        const { data } = await axios.request(options)
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}



export async function modify_card(id, data) {
    const options = {
        method: 'PUT',
        url: 'https://flowboard-api-virid.vercel.app/cards/' + id + '?password=1234',
        headers: {
            'X-Workspace': 'public',
            'Content-Type': 'application/json'
        },
       
        data: data
    }

    try {
        const { data } = await axios.request(options)
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}


export async function delete_card(id){
    const options = {
        method: 'DELETE',
        url: 'https://flowboard-api-virid.vercel.app/cards/' + id + '?password=1234',
        headers: {
            'X-Workspace': 'public',
            'Content-Type': 'application/json'
        },

    } 
    try {
        const { data } = await axios.request(options)
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
        throw error
    }  

}