class CreateAlbumView {
    constructor() {
        this.container = document.querySelector('.create-album-view-container');
        this.nameInput = document.querySelector('#alb-name');
        this.linkInput = document.querySelector('#alb-link');
        this.createButton = document.querySelector('.create-album-view-accept');
        this.cancelButton = document.querySelector('.create-album-view-cancel');
        this.createButton.addEventListener('click', () => {
            this.add();
        });
        this.cancelButton.addEventListener('click', () => {
            this.hide();
        });
    }

    show() {
        this.container.classList.remove('hidden');
    }
    hide() {
        this.container.classList.add('hidden');
    }
    async add() {
        if (this.nameInput.value == '' || this.linkInput.value == '') return;
        await api.addAlbum(localStorage.getItem("login"), this.nameInput.value, this.linkInput.value);
        this.container.classList.add('hidden');
        location.reload();
    }
}


class CreateSongView {
    constructor() {
        this.container = document.querySelector('.create-track-view-container');
        this.nameInput = document.querySelector('#tr-name');
        this.linkInput = document.querySelector('#tr-link');
        this.createButton = document.querySelector('.create-track-view-accept');
        this.cancelButton = document.querySelector('.create-track-view-cancel');
        this.createButton.addEventListener('click', () => {
            this.add();
        });
        this.cancelButton.addEventListener('click', () => {
            this.hide();
        });
    }

    show(album) {
        this.albumName = album;
        this.container.classList.remove('hidden');
    }
    hide() {
        this.container.classList.add('hidden');
    }
    async add() {
        if (this.nameInput.value == '' || this.linkInput.value == '') return;
        await api.addSong(localStorage.getItem("login"), this.albumName, this.nameInput.value, this.linkInput.value);
        this.container.classList.add('hidden');
        location.reload();
    }
}