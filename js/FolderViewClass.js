class FolderView {
    constructor(
        topBarInFolder,
        leftMenuContainer,
        musicOuterContainer,
        albumCover,
        backButtonInFolder,
        editTracksButton,
        albumName,
        leftyPlayButton,
        leftyShuffleButton,
        musicContainer,
        storage,
        editView
    ) {
        this.topBarInFolder = topBarInFolder;
        this.leftMenuContainer = leftMenuContainer;
        this.musicOuterContainer = musicOuterContainer;
        this.albumCover = albumCover;
        this.backButtonInFolder = backButtonInFolder;
        this.editTracksButton = editTracksButton;
        this.albumName = albumName;
        this.leftyPlayButton = leftyPlayButton;
        this.leftyShuffleButton = leftyShuffleButton;
        this.musicContainer = musicContainer;
        this.storage = storage;
        this.editView = editView;
        this.trackArray = [];

        this.backButtonInFolder.addEventListener('click', () => {
            this.hide();
            storage.show('None');
        });

        this.leftyPlayButton.addEventListener('click', () => {
            this.play();
        });

        this.leftyShuffleButton.addEventListener('click', () => {
            this.shuffle();
        });

        this.editTracksButton.addEventListener('click', () => {
            this.editView.show(this.albumName.textContent);
        });
    }

    show(cover, name, trackArray) {
        this.musicOuterContainer.classList.remove('hidden');
        this.topBarInFolder.classList.remove('hidden');
        this.leftMenuContainer.classList.remove('hidden');
        this.musicContainer.innerHTML = '';

        this.albumCover.src = cover;
        this.albumName.textContent = name;

        // <div class="music-row-file odd">
        //     <div class="music-row-file-texts">
        //         <div class="music-row-file-number">1</div>
        //         <div class="music-row-file-name">Natural</div>
        //     </div>
        //     <div class="music-row-file-duration">3:09</div>
        // </div>

        for (let i = 0; i < trackArray.length; i++) {
            let node = document.createElement('div');
            node.classList.add('music-row-file');
            node.classList.add((i + 1) % 2 != 0 ? 'odd' : 'even');
            node.innerHTML = `
                <div class="music-row-file-texts">
                    <div class="music-row-file-number">${i + 1}</div>
                    <div class="music-row-file-name">${trackArray[i].name}</div>
                </div>
                <div class="music-row-file-duration">${''}</div>
            `;
            node.addEventListener('click', () => {
                PLAYER.push(trackArray[i]);
            });
            this.musicContainer.append(node);
        }
        this.trackArray = trackArray;
    }

    hide() {
        this.trackArray = [];
        this.musicContainer.innerHTML = '';
        this.musicOuterContainer.classList.add('hidden');
        this.topBarInFolder.classList.add('hidden');
        this.leftMenuContainer.classList.add('hidden');
    }

    play() {
        PLAYER.clear();
        for (let i = 0; i < this.trackArray.length; i++) {
            PLAYER.push(this.trackArray[i]);
        }
        PLAYER.play();
        PLAYER.isPlaying = true;
    }

    shuffle() {
        PLAYER.clear();
        for (let i = 0; i < this.trackArray.length; i++) {
            PLAYER.push(this.trackArray[i]);
        }
        PLAYER.shuffle();
        PLAYER.play();
        PLAYER.isPlaying = true;
    }
}

