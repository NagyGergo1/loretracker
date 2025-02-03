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

async function testcall1(){
    let data = await callphpFunction('gameloadall', { key1: 1})

    console.log(data)
}

window.addEventListener('load', testcall1)