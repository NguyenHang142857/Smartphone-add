"user strict";
let n = "";
let nBefore = "";
window.addEventListener("DOMContentLoaded",
    function(){
        $("header").textillate({
            loop: false, 
            minDisplayTime: 2000, 
            initialDelay: 2000,  
            autoStart: true,     
            in: {            
              effect: "fadeInLeftBig", 
              delayScale: 1.5,         
              delay: 50,             
              sync: false,            
              shuffle: true         
            }
          });
        
          $(function(){
            ScrollReveal().reveal("#btn1", { duration: 9000 });
        });
        setTimeout(
            function(){
        let popMessage = "いらっしゃい！おみくじ引いてって！"
        window.alert(popMessage);
    },"5000"
);
    },false
);
let soundEndlag = "0";
const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage");

btn1.addEventListener("click",
     function(){
          if(soundEndlag === "1"){
             soundControl("end","");
          }
          let resultText = ["img/daikichi.png","img/chukichi.png","img/syokichi.png","img/suekichi.png","img/daikyo.png"];
          let resultMaxSpeed = [10,8,8,5,5];
          let resultMinSpeed = [3,2,2,2,2];
          let resultMaxSize = [30,30,20,15,10];
          let resultMinSize = [3,2,2,2,3];
          let resultImage = ["img/star.png","img/sakura_hanabira.png","img/water1.png","img/redLeaves4.png","img/snowflakes.png"];
          let resulSound = [
            "sound/omikuji_sound1.mp3",
            "sound/omikuji_sound2.mp3",
            "sound/omikuji_sound3.mp3",
            "sound/omikuji_sound4.mp3",
            "sound/omikuji_sound5.mp3",
          ];
          while (n == nBefore){
            n = Math.floor(Math.random() *resultText.length);
          }
            nBefore = n;
          omikujiTextImage.src = resultText[n];
          omikujiTextImage.classList.add("omikujiPaper");
          omikujiTextImage.addEventListener("animationend",
            function() {
              omikujiTextImage.classList.remove("omikujiPaper");
            }, false
            );
          w_sound = resulSound[n];
          soundControl("start", w_sound);
          soundEndlag = "1";
        // snowfall stop
        $(document).snowfall("clear");
        // jQueryのsnowfall
        $(document).ready(function(){
        $(document).snowfall({
            maxSpeed : resultMaxSpeed[n], // 最大速度
            minSpeed : resultMinSpeed[n], // 最小速度
            maxSize  : resultMaxSize[n], // 最大サイズ
            minSize  : resultMinSize[n], // 最小サイズ
            image : resultImage[n]
        });
        });  
     },false
     );
     let w_sound
     let music
     function soundControl(status, w_sound){
          if(status === "start"){
            music = new Audio(w_sound);
            music.currentTime = 0;
            music.play();
          }else if(status === "end"){
            music.pause();
            music.currentTime = 0;
          }
     }