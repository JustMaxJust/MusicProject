function main() {
    

    /* Authorization */
    let loginContainer = document.querySelector('.login-container');
    let loginInput = document.querySelector('#login');
    let passwordInput = document.querySelector('#password');
    let signButton = document.querySelector('.login-button');

    /* Storage */
    let storageBar = document.querySelector('.logo-bar');
    let signOutButton = document.querySelector('.logo-bar-back');
    let editButton = document.querySelector('.logo-bar-edit');
    let storageContainer = document.querySelector('.folder-container');

    let albumEditView = new CreateAlbumView();
    let songEditView = new CreateSongView();

    /* Album Storage */
    let storage = new StorageView(
        storageBar,
        signOutButton,
        editButton,
        storageContainer,
        albumEditView,
        songEditView
    );
    let authorization = new AuthorizationView(
        loginContainer,
        loginInput,
        passwordInput,
        signButton,
        storage
    );

    // api.addAlbum('Max', 'Test', 'd/0/view');
}
main();
