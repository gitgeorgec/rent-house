export function apiCall(method, path, data){
    return fetch(path,{
            method,
            data
        })
        .then(res=>res.data)
        .cathc(err => {
            return err.response.data.err
        })
}