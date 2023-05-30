class Player {
    constructor(
        playerContainer,
        playerImage, 
        playerName, 
        playerClearButton, 
        playerHideButton, 
        playerShowButton, 
        playerQueueContainer, 
        playerCurrentTime, 
        playerDuration, 
        playerProgressBarContainer,
        playerProgressBar,
        playerRepeatButton,
        playerBackwardButton,
        playerPlayButton,
        playerForwardButton,
        playerShuffleButton
    ) {
        this.playerContainer = playerContainer;
        this.playerImage = playerImage;
        this.playerName = playerName;
        this.playerClearButton = playerClearButton;
        this.playerHideButton = playerHideButton;
        this.playerShowButton = playerShowButton;
        this.playerQueueContainer = playerQueueContainer;
        this.playerCurrentTime = playerCurrentTime;
        this.playerDuration = playerDuration;
        this.playerProgressBarContainer = playerProgressBarContainer;
        this.playerProgressBar = playerProgressBar;
        this.playerRepeatButton = playerRepeatButton;
        this.playerBackwardButton = playerBackwardButton;
        this.playerPlayButton = playerPlayButton;
        this.playerForwardButton = playerForwardButton;
        this.playerShuffleButton = playerShuffleButton;

        this.queue = [];
        this.currentId = -1;
        this.currentAudio;
        this.isPlaying = false;
        this.isOnRepeat = false;

        this.playerHideButton.addEventListener('click', () => {
            this.playerContainer.classList.add('hidden');
            this.playerShowButton.classList.remove('hidden');
        });

        this.playerShowButton.addEventListener('click', () => {
            this.playerContainer.classList.remove('hidden');
            this.playerShowButton.classList.add('hidden');
        });

        this.playerClearButton.addEventListener('click', () => {
            this.clear();
        });

        this.playerShuffleButton.addEventListener('click', () => {
            this.shuffle();
        });

        this.playerPlayButton.addEventListener('click', () => {
            if (!this.isPlaying && this.queue.length) {
                this.play();
                this.isPlaying = true;
            }
            else if (this.queue.length) {
                this.pause();
                this.isPlaying = false;
            }
        });

        this.playerRepeatButton.addEventListener('click', () => {
            if (!this.isOnRepeat) {
                this.isOnRepeat = true;
                this.playerRepeatButton.classList.add('inshadow');
            } else {
                this.isOnRepeat = false;
                this.playerRepeatButton.classList.remove('inshadow');
            }
        });

        this.playerForwardButton.addEventListener('click', () => {
            this.next();
        });

        this.playerBackwardButton.addEventListener('click', () => {
            this.back();
        });

        this.playerProgressBarContainer.addEventListener('click', (e) => {
            if (!this.isPlaying) return;
            console.log('Click!');
            const width = this.playerProgressBarContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = this.currentAudio.duration;
            this.currentAudio.currentTime = (clickX / width) * duration;
        });
    }

    push(track) {
        this.queue.push(track);
        // console.log(this.queue.length);
        let node = document.createElement('div');
        node.classList.add('player-row-file');
        node.classList.add(this.queue.length % 2 == 0 ? 'even' : 'odd');
        node.innerHTML = `
            <div class="player-row-file-name">${track.name}</div>
            <div class="player-row-file-duration"></div>
        `;
        this.playerQueueContainer.append(node);
        // <div class="player-row-file odd isplaying">
        //         <div class="player-row-file-name">Natural</div>
        //         <div class="player-row-file-duration"></div>
        // </div>
    }

    shuffle() {
        console.log(this.currentId);
        if (this.queue.length == 0) return;
        for (let i = 0; i < this.queue.length * 2; i++) {
            let a = Math.floor(Math.random() * (this.queue.length));
            let b = Math.floor(Math.random() * (this.queue.length));
            let tmp = this.queue[a];
            this.queue[a] = this.queue[b];
            this.queue[b] = tmp;
        }
        if (this.currentId != -1 && this.currentAudio != 0) {
            console.log('Pause');
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.isPlaying = false;
        }
        this.currentId = 0;
        this.currentAudio = this.queue[this.currentId].audio;
        this.addListener();
        this.rerender();
        if (this.currentAudio != 0 && this.currentId != -1) {
            this.currentAudio.play();
            this.currentAudio.currentTime = 0;
            this.isPlaying = true;
            this.playerPlayButton.src = 'assets/Pause.png';
        }
        if (this.isPlaying == false) this.playerPlayButton.src = 'assets/Play.png';
        this.playerImage.src = this.queue[this.currentId].cover;
        this.playerName.src = this.queue[this.currentId].name;
    }

    clear() {
        this.queue = [];
        this.currentId = -1;
        if (this.isPlaying) {
            if(this.currentAudio != 0) {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
            }
            this.isPlaying = false;
        }
        this.isPlaying = false;
        this.currentAudio = 0;
        this.playerPlayButton.src = 'assets/Play.png';
        this.playerQueueContainer.innerHTML = '';
        this.playerImage.src = 'assets/NotPlaying.jpeg';
        this.playerName.textContent = 'Not Playing';
        this.playerProgressBar.style.width = 0;
        this.playerCurrentTime.textContent = `0:00`;
        this.playerDuration.textContent = `0:00`;
    }

    play() {
        if (this.queue.length == 0) return;
        if (this.currentId == -1) {
            this.currentId++;
            this.currentAudio = this.queue[this.currentId].audio;
            this.addListener();
        }
        this.rerender();
        this.playerImage.src = this.queue[this.currentId].cover;
        this.playerName.textContent = this.queue[this.currentId].name;
        this.playerPlayButton.src = 'assets/Pause.png';
        this.currentAudio.play();
    }

    pause() {
        this.playerPlayButton.src = 'assets/Play.png';
        this.currentAudio.pause();
    }

    rerender() {
        this.playerQueueContainer.innerHTML = '';
        for (let i = 0; i < this.queue.length; i++) {
            let node = document.createElement('div');
            node.classList.add('player-row-file');
            node.classList.add((i + 1) % 2 == 0 ? 'even' : 'odd');
            if (i == this.currentId) node.classList.add('isplaying');
            node.innerHTML = `
                <div class="player-row-file-name">${this.queue[i].name}</div>
                <div class="player-row-file-duration"></div>
            `;
            this.playerQueueContainer.append(node);
        }
    }

    next() {
        if(this.currentAudio != 0) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
        this.currentId++;
        if (this.currentId >= this.queue.length) this.currentId = 0;
        this.currentAudio = this.queue[this.currentId].audio;
        this.addListener();
        this.play();
    }

    back() {
        if(this.currentAudio != 0) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
        this.currentId--;
        if (this.currentId < 0) this.currentId = this.queue.length - 1;
        this.currentAudio = this.queue[this.currentId].audio;
        this.addListener();
        this.play();
    }

    addListener() {
        this.currentAudio.addEventListener('ended', () => {
            if (this.isOnRepeat) {
                this.currentAudio.currentTime = 0;
                this.currentAudio.play();
                this.isPlaying = true;
            } else {
                this.pause();
                this.isPlaying = false;
            }
        });
        this.currentAudio.addEventListener('timeupdate', (e) => {
            const {duration, currentTime} = e.srcElement;
            const progressPercent = (currentTime / duration) * 100;
            this.playerProgressBar.style.width = `${progressPercent}%`;
            this.playerCurrentTime.textContent = `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60) < 10 ? '0' + Math.floor(currentTime % 60) : Math.floor(currentTime % 60)}`;
            this.playerDuration.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60) < 10 ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60)}`
        });
        // this.playerProgressBarContainer.replaceWith(this.playerProgressBarContainer.cloneNode(true));
    }
}

/* Player */
let playerContainer = document.querySelector('.player');
let playerImage = document.querySelector('.player-row-cover');
let playerName = document.querySelector('.player-row-name');
let playerClearButton = document.querySelector('.player-row-upc-clear');
let playerHideButton = document.querySelector('.player-row-upc-hide');
let playerShowButton = document.querySelector('.player-minimized');
let playerQueueContainer = document.querySelector('.mid');
let playerCurrentTime = document.querySelector('.player-row-progress-curtime');
let playerDuration = document.querySelector('.player-row-progress-duration');
let playerProgressBarContainer = document.querySelector('.player-row-progress-bar');
let playerProgressBar = document.querySelector('.player-row-progress-innerbar');
let playerRepeatButton = document.querySelector('.player-row-button-repeat');
let playerBackwardButton = document.querySelector('.player-row-button-backward');
let playerPlayButton = document.querySelector('.player-row-button-play-pause');
let playerForwardButton = document.querySelector('.player-row-button-forward');
let playerShuffleButton = document.querySelector('.player-row-button-shuffle');

/* Player */
let PLAYER = new Player(
    playerContainer,
    playerImage, 
    playerName, 
    playerClearButton, 
    playerHideButton, 
    playerShowButton, 
    playerQueueContainer, 
    playerCurrentTime, 
    playerDuration, 
    playerProgressBarContainer,
    playerProgressBar,
    playerRepeatButton,
    playerBackwardButton,
    playerPlayButton,
    playerForwardButton,
    playerShuffleButton
);