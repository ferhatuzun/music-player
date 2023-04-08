// müzik sınıfının oluşturulması
class Music {
  constructor(title, singer, img, audio) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.audio = audio;
  }
  getName() {
    return this.title + " - " + this.singer;
  }
}

let musicList = [
  new Music("Ağlaya Ağlaya", "Tekir", "1.jpg", "1.mp3"),
  new Music("Vanilya", "Ece Mumay", "2.jpg", "2.mp3"),
  new Music("Çok İçince", "Eda Sakız", "3.jpg", "3.mp3"),
];
