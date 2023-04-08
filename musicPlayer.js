// müzik player sınıfının oluşturulması
class MusicPlayer {
  constructor(musicList) {
    this.musicList = musicList;
    this.musicİndex = 0;
  }
  getMusic(){
    return this.musicList[this.musicİndex];
  }
  next(){
    if(this.musicİndex+1!=this.musicList.length){
        this.musicİndex++
    }else{
        this.musicİndex=0;
    }
  }
  prev(){
    if(this.musicİndex!=0){
        this.musicİndex--
    }else{
        this.musicİndex=this.musicList.length-1;
    }
  }
}

let musicPlayer = new MusicPlayer(musicList);
