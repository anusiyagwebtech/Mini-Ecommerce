const productList = document.querySelector(".products-detail-list");
const api = "https://65d4bce93f1ab8c63435e2b2.mockapi.io/Form";
let total = 0;

const updateQuantity = async (id, quantity) => {
  try {
    const res = await fetch(`${api}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ quantity: quantity }),
      headers: {
        "content-type": "application/json",
      },
    });
    const val = await res.json();
    return console.log(val);
  } catch (reason) {
    return console.log(reason);
  }
};


const fetchProducts = () => {
  // Clear the current product list
  productList.innerHTML = "";
  total = 0; // Reset total

  fetch(api)
    .then((response) => response.json())
    .then((value) => {
      if (value.filter((val) => val.cart).length) {
        value.filter((val) => val.cart).forEach((val) => {

                  
        
          const productDetails = document.createElement("div");
          const dFlex = document.createElement("div");
          const iconContainer = document.createElement("div");
          const img = document.createElement("img");
          const p = document.createElement("p");
          const dan = document.createElement("div");
          const btns = document.createElement("div");
          const icon = document.createElement("i");
          const increaseBtn = document.createElement("button");
          const countBtn = document.createElement("button");
          const decreaseBtn = document.createElement("button");
          const dan2 = document.createElement("div");
  
          productList.appendChild(productDetails);
          productDetails.classList.add("products-details");
  
          productDetails.appendChild(dFlex);
          dFlex.classList.add("d-flex");
  
          dFlex.appendChild(iconContainer);
          iconContainer.classList.add("iconContainer");
  
          iconContainer.appendChild(icon);
          icon.classList.add("fa-solid", "fa-xmark");
  
          dFlex.appendChild(img);
          dFlex.appendChild(p);
          productDetails.appendChild(dan);
          productDetails.appendChild(btns);
  
          btns.classList.add("btns");
  
          btns.appendChild(decreaseBtn);
          decreaseBtn.classList.add("decreasebtn");
          decreaseBtn.innerHTML = "-";
  
          btns.appendChild(countBtn);
          countBtn.classList.add("count-btn");
          countBtn.innerHTML = val.quantity;
          countBtn.setAttribute("data-num", val.id);
  
          btns.appendChild(increaseBtn);
          increaseBtn.classList.add("increasebtn");
          increaseBtn.innerHTML = "+";
  
          productDetails.appendChild(dan2);
          dan2.classList.add("d-flex", "dan2");
          dan2.innerHTML = `${val.price * val.quantity}$`;
  
          icon.setAttribute("data-number", val.id);
          img.src = val.src;
          p.innerHTML = val.detail;
          dan.innerHTML = `${val.price}$`;
          dan.classList.add("productprice");
  
          total += val.price * val.quantity;
          document.querySelector("#totalprice").innerHTML = `Total Price: ${total}$`;
  
          increaseBtn.addEventListener("click", async (e) => {
            const p = e.target.parentElement.querySelector('.count-btn').getAttribute('data-num');
            val.quantity++;
            await updateQuantity(p, val.quantity);
            countBtn.innerHTML = val.quantity;
            dan2.innerHTML = `${val.price * val.quantity}$`;
            total += Number(val.price);
            document.querySelector("#totalprice").innerHTML = `Total Price: ${total}$`;
          });
  
          decreaseBtn.addEventListener("click", async (e) => {
            if (val.quantity > 0) {
              const p = e.target.parentElement.querySelector('.count-btn').getAttribute('data-num');
              val.quantity--;
              await updateQuantity(p, val.quantity);
              countBtn.innerHTML = val.quantity;
              dan2.innerHTML = `${val.price * val.quantity}$`;
              total -= val.price;
              document.querySelector("#totalprice").innerHTML = `Total Price: ${total}$`;
            }
          });
  
          iconContainer.addEventListener("click", () => {
            fetch(`${api}/${icon.getAttribute("data-number")}`, {
              method: "PUT",
              body: JSON.stringify({cart:false}),
              headers: { 
                  "Content-type": "application/json"
              }
            })
              .then((response) => response.json()).then((value)=> {
                console.log(value);
                document.querySelector("#totalprice").innerHTML = `Total Price: ${0}$`;
                fetchProducts();
              })
              .catch((reason) => {
                console.log(reason);
                console.log("error");
              });
          });
        });
      }else {


       const div = document.createElement('div');
       productList.appendChild(div);
       div.style.display = "flex";
       div.style.justifyContent = "center";
       div.style.alignItems = "center";

       const img = document.createElement('img');
       div.appendChild(img);
       img.src = 'Assets/images/carousel/cartEmpty.png';
       document.querySelector("#totalprice").innerHTML = `Total Price: ${0}$`;

      }
      
    })
    .catch((reason) => console.log(reason));

};

// Initial fetch of products
fetchProducts();

const Reset = async () => {
  const response = await fetch(api);
  const data = await response.json();
  
  data.filter((val)=> val.cart).map((val,i)=> {
    fetch(`${api}/${val.id}`,{
      method: 'PUT',
      body: JSON.stringify({cart: false}),
      headers: { 
        "Content-type": "application/json"
    }
    }).then((response) => response.json()).then((value) => console.log(value)).catch((reason) => console.log(reason))
  })
   
  productList.innerHTML = "";
  total = 0;
  document.querySelector("#totalprice").innerHTML = `Total Price: ${total}$`; 
  console.log(data);
  const div = document.createElement('div');
  productList.appendChild(div);
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";

  const img = document.createElement('img');
  div.appendChild(img);
  img.src = 'Assets/images/carousel/cartEmpty.png';
  document.querySelector("#totalprice").innerHTML = `Total Price: ${0}$`;

}





