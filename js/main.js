let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('visible');
});

// const regExpValidEmail = /^\w+@\w\.\w{2,}$/;
const regExpValidEmail = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-signup');
const forgetPassword = document.querySelector('.login-forget');
const currentUserElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUserName = document.querySelector('.edit-username');
const editAvatar = document.querySelector('.edit-avatar');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');

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
        if(!regExpValidEmail.test(email)) {
            alert('Email isn\'t valid');
            return; 
        }
        const user = this.getUser(email);
        if(user && user.password === password) {
            this.userAuthorization(user);
            handler();
        } else {
            alert('The user with this password is not defined.');
        }
    },
    LogOut(handler) {
        // console.log('Log Out');
        this.user = null;
        handler();
    },
    SignUp(email, password, handler) {
        // console.log('Sign Up');
        if(!regExpValidEmail.test(email)) {
            alert('Email isn\'t valid');
            return; 
        }
        if(!email.trim() || !password.trim()) {
            alert('Email and password fields haven\'t been entered.');
            return;
        }
        if(!this.getUser(email)) {
            const user = {
                email,
                password,
                displayName: email.substring(0, email.indexOf('@'))
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
    editUser(userName, userAvatar, handler) {
        if(userName) {
            this.user.displayName = userName;
        };
        if(userAvatar) {
            this.user.avatar = userAvatar;
        };
        handler();
    },
};

const setPosts = {
    allPosts: [
        {
            title: 'Заголовок поста',
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Злых, имеет запятых. Маленькая заманивший образ, ipsum продолжил щеке, всеми маленький свою свой великий, если то. Большого семантика осталось текстами. Переписали имени жизни своих меня ты. Мир, щеке буквоград. Все, меня силуэт агентство взгляд инициал свое подзаголовок свой оксмокс власти выйти взобравшись, до текста! Переулка текстов снова образ сбить продолжил. Парадигматическая вопрос выйти ведущими щеке журчит дорогу пунктуация вскоре меня, взгляд точках! Снова составитель заглавных проектах грустный. Собрал сих рыбного lorem последний что текста толку оксмокс наш ты строчка! Взгляд!',
            tags: [
                'свежее',
                'новое',
                'горячее',
                'мое',
                'случайность'
            ],
            author: 'maks@gmail.com',
            date: '11.11.2020, 15:05:44',
            like: 75,
            comments: 20,
        },
        {
            title: 'Заголовок поста',
            text: 'HTML (от англ. HyperText Markup Language — «язык гипертекстовой разметки») — стандартизированный язык разметки веб-страниц во Всемирной паутине. Код HTML интерпретируется браузерами; полученная в результате интерпретации страница отображается на экране монитора компьютера или мобильного устройства.',
            tags: [
                'свежее',
                'новое',
                'горячее',
                'случайность'
            ],
            author: 'rita@gmail.com',
            date: '10.10.2020, 12:35:12',
            like: 35,
            comments: 17,
        }
    ],
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user:', user);
    
    if(user) {
        currentUserElem.style.display = '';
        loginElem.style.display = 'none';
        userNameElem.textContent = user.displayName; //.split('\@')[0];
        userAvatarElem.src = user.avatar || userAvatarElem.src;
        // userAvatarElem.src = user.avatar ? user.avatar : userAvatarElem.src;
    } else {
        currentUserElem.style.display = 'none';
        loginElem.style.display = '';
    }
};

const showAllPosts = () => {
    let postsHTML = '';

    setPosts.allPosts.forEach(({ title, text, date, author, like, comments, tags }) => {

        postsHTML += `
            <section class="post">
                <div class="post-body">
                    <h2 class="post-title">
                        ${title}
                    </h2>
                    <p class="post-text">
                        ${text}
                    <div class="tags">
                        <a href="#" class="tag">
                            ${tags}
                        </a>
                    </div>
                </div>
                <!-- /.post-body -->
                <div class="post-footer">
                    <div class="post-buttons">
                        <button class="post-button likes">
                            <svg width="19" height="20" class="icon icon-like">
                                <use xlink:href="images/icons.svg#like"></use>
                            </svg>
                            <span class="likes-counter">${like}</span>
                        </button>
                        <button class="post-button comments">
                            <svg width="21" height="21" class="icon icon-comment">
                                <use xlink:href="images/icons.svg#comments"></use>
                            </svg>
                            <span class="comments-counter">${comments}</span>
                        </button>
                        <button class="post-button save">
                            <svg width="20" height="20" class="icon icon-save">
                                <use xlink:href="images/icons.svg#save"></use>
                            </svg>
                        </button>
                        <button class="post-button share">
                            <svg width="17" height="19" class="icon icon-share">
                                <use xlink:href="images/icons.svg#share"></use>
                            </svg>
                        </button>
                    </div>
                    <!-- /.post-buttons -->
                    <div class="post-author">
                        <div class="author-about">
                            <a href="#" class="author-username">${author.split('\@')[0]}</a>
                            <span class="post-time">${date}</span>
                        </div>
                        <a href="#" class="author-link"><img src="./images/avatar.jpeg" alt="avatar" class="author-avatar"></a>
                    </div>
                    <!-- /.post-author -->
                </div>
            </section>
        `;
    });

    postsWrapper.innerHTML = postsHTML;
};

const init = () => {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;
    
        setUsers.LogIn(emailValue, passwordValue, toggleAuthDom);
        loginForm.reset();
        // toggleAuthDom();
    });
    
    loginSignUp.addEventListener('click', e => {
        e.preventDefault();
        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;
    
        setUsers.SignUp(emailValue, passwordValue, toggleAuthDom);
        loginForm.reset();
        // toggleAuthDom();
    });
    
    forgetPassword.addEventListener('click', e => {
        e.preventDefault();
        setUsers.ForgetPass();
    });
    
    exitElem.addEventListener('click', e => {
        e.preventDefault();
        setUsers.LogOut(toggleAuthDom);
    });
    
    editElem.addEventListener('click', e => {
        e.preventDefault();
        editContainer.classList.toggle('visible');
        editUserName.value = setUsers.user.displayName;
    });
    
    editContainer.addEventListener('submit', e => {
        e.preventDefault();
        setUsers.editUser(editUserName.value, editAvatar.value, toggleAuthDom);
        editContainer.classList.remove('visible');
    });

    showAllPosts();
    toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', init);
