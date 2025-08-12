const loginContainer = document.querySelector('.login-container')
const registerBtn = document.querySelector('.reg')
const loginBtn = document.querySelector('.log')

registerBtn.addEventListener('click',()=>{
   loginContainer.classList.add('active') 
})

loginBtn.addEventListener('click',()=>{
    loginContainer.classList.remove('active')
})