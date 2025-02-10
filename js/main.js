async function callphpFunction(funcName, params = {}){
    try {
        let toSend = {
            "params" : params
        }

        let response = await fetch('http://localhost/13c-nagyg/php/index.php/' + funcName, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(toSend),
        })

        if(response.ok){
            let data = await response.json()
            return data
        }
        else{
            throw response.status
        }
    }
    catch (error) {
        console.log(error)
    }
}

async function loadLorepage1(){
    let data = await callphpFunction('gameloadall', { id: 1 })
    data = data[0]
    return data
}

async function gameList(){
    let data = await callphpFunction('gameList')
    return data
}

async function getUserTracker(){
    let data = await callphpFunction('getUserTracker', { id: 2 })
    data = data[0]
    return data
}

async function getUserData(){
    let data = await callphpFunction('getUserData', { id: 3 })
    data = data[0]
    return data
}

async function callAllFunc(){
    console.log(await loadLorepage1(), await gameList(), await getUserTracker(), await getUserData())
}
window.addEventListener('load', callAllFunc)