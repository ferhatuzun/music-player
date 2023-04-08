let container = document.querySelector(".container");
let musicİmg = document.querySelector("#musicİmg");
let musicAudio = document.querySelector("#musicAudio");
let title = document.querySelector(".title");
let singer = document.querySelector(".singer");
let prev = document.querySelector("#prev");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let duration = document.querySelector("#duration");
let currentTime = document.querySelector("#currentTime");
let progressBar = document.querySelector("#progressBar");
let volumeControl = document.querySelector("#volumeControl");
let soundControl = document.querySelector("#soundControl");
let allMusicList = document.querySelector("#musicList ul");
let newAudio = "";

window.addEventListener("load", () => {
  let music = musicPlayer.getMusic();
  displayMusic(music);
  displayMusicList(musicList);
  
  //müzik listesinden seçilen şarkının çalması
  let playing = allMusicList.querySelectorAll("li")
  for(let i=0;i<playing.length;i++){
    playing[i].addEventListener("click",(e)=>{
      musicPlayer.musicİndex=i
      music = musicPlayer.getMusic();
      displayMusic(music);
      playMusic();
    })
  }
  //
});

// müzik listesinin doldurulması
function displayMusicList(list) {
  for (let i = 0; i < list.length; i++) {
    let newListİtem = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${list[i].getName()}</span>
      <span id="music-${i}"  class="badge bg-primary rounded-pill ">3:21</span>
      <audio class="music-${i}" src="audio/${list[i].audio}"></audio>
      </li>
    `;
    allMusicList.insertAdjacentHTML("beforeend", newListİtem);

    let liAudioDuration = allMusicList.querySelector(`#music-${i}`);
    let liAudioTag = allMusicList.querySelector(`.music-${i}`);
    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.textContent=calculateTime(liAudioTag.duration)
    });
    selectedPlayingList()
  }
}

// liste üzerinden seçilen elemanın stilinin değiştirilmesi
function selectedPlayingList(){
  let playing = allMusicList.querySelectorAll("li")
  for(let index in playing){
    if(musicPlayer.musicİndex==index){
      playing[index].classList.add("playing")
    }else{
      playing[index].classList="list-group-item d-flex justify-content-between align-items-center "
    }
    
  }
}

// çalan şarkının bilgilerinin ekranda gösterilmesi
function displayMusic(music) {
  musicİmg.setAttribute("src", `img/${music.img}`);
  title.textContent = music.getName();
  singer.textContent = music.singer;
  musicAudio.setAttribute("src", `audio/${music.audio}`);
}

// play butonuna tıklandığında yapılacak işlemler
play.addEventListener("click", () => {
  let control = container.classList.contains("playing");
  control ? pauseMusic() : playMusic();
});
function playMusic() {
  musicAudio.play();
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  selectedPlayingList();
}
function pauseMusic() {
  musicAudio.pause();
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
}

// geri butonuna basıldığında yapılacak işlemler
prev.addEventListener("click", () => {
  musicPlayer.prev();
  music = musicPlayer.getMusic();
  displayMusic(music);
  playMusic();
});

// ileri butonuna basıldığında yapılacak işlemler
next.addEventListener("click", () => {
  musicPlayer.next();
  music = musicPlayer.getMusic();
  displayMusic(music);
  playMusic();
});

// şarkı yüklendiğinde yapılan işlemler
musicAudio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(musicAudio.duration);
  progressBar.max = Math.floor(musicAudio.duration);
  musicAudio.volume = volumeControl.value / 100;
});

// saniye her değiştiğinde yapılacak işlemler
musicAudio.addEventListener("timeupdate", () => {
  currentTime.textContent = calculateTime(musicAudio.currentTime);
  progressBar.value = Math.floor(musicAudio.currentTime);
  autoPlay();
});
// dakika hesaplaması
function calculateTime(totalSecond) {
  let minute = Math.floor(totalSecond / 60);
  let second = Math.floor(totalSecond % 60);
  let uptadeSecond = second < 10 ? `0${second}` : `${second}`;
  let result = `${minute}:${uptadeSecond}`;
  return result;
}
// tıklanılan saniyeye şarkının sarılması
progressBar.addEventListener("input", () => {
  musicAudio.currentTime = progressBar.value;
  if (progressBar.value == Math.floor(progressBar.max)) {
    musicPlayer.next();
    music = musicPlayer.getMusic();
    displayMusic(music);
    playMusic();
  }
});

// şarkı bittiğinde bir sonraki şarkıya geçilmesi
function autoPlay() {
  if (musicAudio.currentTime == musicAudio.duration) {
    musicPlayer.next();
    music = musicPlayer.getMusic();
    displayMusic(music);
    playMusic();
  }
}
// ses ayaları
volumeControl.addEventListener("input", () => {
  musicAudio.volume = volumeControl.value / 100;
  if (volumeControl.value == 0) {
    mute();
  } else {
    notMute();
  }
});
soundControl.addEventListener("click", () => {
  let isMuted = soundControl.classList.contains("muted");
  isMuted ? notMute() : mute();
});

function notMute() {
  soundControl.classList = "fa-solid fa-volume-high";
  musicAudio.muted = false;
  volumeControl.value = musicAudio.volume * 100;
}
function mute() {
  soundControl.classList = "fa-solid fa-volume-xmark muted";
  musicAudio.muted = true;
  volumeControl.value = 0;
}
