class API {
    constructor() {
        this.endpoint = `https://6423118477e7062b3e2a3a83.mockapi.io`;
    }

    async isExistingUser(login) {
        let response = await fetch(this.endpoint + `/users`);
        let data = await response.json();
        for (let i = 0; i < data.length; i++) {
            if (data[i]["login"] == login) {
                return true;
            }
        }
        return false;
    }

    async findUserIndex(login) {
        let response = await fetch(this.endpoint + `/users`);
        let data = await response.json();
        for (let i = 0; i < data.length; i++) {
            if (data[i]["login"] == login) {
                return Number(i);
            }
        }
        return -1;
    }

    async findUserId(login) {
        let response = await fetch(this.endpoint + `/users`);
        let data = await response.json();
        for (let i = 0; i < data.length; i++) {
            if (data[i]["login"] == login) {
                return Number(data[i]["id"]);
            }
        }
        return -1;
    }

    async isCorrectPassword(login, password) {
        let response = await fetch(this.endpoint + `/users`);
        let data = await response.json();
        for (let i = 0; i < data.length; i++) {
            if (data[i]["login"] == login && data[i]["password"] == password) {
                return true;
            }
        }
        return false;
    }

    async addAlbum(login, name, link) {
        console.log(link);
        let start = link.indexOf('d/') + 2;
        let end = link.indexOf('/view');
        if (start == -1 || end == -1) return;
        let src = 'https://drive.google.com/uc?export=view&id=';
        for (let i = start; i < end; i++) {
            src += link[i];
        }
        // console.log(src);
        let response = await fetch(this.endpoint + `/users`);
        let data = await response.json();
        // console.table(data);
        // console.log(await this.findUserIndex(login));
        data[await this.findUserIndex(login)]["albums"].push({
            "albumCoverSrc": src,
            "albumName": name,
            "tracks": []
        });
        response = await fetch(this.endpoint + `/users/${await this.findUserId(login)}`, {
            method: 'PUT',
            body: JSON.stringify({
                "albums": data[await this.findUserIndex(login)]["albums"]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // console.log('!');
    }


    async findAlbumIndex(album, data) {
        console.log('Searching for: ' + album);
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            if (data[i]["albumName"] == album) {
                return i;
            }
        }
        return -1;
    }


    async addSong(login, album, name, link) {
        console.log(name);
        console.log(link);
        let start = link.indexOf('d/') + 2;
        let end = link.indexOf('/view');
        if (start == -1 || end == -1) return;
        let src = 'https://drive.google.com/uc?export=view&id=';
        for (let i = start; i < end; i++) {
            src += link[i];
        }
        // console.log(src);
        let response = await fetch(this.endpoint + `/users`);
        let data = await response.json();
        // console.table(data);
        // console.log(await this.findUserIndex(login));
        let albumIndex = await this.findAlbumIndex(album, data[await this.findUserIndex(login)]["albums"]);
        console.log(albumIndex);
        data[await this.findUserIndex(login)]["albums"][albumIndex]["tracks"].push({
            "trackName": name,
            "trackSrc": src,
        });
        response = await fetch(this.endpoint + `/users/${await this.findUserId(login)}`, {
            method: 'PUT',
            body: JSON.stringify({
                "albums": data[await this.findUserIndex(login)]["albums"]/*[albumIndex]["tracks"]*/
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // console.log('!');
    }


    async createUser(login, password) {
        let response = await fetch(this.endpoint + `/users`, {
            method: 'POST',
            body: JSON.stringify({
                "login": login,
                "password": password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        console.log(password);
        return data;
    }

    async getUserLibrary(login) {
        let response = await fetch(this.endpoint + `/users`);
        let data = await response.json();
        let albums = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i]["login"] == login) {
                console.log('Found User');
                for (let j = 0; j < data[i]["albums"].length; j++) {
                    let tracks = [];
                    for (let k = 0; k < data[i]["albums"][j]["tracks"].length; k++) {
                        tracks.push(new Track(
                            data[i]["albums"][j]["tracks"][k]["trackName"], 
                            data[i]["albums"][j]["tracks"][k]["trackSrc"],
                            data[i]["albums"][j]["albumCoverSrc"]
                        ));
                    }
                    albums.push(new Album(data[i]["albums"][j]["albumName"], data[i]["albums"][j]["albumCoverSrc"], tracks));
                }
                break;
            }
        }
        console.log(albums);
        return albums;
    }
}
let api = new API();