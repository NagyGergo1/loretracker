async function callphpFunction(funcName, params = {}){
    try {
        let toSend = {
            "params" : params
        }

        let response = await fetch('http://localhost/loretracker/loretracker/php/index.php/' + funcName, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(toSend),
        })

        let data = await response.json()
        if(response.ok){
            
            data = (data.length > 1) ? data : data[0]
            return data
        }
        else{
            return data.valasz
        }
    }
    catch (error) {
        console.log(error)
    }
}

async function loadLorepage1(){
    let data = await callphpFunction('gameloadall', { id: 1 })
    return data
}

async function gameList(){
    let data = await callphpFunction('gameList')
    return data
}

async function getUserTracker(){
    let data = await callphpFunction('getUserTracker', { id: 3 })
    return data
}

async function getUserData(){
    let data = await callphpFunction('getUserData', { id: 3 })
    return data
}

async function callAllFunc(){
    console.log(await loadLorepage1(), await gameList(), await getUserTracker(), await getUserData())
}
window.addEventListener('load', callAllFunc)