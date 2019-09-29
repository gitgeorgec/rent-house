let defaultToken

export function setDefaultToken(token){
    if(token){
        defaultToken = token
    } else {
        return
    }
}

export function apiCall(method, path, data, token=defaultToken){
        return fetch(path,{
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify(data)
            })
            .then(res=>{
                if(!res.ok) {
                    if(res.status >=400 && res.status <500){
                        return res.json().then(err=>{
                            throw err
                        })
                    }else {
                        let err = {errorMessage: 'Please try again later, server is not responsed'}
                        throw err
                    }
                }
                return res.json()
            })
}

export const URL = "https://frozen-cove-63878.herokuapp.com/"
// export const URL = "http://localhost:8081/"
