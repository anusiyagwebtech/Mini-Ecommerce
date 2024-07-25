function addToFavour(obj) {
    
    console.log(obj);
    const api = "https://65d4bce93f1ab8c63435e2b2.mockapi.io/Form";

    fetch(api,{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json()).then((value) => {
        console.log(value);
        window.location.href = "favour.html";
    }).catch((reason) => console.log(reason))
}