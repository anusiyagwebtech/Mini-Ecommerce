const filterParent = document.querySelector('.search-items');
const createeElement = (parent,tag, clas, id, ) => {
    const div = document.createElement(tag);
    parent.appendChild(div);
    if (clas) {
        clas.forEach((sclass) => {
            div.classList.add(sclass);
        }); 
    }
    return div;
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
    

  
}




function expand(it) {
    console.log(it);
    const dropdownChild = it.nextElementSibling;
    console.log(dropdownChild);
    // const dropdownChild = it.querySelector('.dropdown-child');
    const dropdownChildStyle= window.getComputedStyle(dropdownChild);
    const height = dropdownChildStyle.height;
    dropdownChild.style.height =  height === '0px' ? `${dropdownChild.scrollHeight}px`: '0px';
}

const createSearchProducts = (src,heading, description, price, obj)=> {
  const searchitem = createeElement(filterParent, 'div', ['searchitem']);
  const img = createeElement(searchitem, 'img' );
  img.src = src;
  const searchcontent = createeElement(searchitem, 'div', ['searchcontent']);
  const h5 = createeElement(searchcontent,'h5');
  const a = createeElement(h5, 'a');
  a.innerHTML = heading;
  searchitem.addEventListener('click', ()=> {
    ViewDetails(obj);
  })
  const p = createeElement(searchcontent, 'p');
  p.innerHTML = description;
  const p2 = createeElement(searchcontent, 'p');
  p2.innerHTML = "Price: ";
  const span = createeElement(p2, 'span');
  span.innerHTML = `$${price}`;

  return searchitem;
}



const fetchSearchProducts = ()=> {
    const api = 'https://65d4bce93f1ab8c63435e2b2.mockapi.io/Form';

    fetch(api).then((res)=> res.json()).then((val) => {
        val.forEach((item)=> {
            createSearchProducts(item.src, item.detail, item.description, item.price, item);
        })
    const searchBarInput = document.getElementById('search-bar-input');
    const filterELements = document.querySelectorAll(".search-items .searchitem");

   searchBarInput.addEventListener('input', (e) => {
    let searchtext = e.target.value.toLowerCase().trim();    
    filterELements.forEach((value, index) => {
       value.style.display = "none";
       let text = value.querySelector('h5 a').innerHTML.toLowerCase();
       if (text.indexOf(searchtext) > -1) {
        value.style.display = "flex";    
       } 
       if (searchtext == "") {
        value.style.display = "none";        
       }  
       
    }); 

   
   })

    }).catch((reason) => console.log(reason));
}

fetchSearchProducts();

console.log(filterParent);

const sidebarLeft = document.getElementById('sidebar-left');
function openside() {  
  sidebarLeft.classList.add('open');
  if (sidebarLeft.classList.contains('close')) {
    sidebarLeft.classList.remove('close');
    
  }
}
function Closeside() {
    sidebarLeft.classList.add('close');
    if (sidebarLeft.classList.contains('open')) {
        sidebarLeft.classList.remove('open');
        
      }
}


window.addEventListener('load', ()=> {
    const element = document.querySelector('.loader');
  
    element.style.display = "none";

})