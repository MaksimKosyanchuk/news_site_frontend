import { API_URL } from "../config"


export const getUsers = async (query) => {
    if(query.length === 0) {
        return []
    }

    let queryString = ""
    
    if (query) {
        queryString = query.map(item => {
            const keys = Object.keys(item)

            return `${keys[0]}=${item[keys[0]]}`;
        }).join('&');
    }
    
    const result = await fetch(`${API_URL}/api/users/?${queryString}`)

    .then(res => res.json())
    .catch((err) => { 
        console.log(err)
        return ({
            status: "error",
            message: err,
            data: null
        })
    })

    return result
}
