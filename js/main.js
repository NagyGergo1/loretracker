async function callphpFunction(funcName, params = {}){
    try {
        let toSend = {
            "params" : params
        }

        let response = await fetch('http://localhost/13c-nagyg/loretracker/php/index.php/' + funcName, {
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

function createcookie(name, data){
    document.cookie = `${name}=${data}; Path=/;`
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkCookie(cname) {
    let name = getCookie(cname);
    if(name != ""){
        alert("Welcome again " + name + "!");
    }
    else{
        alert("Please log in!")
    }
  }

async function callAllFunc(){
    console.log(await loadLorepage1(), await gameList(), await getUserTracker(), await getUserData(), /*await createUserData(),*/ await getUserByName(), await getUserByEmail(), await getUserLogin())

    createcookie("name", "gergo")
    createcookie("email", "gergonagy1122@gmail.com")
    console.log(getCookie("name"))
    checkCookie("name")
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
}
window.addEventListener('load', callAllFunc)

//Steam API
async function steamRequest() {
    try {
        let valasz = await fetch('https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=2215430&key=525020EAA6719FA15214AF6D447A5FC7&format=json&steamid=76561198811836115')
        //let valasz = await fetch('https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=525020EAA6719FA15214AF6D447A5FC7&appid=2215430')

        let adatok = await valasz.json()
        
        if(valasz.ok){
            console.log(adatok.playerstats.achievements)
            //console.log(adatok.game.availableGameStats.achievements)
        }
        else alert("nem jo :c")

    } catch (error) {
        console.log(error)
    }
}
window.addEventListener('load', steamRequest)