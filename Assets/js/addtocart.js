function addToCart(obj) {

    const api = `https://65d4bce93f1ab8c63435e2b2.mockapi.io/Form/${obj.id}`;
    fetch(api,{
        method: 'PUT',
        body: JSON.stringify({cart:true}),
        headers: { 
            "Content-type": "application/json"
        }
    }).then((response) => response.json()).then((value) => {
        console.log(value);
        window.location.href = "cart.html";
    }).catch((reason) => console.log(reason))
}