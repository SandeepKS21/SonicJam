
export interface songInterface {
    id: number,
    title: string,
    url: string,
    artist: string,
    artwork: string
}

export interface playlistInterface {
    length: number;
    playlistName: string,
    song: songInterface[],
}

export interface loadingInterface {
    playlist: boolean,
    

}