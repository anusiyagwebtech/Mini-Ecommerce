
const scrollContainer = document.querySelector('.slider-container-s');
const sliderCard = document.querySelector('.items-s');
const width = sliderCard.getBoundingClientRect().width;

const scrollWidth = scrollContainer.scrollWidth;
const containrWidth = scrollContainer.getBoundingClientRect().width;

console.log(containrWidth);
console.log(scrollWidth);

const  overflow = scrollWidth - containrWidth;
console.log(overflow);

function nextSlider(it) {

    if (scrollContainer.scrollLeft == overflow) {
       
    }
     
    console.log(scrollContainer.scrollLeft);
    
     scrollContainer.scrollBy({top: 0, left: width, behavior: 'smooth'});

}
function backSlider(it) {
    if (scrollContainer.scrollLeft == 0) {
       
    }

    console.log(scrollContainer.scrollLeft);
    
    scrollContainer.scrollBy({top: 0, left: -width, behavior: 'smooth'});

}