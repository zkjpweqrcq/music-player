/* TODO
*		Add play/pause song
*		Add song titles and pictures
*		Add swtich songs
*		Add progress bar
*		Add current song time and duration for that song
*		Add setting the current time with the mouse
*/

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('currTime');
const durationTimeEl = document.getElementById('durTime');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src= `images/${song}.jpg`;
}
loadSong(songs[songIndex]);

function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');

	audio.play();
}

function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');

	audio.pause();
}
// [0] [1] [2] 
function nextSong() {
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);
	playSong();
}

// [0] [1] [2]
function prevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);
	playSong();
}

function updateProgress(e) {
	//const duration = e.srcElement.duration;
	//const currentTime = e.srcElement.currentTime;
	const { duration, currentTime } = e.srcElement;
	const progressPercent = currentTime * 100 / duration;
	progress.style.width = `${progressPercent}%`;
}

function durationTime(e) {
	const { duration, currentTime } = e.srcElement;

	currentTimeEl.innerText = formatDuration(currentTime);
	durationTimeEl.innerText = formatDuration(duration);
}

function formatDuration(seconds) {
	const min = Math.floor(seconds / 60);
	const sec = Math.floor(seconds % 60);
	// 01 02 03 04
	const resaultMin = `${min < 10 ? '0' + min : min}`;
	const resaultSec = `${sec < 10 ? '0' + min : sec}`;
	const resault = `${resaultMin} : ${resaultSec}`;//resaultMin + ' : ' + resaultSec;
	
	return seconds ? resault : '00 : 00';
}

function setProgress(e) {
	//const width = this.clientWidth;
	const width = progressContainer.clientWidth;
	const clickX = e.offsetX
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('timeupdate', durationTime);


prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);

playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');
	isPlaying ? pauseSong() : playSong();
});



