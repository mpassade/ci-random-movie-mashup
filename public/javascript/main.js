const regLoginContainer = document.getElementById('reg-login')
const loginContainer = document.getElementById('login')
const regBtn = document.querySelectorAll('.reg-col-btn')[0]
const logBtn = document.querySelectorAll('.reg-col-btn')[1]
const newRegBtn = document.getElementById('login-btn')
const txt = document.getElementById('login-txt')
const inputs = document.querySelectorAll('.inputs')
const forgotTxt = document.getElementById('forgot-pass-txt')
const form = document.querySelector('form')

const register = () => {
    const name = document.createElement('input')
    name.type = 'text'
    name.className = 'inputs'
    name.name = 'name'
    name.placeholder = 'Name'

    regLoginContainer.style.left = '500px'
    regLoginContainer.style.transition = 'left 1s'
    txt.innerText = 'REGISTER'
    forgotTxt.innerText = ''
    newRegBtn.innerText = 'REGISTER'
    form.action = '/api/v1/ejspassport/register'

    loginContainer.insertBefore(name, inputs[0])
    loginContainer.style.height = '312px'

    inputs[0].value = ''
    inputs[1].value = ''
}

const login = () => {
    regLoginContainer.style.left = '50px'
    txt.innerText = 'LOGIN'
    forgotTxt.innerText = 'Forgot Password?'
    newRegBtn.innerText = 'LOGIN'
    form.action = '/api/v1/ejspassport/login'

    document.querySelectorAll('.inputs')[0].remove()
    loginContainer.style.height = '250px'

    inputs[0].value = ''
    inputs[1].value = ''
}

regBtn.addEventListener('click', register)
logBtn.addEventListener('click', login)