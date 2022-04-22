const container = document.querySelector(".container");
const title = document.querySelector(".title");
const cover = document.querySelector(".cover");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const prevBtn = document.querySelector(".prev");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
const audio = document.querySelector(".audio");
const voiceControl = document.querySelector('.voice-control')
const start = document.querySelector('.start')
const end = document.querySelector('.end')

const songs = [
  "Ending - Isak Danielson",
  "Heather - Conan Gray",
  "Osmonlarda - Xamdam Sobirov",
  "U okna - HammAli & Navai",
  'Elyor Meliboyev - Yalala bobo yalla',
  'Ed Sheeran - Shape of You',
  'Adele - Easy On Me',
  'Tyla Yaweh,Post Malone-Tommy Lee'
];

let songIndex = 0;

playSong(songs[songIndex]);

function playSong(song) {
  title.textContent = song;
  audio.src = `./musics/${song}.mp3`;
  cover.src = `./album/${song}.jpg`;
}


//funtion

function playMusic() {
  const isPlay = container.classList.contains("play");

  if (isPlay) {
    pause();
  } else {
    play();
  }
}

function play() {
  container.classList.add("play");
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
  playBtn.style.paddingLeft = '1.5px'
  playBtn.style.paddingRight = '1.6px'

}

function pause() {
  container.classList.remove("play");
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  audio.pause();
  playBtn.style.paddingLeft = '0px'
  playBtn.style.paddingRight = '0px'
}

function next() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  playSong(songs[songIndex]);
  play();
}

function previous() {
  songIndex--;
  if ((songIndex < 0)) {
      songIndex = songs.length - 1
  }
  playSong(songs[songIndex]);
  play();
}

function voiceChange(e) {
  audio.volume = e.target.value / 100
}

function updateProgress(){
  const duration = audio.duration
  const currentTime = audio.currentTime
  const percent = (currentTime / duration) * 100
  progress.style.width = `${percent}%`

  //end
  let endMinutes = Math.floor(duration / 60)
  let endSeconds = Math.floor(duration % 60)
  end.textContent = `${endMinutes}:${(endSeconds = endSeconds < 10 ? '0' + endSeconds: endSeconds)}`

  //start
  let startMinutes = Math.floor(currentTime / 60)
  let startSeconds = Math.floor(currentTime % 60)
  start.textContent = `${startMinutes}:${(startSeconds = startSeconds < 10 ? '0' + startSeconds: startSeconds)}`
}

function setProgress(e) {
  const width = this.clientWidth
  const widthX = e.offsetX
  const duration = audio.duration
  audio.currentTime = (widthX / width) * duration
}

playBtn.addEventListener("click", playMusic);

nextBtn.addEventListener("click", next);

prevBtn.addEventListener("click", previous);

voiceControl.addEventListener('input', voiceChange)

audio.addEventListener('timeupdate', updateProgress)

audio.addEventListener('ended', next)

progressContainer.addEventListener('click', setProgress)

// document.addEventListener('keydown', (e) => {
//   if(e.code == 'Space'){
//     play()
//   }
// })





// Voice change
const rangeInputs = document.querySelectorAll('input[type="range"]')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

