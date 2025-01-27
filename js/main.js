async function callFunction(functionName, params = {}){
    try {
        const response = await fetch('../php/index.php', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                func : functionName,
                params : params,
            }),
        })

        let data = response.json()
        console.log(data)
    }
    catch (error) {
        console.log(error)
    }
}

function testcall1(){
    callFunction('gameLoadAll', { key1: 1 })
}

window.addEventListener('load', testcall1)