class StorageView {
    constructor(
        storageBar,
        signOutButton,
        editButton,
        storageContainer,
        editView,
        songEditView
    ) {
        this.storageBar = storageBar;
        this.signOutButton = signOutButton;
        this.editButton = editButton;
        this.storageContainer = storageContainer;
        this.signOutButton = signOutButton;
        this.editButton = editButton;
        this.songEditView = songEditView;
        
        this.signOutButton.addEventListener('click', () => {
            this.hide();
            this.auth.show();
        });

        this.editButton.addEventListener('click', () => {
            editView.show();
        });
    }

    show(albums, auth) {
        this.auth = auth;
        if (albums != 'None') {
            this.albums = albums;
        } else {
            albums = this.albums;
        }
        this.storageBar.classList.remove('hidden');
        this.storageContainer.classList.remove('hidden');
        this.storageContainer.innerHTML = '';
        for (let i = 0; i < albums.length; i++) {
            let node = document.createElement('div');
            node.classList.add('folder');
            node.innerHTML = `
                <img class="folder-cover" src="${albums[i].coverSrc}"/>
                <p class="folder-name">${albums[i].name}</p>
            `;
            node.addEventListener('click', () => {
                this.openFolder(albums[i].coverSrc, albums[i].name, albums[i].tracks);
            });
            this.storageContainer.append(node);
        }
        // <div class="folder">
        //     <img class="folder-cover" src="https://drive.google.com/uc?export=view&id=1o1iJ5WXtLjDpmuDKtVhlHwRQ9GulB5an"/>
        //     <p class="folder-name">Origins</p>
        // </div>
    }

    hide() {
        this.storageBar.classList.add('hidden');
        this.storageContainer.classList.add('hidden');
        this.storageContainer.innerHTML = '';
    }

    openFolder(cover, name, tracks) {
        /* Folder */
        let topBarInfolder = document.querySelector('.top-bar');
        let leftMenuContainer = document.querySelector('.folder-lefty');
        let musicOuterContainer = document.querySelector('.music-row-outer-container');
        let albumCover = document.querySelector('.folder-lefty-img');
        let backButtonInFolder = document.querySelector('.top-bar-back');
        let editTracksButton = document.querySelector('.top-bar-edit');
        let albumName = document.querySelector('.folder-lefty-album-name');
        let leftyPlayButton = document.querySelector('#play');
        let leftyShuffleButton = document.querySelector('#shuffle');
        let musicContainer = document.querySelector('.music-row-container');
        let folder = new FolderView(
            topBarInfolder,
            leftMenuContainer,
            musicOuterContainer,
            albumCover,
            backButtonInFolder,
            editTracksButton,
            albumName,
            leftyPlayButton,
            leftyShuffleButton,
            musicContainer,
            this,
            this.songEditView
        );
        this.hide();
        folder.show(cover, name, tracks);
    }
}