 const container = document.querySelector('.carousel-container');
 const indicatorContainer = document.querySelector('.indicators');
 const sliders = container.querySelectorAll('.slider');
 console.log(sliders);


 for (let i = 0; i < sliders.length; i++) {
    
     
   const a = document.createElement('div');
   indicatorContainer.appendChild(a);
   a.classList.add('slideIndicator');
//    console.log(sliders[i].querySelector('img').src);
  
 

 }
 const indicators = indicatorContainer.querySelectorAll('div');
indicators.forEach((ind,i) => {
    const indicatorImg = document.createElement('img');
    indicatorImg.src = sliders[i].querySelector('img').src;
    ind.appendChild(indicatorImg)
})

console.log(indicators);

 let timeout;
 console.log(indicators);
 console.log(container);


 sliders.forEach((slider,i)=>{
   slider.style.left = `${i*100}%`;
 })
const hi = (counter) => {
 sliders.forEach((slider,i)=>{
    slider.style.left = `${(i-counter)*100}%`;
    
  })
}
hi(0);

indicators.forEach((indicator, i,array) => {
    indicator.addEventListener('click', () => {
       array.forEach((value) => {
        if (value.classList.contains('active')) {
            value.classList.remove('active')
        }
       })
       clearTimeout(timeout);
        hi(i);
        reset();
        indicator.classList.add('active');
        
    })
})

const updateIndicatorStyle = (i) => {
  
    indicators.forEach((value) => {
        if (value.classList.contains('active')) {
            value.classList.remove('active')
        }
       })
       indicators[i].classList.add('active');
       console.log(sliders[i].querySelector('h2'));


}

 const reset = () => {
    let i = 0;
    let direction = true;
    let limit = sliders.length - 1;
  
  timeout =  setInterval(() => {
      if (direction) {
      hi(i);
      updateIndicatorStyle(i);
      i++;      
      if (i > limit) {
        direction = false;
        i--;
      }
    }
    else {
      i--;
      hi(i);
      updateIndicatorStyle(i);

      if (i == 0) {direction = true; i++;};
      
    }
    }, 2000);  

   }

   reset();

  