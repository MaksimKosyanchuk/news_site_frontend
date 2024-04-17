import { API_URL } from "../config"


export const getPosts = async (query) => {
    let queryString = ""

    if(query) {
        queryString = Object.entries(query).map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(id => `${key}=${id}`).join('&')
            }
            return `${key}=${value}`
        }).join('&')
    }
    
    const result = await fetch(`${API_URL}/api/posts?${queryString}`)
    .then(res => res.json())
    .then(res => {
        return res
    })
    .catch((err) => { 
        console.log(err)
        return result
    })

    return result
}
