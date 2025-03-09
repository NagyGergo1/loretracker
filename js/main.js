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
    return await callphpFunction('gameloadall', { id: 1 })
}

async function gameList(){
    return await callphpFunction('gameList')
}

async function getUserTracker(){
    return await callphpFunction('getUserTracker', { id: 1 })
}

async function getUserData(){
    return await callphpFunction('getUserData', { id: 3 })
}

async function createUserData() {
    return await callphpFunction('createUserData', { userName: "tesztuser", password: "asd123", email: "joemail@email.com", steamID: "ijdgsiu298479" })
}

async function getUserByName() {
    return await callphpFunction('getUserByName', { name: "gergo" })
}

async function getUserByEmail() {
    return await callphpFunction('getUserByEmail', { email: "gergonagy1122@gmail.com" });
}

async function getUserLogin() {
    return await callphpFunction('getUserLogin', { email: "gergonagy1122@gmail.com", password: "asd123" })
}

async function callAllFunc(){
    console.log(await loadLorepage1(), await gameList(), await getUserTracker(), await getUserData(), /*await createUserData(),*/ await getUserByName(), await getUserByEmail(), await getUserLogin())
}
window.addEventListener('load', callAllFunc)