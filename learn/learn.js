const reqURL = 'https://jsonplaceholder.typicode.com/users'

let headers={
    "Content-Type": 'application/json'
}

function sendRequest(method, url, body=null){
    return fetch(url, {
        method,
        body: JSON.stringify(body),
        headers
    }).then(response => {
        if(response.ok){
            return response.json()
        }
        return response.json().then(error=>{
            const e= new Error('error')
            e.data = error
            throw e
        })
    })


    // const xhr = new XMLHttpRequest()
    // return new Promise((resolve, reject)=>{
    //     xhr.open(method, url)
        
    //     xhr.responseType ='json'
    //     xhr.setRequestHeader('Content-Type', 'application/json')
        
    //     xhr.onload = () => {
    //         if (xhr.status>=400){
    //             console.log(xhr.response)
    //         } else
    //         console.log(xhr.response)
    //     }
        
    //     xhr.onerror = () =>{
    //         console.log(xhr.response)
    //     }
        
    //     xhr.send(JSON.stringify(body))
    //})
}

// sendRequest('GET', reqURL)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

sendRequest('POST', reqURL, {
    name: 'qwr',
    age: 24
}).then(data => console.log(data))
    .catch(err => console.log(err))