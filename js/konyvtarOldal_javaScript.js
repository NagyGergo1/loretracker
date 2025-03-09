function $(id) {
    return document.getElementById(id);
}

function szures() {
    let filterSzures = $("konyvtarOldal_konyvtarFilter").value;
    let keresoSzures = $("konyvtarOldal_konyvtarKereses").value;
    if (filterSzures != "" || keresoSzures != "") {
        let szurtJatekok = document.getElementsByClassName(filterSzures);
        for (let i = 0; i < szurtJatekok.length; i++) {
            console.log(szurtJatekok[i]);
            $("kartya_row").innerHTML += szurtJatekok[i];
        }
    }
}