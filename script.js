console.log("Welcome to Spotify!");

//Initialise the variables
let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
let centerPlayBtn = document.getElementById("centerPlayBtn");
let myProgressBar = document.getElementById("myProgBar");



//making objects in array to store name,mp3 file,cover img of songs

let songs = [
    {songName: "Love Me Like Yo Do", filePath: "songs/1.mp3", coverPath: "img/ec-1.jpgs", duration: "4:13"},
    {songName: "Believer", filePath: "songs/2.mp3", coverPath: "img/ec-2.jpgs", duration: "3:37"},
    {songName: "Hall of Fame", filePath: "songs/3.mp3", coverPath: "img/ec-3.jpgs", duration: "3:22"},
    {songName: "Shape Of You", filePath: "songs/4.mp3", coverPath: "img/ec-4.jpgs", duration: "3:53"},
    {songName: "Pirates of the Caribbean", filePath: "songs/5.mp3", coverPath: "img/ec-5.jpgs", duration: "7:08"},
    {songName: "Still Falling For You", filePath: "songs/6.mp3", coverPath: "img/ec-6.jpgs", duration: "4:01"},
    {songName: "Brothers Anthem", filePath: "songs/7.mp3", coverPath: "img/hc-1.jpgs", duration: "5:54"},
    {songName: "Kar Har Maidan Fateh", filePath: "songs/8.mp3", coverPath: "img/hc-2.jpgs", duration: "5:12"},
    {songName: "Chak Lein De", filePath: "songs/9.mp3", coverPath: "img/hc-3.jpgs", duration: "4:23"},
    {songName: "Chak De India", filePath: "songs/10.mp3", coverPath: "img/hc-4.jpgs", duration: "4:44"},
    {songName: "Zinda", filePath: "songs/11.mp3", coverPath: "img/hc-5.jpgs", duration: "3:31"},
    {songName: "Get Ready To Fight", filePath: "songs/12.mp3", coverPath: "img/hc-6.jpgs", duration: "3:25"},
    
]

// handling shuffling of songs.
let shuffleMode = false;
console.log('shuffle: ', shuffleMode);

const Shflbtn = document.getElementById('shuffleBtn');
Shflbtn.addEventListener('click', () => {
    shuffleMode = !shuffleMode;
    if (shuffleMode) {
        Shflbtn.classList.add('green-color');
    } else {
        Shflbtn.classList.remove('green-color');
    }
    console.log('shuffle: ', shuffleMode);

    // Update the appearance of the shuffle button based on the shuffle mode
    const shuffleBtn = document.getElementById('shuffleBtn');
    shuffleBtn.classList.toggle('active', shuffleMode);
});



// Handling play/pause of songs
centerPlayBtn.addEventListener('click', function() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // Play the song
        if (shuffleMode) {
            let randomNumber = Math.floor(Math.random() * 12) + 1;
            console.log(randomNumber);
            audioElement = new Audio(`songs/${randomNumber}.mp3`);
        }
        audioElement.play();
        // Change the icon to pause icon
        centerPlayBtn.classList.remove('fa-play-circle');
        centerPlayBtn.classList.add('fa-pause-circle');
    } else {
        // Song is playing and I need to pause it
        audioElement.pause();
        // Change the icon back to play icon
        centerPlayBtn.classList.remove('fa-pause-circle');
        centerPlayBtn.classList.add('fa-play-circle');
    }
});


// Updating the seekbar
//listen to the audioElement
// edit: also update curr duration of song in seekbar
let curr_durn = document.getElementById('startTimer');
audioElement.addEventListener('timeupdate',()=>{
    let progress = ((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    let currTime = audioElement.currentTime.toFixed(2);
    let minute = Math.floor(currTime/60);
    let seconds = Math.floor(currTime%60);
    if(seconds.toString().length == 1){
        curr_durn.innerHTML = minute.toString() + ":" + "0"+ seconds.toString();
    }
    else{
        curr_durn.innerHTML = minute.toString() + ":"+ seconds.toString();
    }
    console.log(currTime);
})

// update song according to seekbar
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('smallPlayBtn')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
// now make function to play song when clicked on their corresponding paly buttons
let isPlaying = false; // Variable to track the current state of the song
let currentSongIndex = -1; // Variable to track the index of the currently playing song
//edit : updating the total duration of song in seekbar according to the song played
let total_durn = document.getElementById('totalDuration');
Array.from(document.getElementsByClassName('smallPlayBtn')).forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    audioElement.src = `songs/${songIndex}.mp3`;
    total_durn.innerHTML = songs[songIndex-1].duration;
    if (songIndex === currentSongIndex) {
      // If the clicked button corresponds to the current song being played
      if (!isPlaying) {
        // Resume playback from the current position
        audioElement.play();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        centerPlayBtn.classList.remove('fa-play-circle');
        centerPlayBtn.classList.add('fa-pause-circle');
        // console.log('resumed playback');
      } else {
        // Pause the song
        audioElement.pause();
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        centerPlayBtn.classList.remove('fa-pause-circle');
        centerPlayBtn.classList.add('fa-play-circle');
        // console.log('paused');
      }
    } else {
      // If a new song is clicked
      audioElement.play();
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      centerPlayBtn.classList.remove('fa-play-circle');
      centerPlayBtn.classList.add('fa-pause-circle');
      console.log('playing new song');
    }

    currentSongIndex = songIndex;
    isPlaying = !isPlaying; // Toggle the isPlaying variable
  });
});




// implementing next button
let totalSongs = 12;
document.getElementById('upnext').addEventListener('click', () => {
    if (audioElement.currentTime > 0) {
      audioElement.pause();
    }
  
    if (shuffleMode) {
      let randomNumber = Math.floor(Math.random() * totalSongs) + 1;
      // Make sure the next random number is not the same as the current song index
      while (randomNumber === songIndex) {
        randomNumber = Math.floor(Math.random() * totalSongs) + 1;
      }
      console.log(randomNumber);
      audioElement = new Audio(`songs/${randomNumber}.mp3`);
      songIndex = randomNumber;
    } else {
      if (songIndex >= totalSongs) {
        songIndex = 1;
      } else {
        songIndex++;
      }
      // If shuffle mode is disabled, simply increment the song index
      audioElement.src = `songs/${songIndex}.mp3`;
    }
  
    makeAllPlays();
    total_durn.innerHTML = songs[songIndex - 1].duration;
    audioElement.currentTime = 0;
    audioElement.play();
    myProgressBar.value = 0;
    centerPlayBtn.classList.remove('fa-play-circle');
    centerPlayBtn.classList.add('fa-pause-circle');
  });
  

// implementing back button
document.getElementById('back').addEventListener('click', ()=>{
    if(songIndex === 1 ){
        songIndex = totalSongs;
    }
    else{
        songIndex--;
    }
    makeAllPlays();
    total_durn.innerHTML = songs[songIndex-1].duration;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    myProgressBar.value = 0;
    centerPlayBtn.classList.remove('fa-play-circle');
    centerPlayBtn.classList.add('fa-pause-circle');
})