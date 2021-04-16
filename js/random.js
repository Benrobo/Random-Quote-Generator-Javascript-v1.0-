let cardcont = document.querySelector(".card-container");
let icons = [
  "diamond-outline",
  "ice-outline",
  "flame-outline",
  "leaf-outline",
  "prism-outline",
];
let music = [
    "audio/1.mp3",
    "audio/2.mp3",
    "audio/3.mp3"
];
let url = "https://goquotes-api.herokuapp.com/api/v1/random?count=1100";
let loaded = false;


window.addEventListener("DOMContentLoaded", ()=>{
    playAudio();
})
// fetch data
let fetchData = async ()=>{
    let res = await fetch(url);
    let data = await res.json();

    
    setInterval(()=>{
        getdata(data);
    }, 9000);
}
fetchData()


let width = 50;
function getdata(data){
    let rand = Math.floor(Math.random() * data.quotes.length);
    let randicon = Math.floor(Math.random() * icons.length);
    let d = data.quotes[rand]
    let arr = [];
    let quotes = arr.push(data.quotes[rand]);
    arr.forEach((res)=>{
       let txt = res.text;
       let aut = res.author;
       let tag = res.tag;
       cardcont.innerHTML = `
            <div class="rand-card">
            <div class="icon"><ion-icon name="${icons[randicon]}"></ion-icon></div>
            <br>
            <br>
            <div 
            class="rand-body">
            <br>
                <span class="tag">${tag}</span>
                <br>
                <br>
                <div class="progressbar-cont">
                    <div class="progress-bar"></div>
                </div>
                <br>
                <p>${txt}</p>
                <br>
                <span class="author">- <i>${aut}</i></span>
            </div>
        </div>
       `;
    });
    move()
}


var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.querySelector(".progress-bar");
    var width = 1;
    var id = setInterval(frame, 30);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}
move()

function playAudio(){
    let playbtn = document.querySelector(".play");
    let stopbtn = document.querySelector(".stop");
    let randaudio = Math.floor((Math.random() * music.length));
    let audio  = new Audio();
    audio.src = music[randaudio]
    console.log(audio);
    audio.play();
    audio.loop = true;
    stopbtn.onclick = (e)=>{
        audio.pause();
        audio.currentTime = 0;
    }
    playbtn.onclick = (e)=>{
        audio.play();
        // audio.currentTime = 0;
    }
    
}   


// {text: "In this world you've just got to hope for the best…repare for the worst and take whatever God sends.", author: "Lucy Maud Montgomery", tag: "best"}