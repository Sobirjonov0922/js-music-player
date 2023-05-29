let musicContainer = document.querySelector('#audio-container'),
  title = document.querySelector('#title'),
  audio = document.querySelector('#audio'),
  coverImg = document.querySelector('#cover'),
  progressContainer = document.querySelector('#progress-container'),
  progress = document.querySelector('#progress'),
  prevBtn = document.querySelector('#prev'),
  playBtn = document.querySelector('#play'),
  nextBtn = document.querySelector('#next')

let songs = ['andro-isa(remix)', 'elman-zari', 'eminem-mockingbird', 'jealousFriend-inMyMind', 'snow-iAmInLoveBut']

let songIndex = 0

function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  coverImg.src = `images/${song}.jpg`
}

loadSong(songs[songIndex])

function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fad').classList.remove('fa-play')
  playBtn.querySelector('i.fad').classList.add('fa-pause')

  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fad').classList.remove('fa-pause')
  playBtn.querySelector('i.fad').classList.add('fa-play')

  audio.pause()
}

function prevSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length - 1 // -1
  }
  loadSong(songs[songIndex])
  playSong()
}

function nextSong() {
  songIndex++

  if (songIndex > songs.length - 1) {
    songIndex = 0 // +1
  }
  loadSong(songs[songIndex])
  playSong()
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  let progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
  let width = this.clientWidth
  let clickX = e.offsetX
  let duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

// Play Song
playBtn.addEventListener('click', () => {
  let isPlaying = musicContainer.classList.contains('play')

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

// Previous Song
prevBtn.addEventListener('click', prevSong)

// Next Song
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)