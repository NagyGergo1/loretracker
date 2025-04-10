export function $(id) {
    return document.getElementById(id);
}

export var loginStat = false;

export var tempLogin = false;

export async function callphpFunction(funcName, params = {}){
    try {
        let toSend = {
            "params" : params
        }
        //Otthon
        //let response = await fetch('http://localhost/Iskolai_Munka/Projekt%20Munka/loretracker/php/index.php/' + funcName, {

        //Iskola
        //let response = await fetch('http://localhost/fodor/vizsgaRemek/loretracker/php/index.php/' + funcName, {

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

export function setCookie(name, data){
    document.cookie = `loretracker_${name}=${data};`
}

export function getCookie(cname) {
    let name = "loretracker_" + cname + "=";
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

export function checkCookie(cname) {
    let name = getCookie(cname);
    if(name != ""){
        loginStat = true;
    }
}

export function deleteCookie(cname){
    document.cookie = `loretracker_${cname}=none; expires=Mon, 17 Mar 2025 00:00:00 UTC`
}

export async function steamRequest(jatekAzon, steamAzon) {
//export async function steamRequest() {
    try {
        let valasz1 = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=${jatekAzon}&key=525020EAA6719FA15214AF6D447A5FC7&format=json&steamid=${steamAzon}`)

        //let valasz1 = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=2215430&key=525020EAA6719FA15214AF6D447A5FC7&format=json&steamid=76561198811836115`)

        //let valasz2 = await fetch(`https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=525020EAA6719FA15214AF6D447A5FC7&appid=2215430`)
        //console.log(adatok2.game.availableGameStats.achievements)

        let adatok1 = await valasz1.json()
        
        if(valasz1.ok){
            console.log(adatok1.playerstats.achievements)
            return adatok1.playerstats.achievements;
        }
        
        else {
            return false;
        }

    } catch (error) {
        console.log(error)
    }
}

export function setSession(key, value) {
    sessionStorage.setItem(key, value);
}

export function getSession(key) {
    return sessionStorage.getItem(key);
}

export function removeSession(key) {
    sessionStorage.removeItem(key);
}