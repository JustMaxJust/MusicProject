class AuthorizationView {
    constructor(
        loginContainer,
        loginInput,
        passwordInput,
        signButton,
        storage
    ) {
        this.loginContainer = loginContainer;
        this.loginInput = loginInput;
        this.passwordInput = passwordInput;
        this.signButton = signButton;
        this.storage = storage;

        let login = localStorage.getItem('login');
        let password = localStorage.getItem('password');
        if (login && password) {
            this.autoLogin(login, password);
        }

        signButton.addEventListener('click', () => {
            this.authorize();
        });
    }

    async authorize() {
        if (this.loginInput.value == '' || this.passwordInput.value == '') return;
        if (await api.isExistingUser(this.loginInput.value) ) {
            if (await api.isCorrectPassword(this.loginInput.value, this.passwordInput.value)) {
                this.loadIn(this.loginInput.value);
            } else {
                return;
            }
        } else {
            api.createUser(this.loginInput.value, this.passwordInput.value);
            this.loadIn(this.loginInput.value);
        }
    }

    async autoLogin(login, password) {
        if (await api.isExistingUser(login) ) {
            if (await api.isCorrectPassword(login, password)) {
                this.loadIn(login, false);
            } else {
                return;
            }
        }
    }

    async loadIn(login, flag = true) {
        let albums = await api.getUserLibrary(login);
        this.storage.show(albums, this);
        this.loginContainer.classList.add('hidden');
        PLAYER.playerShowButton.classList.remove('hidden');
        if (flag) {
            localStorage.setItem('login', this.loginInput.value);
            localStorage.setItem('password', this.passwordInput.value);
        }
        this.loginInput.value = '';
        this.passwordInput.value = '';
    }

    show() {
        localStorage.clear();
        this.loginContainer.classList.remove('hidden');
        this.authorize();
    }
}