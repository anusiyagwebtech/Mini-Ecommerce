const mailBox = document.getElementById('subscribeInputBox');

const btnDom = document.getElementById('subscribebtn');
const mailDom = document.getElementById('subscribeEmail');
const error = document.getElementById('subscribeError');
subscribeCheck();
 
function subscribe() {
   
    const mail = mailDom.value;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(pattern.test(mail)) {
        window.localStorage.setItem('email', mail);
        mailDom.value = '';
        subscribeCheck();
    } else {
       
       

        error.innerHTML = "Enter a valid Email";
        error.classList.add('subscribeerror');
    }

    
}



function subscribeCheck() {
    const subscribeEmail = localStorage.getItem('email');
console.log(subscribeEmail);

 if (subscribeEmail !== null) {
    const div = document.createElement('p');
    mailBox.appendChild(div);
    div.innerHTML = "Subscribed Successfully";
    div.classList.add('subscribe');   
    mailDom.style.display = 'none';
    btnDom.style.display = 'none';   
    error.innerHTML = ""; 
    
 }
 }