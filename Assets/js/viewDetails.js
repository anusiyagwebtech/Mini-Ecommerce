async function ViewDetails(obj) {
    alert(obj.id);
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