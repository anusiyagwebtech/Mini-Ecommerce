const text = document.querySelectorAll('.round-text');
const apii = 'https://65d4bce93f1ab8c63435e2b2.mockapi.io/Form';

function getLength () {
    fetch(apii).then((res)=>res.json()).then((value)=> {
        let length = value.filter((val)=> val.cart).length;
        text.forEach((txt) => {
            txt.innerHTML = length;
        })
      
        console.log('I am written');
    })
}

getLength();

