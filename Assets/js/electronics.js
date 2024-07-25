const productContent = document.querySelector('.product-content');
const api = 'https://65d4bce93f1ab8c63435e2b2.mockapi.io/Form';
const createElement = (parent,tag, clas, id, ) => {
    const div = document.createElement(tag);
    parent.appendChild(div);
    if (clas) {
        clas.forEach((sclass) => {
            div.classList.add(sclass);
        }); 
    }
    return div;
}
const addToFavour = async (obj) => {
    const api = `https://65d4bce93f1ab8c63435e2b2.mockapi.io/Form/${obj.id}`;
    const update = !(obj.favour);
    console.log(update);
    try {
      const res =  await fetch(api, {
        method: 'PUT',
        body: JSON.stringify({favour: update}),
        headers: { 
            "Content-type": "application/json"
        }
    });
    const val = await res.json();
    console.log(val);
    // window.location.reload();
    const productCard = document.querySelector(`.product-card${obj.id}`);
    console.log(productCard);
    const favourIcon = productCard.querySelector('i.fa-heart');
    const favourText = productCard.querySelector('.favour-text');
    const text = productCard.querySelector('.text');

    console.log(favourIcon);
    
    if (val.favour) {
        favourIcon.style.color = "red";
        text.innerHTML = 'Remove From Favour';
    } else {
        favourIcon.style.color = "black";
        text.innerHTML = 'Add To Favour';
    }

    obj.favour = val.favour;
    return console.log(val);
    } catch (error) {
        return console.log(error);
    }   
}
const createProductCard = (heading,description,price, neww, favourObj, src) => {

    const productCard = createElement(productContent, 'div', ['product-card', `product-card${favourObj.id}` ]);
    const img = createElement(productCard,'div', ['img']);
    const image = createElement(img,'img',);
    image.src = src;
    if (neww) {
        const newTag = createElement(img,'div', ['new-tag']);
        newTag.innerHTML = 'New';
    }
   
    const producthover = createElement(img, 'div', ['product-hover']);
    // const p1 = createElement(producthover, 'p');
    // p1.innerHTML = 'Compare';
    // const i1 = createElement(p1, 'i', ['fa-solid', 'fa-code-compare']);
    const p2 = createElement(producthover, 'p');
    p2.innerHTML = 'Add to Cart';
    const i2 = createElement(p2, 'i', ['fa-solid', 'fa-cart-shopping']);
    p2.addEventListener('click', () => addToCart({...favourObj, cart: true, quantity: 1}));
    const p3 = createElement(producthover, 'p');
    p3.innerHTML = 'View Details';
    p3.addEventListener('click', ()=> ViewDetails(favourObj));
    
    const i3 = createElement(p3, 'i', ['fa-solid', 'fa-circle-info']);
    const p4 = createElement(producthover, 'p');
    const span4 = createElement(p4, 'span', ['text'] );    
    const i4 = createElement(p4, 'i', ['fa-solid', 'fa-heart']);
    if (favourObj.favour == true) {

        i4.style.color = "red"; 
        span4.innerHTML = 'Remove From Favour';

     }else {

        i4.style.color = "black"; 
        span4.innerHTML = 'Add To Favour';


     }


    p4.addEventListener('click', ()=> addToFavour(favourObj));
    
    const productPrice = createElement(productCard,'div', ['product-price']);
    const div1 = createElement(productPrice, 'div');
    const h3 = createElement(div1, 'h3');
    h3.innerHTML = heading;
    const para = createElement(div1, 'p');
    para.innerHTML = description;
    const div2 = createElement(productPrice, 'div');
    const para2 = createElement(div2, 'p');
    para2.innerHTML = price;
    
    
   return productCard; 

}
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
async function ViewDetails(obj) {
   
    const apiBase = 'https://65d4bce93f1ab8c63435e2b2.mockapi.io/Form';

    try {
        const allItemsRes = await fetch(apiBase);
        const allItems = await allItemsRes.json();
        console.log(allItems);
        
        const resetPromises = allItems.map((items)=>{
            if (items.detailShow) {
                return fetch(`${apiBase}/${items.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({detailShow: false}),
                     headers: {
                        "Content-Type": "application/json"
                    }
                }).then((res)=> res.json())
            }
            return Promise.resolve();
        })
        await Promise.all(resetPromises);

        const speciiedApi = `${apiBase}/${obj.id}`;
        const speciiedItemRes = await fetch(speciiedApi, {
           method: 'PUT',
           body: JSON.stringify({detailShow: true}),
           headers: {
            "Content-Type": "application/json"
           }
        })
    const updatedItem =  await speciiedItemRes.json();
    console.log(updatedItem);
    window.location.href = "product.html";
    } catch (error) {
        console.log(error);
    }
    

    // Update the specific item to show its details
    // const api = `https://65d4bce93f1ab8c63435e2b2.mockapi.io/Form/${obj.id}`;
    // try {
    //     const res = await fetch(api, {
    //         method: 'PUT',
    //         body: JSON.stringify({ detailShow: true }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     });
    //     const value_1 = await res.json();
    //     console.log(value_1);
    //     // window.location.href = "product.html";
    // } catch (reason) {
    //     console.log(reason);
    // }
}

function fetchDetails ()  {
    fetch(api).then((response)=> response.json()).then((value)=> {
      value.filter((value) => value.filterClass == "electronics").forEach((val) => {
        console.log('The fetched api is');
        const heading = val.detail;
        const description = val.description;
        const fullDetails = val.fullDetails;
        const price = val.price;
        const neww = val.new;
        const src = val.src;
        const obj = val;

        createProductCard(heading,description,price,neww,obj,src);
        console.log(val)
      })
      }).catch((reason)=> console.log(reason))
  }
  fetchDetails();

