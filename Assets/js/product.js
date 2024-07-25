const api = 'https://65d4bce93f1ab8c63435e2b2.mockapi.io/Form';
const image = document.getElementById('Image');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const keypoints = document.getElementById('keypoints');

console.log(image);

const fetchProducts = ()=> {

    fetch(api).then((res)=> res.json()).then((val) => {
    //    console.log(val);
      const hi = val.filter((value)=>value.detailShow)
      const firstArray = hi[0];
      console.log(firstArray);
      image.src = firstArray.src;
      title.innerHTML = firstArray.detail;
      price.innerHTML = `$${firstArray.price}`
      description.innerHTML = firstArray.description;
      keypoints.innerHTML = firstArray.fullDetails;
      const btn = document.getElementById('product-cart-btn');
      btn.addEventListener('click', ()=> {
        addToCart(firstArray);
      })

    }).catch((rea)=> console.log(rea))

}

// console.log(fetchProducts());
fetchProducts();

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