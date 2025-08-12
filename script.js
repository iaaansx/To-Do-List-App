const loginContainer = document.querySelector('.login-container')
const registerBtn = document.querySelector('.btn-register')
const loginBtn = document.querySelector('.btn-login')

registerBtn.addEventListener('click',()=>{
   loginContainer.classList.add('active') 
})

loginBtn.addEventListener('click',()=>{
    loginContainer.classList.remove('active')
})