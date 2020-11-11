let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('visible');
});

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-signup');
const forgetPassword = document.querySelector('.login-forget');
const currentUserElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const listUsers = [
    {
        id: '01',
        email: 'maks@gmail.com',
        password: '232323',
        displayName: 'MaksJS',
    },
    {
        id: '02',
        email: 'rita@gmail.com',
        password: '212121',
        displayName: 'RitaKillMaks',
    },
];

const setUsers = {
    user: null,
    LogIn(email, password, handler) {
        // console.log('Log In');
        // console.log(email, password);
        const user = this.getUser(email);
        if(user && user.password === password) {
            this.userAuthorization(user);
            handler();
        } else {
            alert('The user with this password is not defined.');
        }
    },
    LogOut() {
        console.log('Log Out');
    },
    SignUp(email, password, handler) {
        // console.log('Sign Up');
        if(!this.getUser(email)) {
            const user = {
                email,
                password,
                displayName: email
            };
            listUsers.push(user);
            this.userAuthorization(user);
            handler();
            // console.log(listUsers);
        } else {
            alert('The user with this email is already registered.');
        }
    },
    getUser(email) {
        return listUsers.find((item) => item.email === email);

        // let user = null;
        // for (let i = 0; i < listUsers.length; i++) {
        //     if (listUsers[i].email === email) {
        //         user = listUsers[i];
        //         break;
        //     };
        // };
        // return user;
    },
    userAuthorization(user) {
        this.user = user;
    },
    forgetPass() {
        console.log('Forget password?')
    },
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user:', user);
    
    if(user) {
        currentUserElem.style.display = '';
        loginElem.style.display = 'none';
        userNameElem.textContent = user.displayName.split('\@')[0];
    } else {
        currentUserElem.style.display = 'none';
        loginElem.style.display = '';
    }
};

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.LogIn(emailValue, passwordValue, toggleAuthDom);
    // toggleAuthDom();
});

loginSignUp.addEventListener('click', e => {
    e.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.SignUp(emailValue, passwordValue, toggleAuthDom);
    // toggleAuthDom();
});

forgetPassword.addEventListener('click', e => {
    e.preventDefault();
    setUsers.ForgetPass();
});

toggleAuthDom();