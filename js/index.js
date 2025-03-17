export var loginStat = false;

export async function callphpFunction(funcName, params = {}){
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
        //alert("Welcome again " + name + "!");
        loginStat = true;
    }
    else{
        alert("Please log in!")
    }
}

export function deleteCookie(cname){
    document.cookie = `loretracker_${cname}=none; expires=Mon, 17 Mar 2025 00:00:00 UTC`
}