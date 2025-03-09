function $(id) {
    return document.getElementById(id);
}

async function callphpFunction(funcName, params = {}){
    try {
        let toSend = {
            "params" : params
        }

        let response = await fetch('http://localhost/Iskolai_Munka/Projekt%20Munka/loretracker/php/index.php/' + funcName, {
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

async function bejelentkezes() {
    let userEmail = $("loginEmail").value;
    let userPass = $("loginPassword").value;

    let userAdatok = await callphpFunction("getUserLogin", {email : userEmail, password : userPass});
    console.log(userAdatok);
}