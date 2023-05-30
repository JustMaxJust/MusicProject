class Track {
    constructor(name, audioSrc, coverSrc) {
        this.name = name;
        this.src = audioSrc;
        this.cover = coverSrc;
        this.audio = new Audio(audioSrc);
    }
}

class Album {
    constructor(name, coverSrc, tracks) {
        this.name = name;
        this.coverSrc = coverSrc;
        this.tracks = tracks;
    }
}