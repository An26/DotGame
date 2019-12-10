  let dotNum = 0;
  let playing = true;
  let scoreBox = document.getElementsByClassName('score_num');
  let score = 0;
  let delay = 1000;

function catchDot(e) {
  if (playing) { //comment out this condition for testing
  let pointVal = parseInt(e.target.getAttribute("data-value"));
  // console.log(pointVal);
    score += pointVal;
    scoreBox[0].innerHTML = score;
    scoreBox[1].innerHTML = score;
    e.target.style.display = "none";
  }
}

function addDot() {
  let dotTemp = document.querySelector("#dot_original").cloneNode("true");
  let newDot = randomizeDot(dotTemp);
  //newDot.style.marginLeft = 100 * dotNum + "px";
  setTimeout(() => {
    if (playing) {
      document.querySelector(".begin-box").append(newDot);
      newDot.classList.add('fall');
      addDot();
    }
  }, delay);
}

function randomizeDot(dotItem) {
  dotItem.setAttribute("id", "dot_" + dotNum);
  let backgroundColors = [
    "#aee9d9", //powderblue
    "#cbe3f4", //lavender
    "#ffb534", //goldenrod
    "#ffca4f", //sandybrown
    "#00956d", //teal
    "#96c8eb", //skyblue
    "#0cb586" //lightseagreen
  ];

  //background color
  dotItem.style.backgroundColor = backgroundColors[Math.floor(Math.random() * 7)]; // indexes 0-6

  //dot size
  let dotSize = Math.floor(Math.random() * 101) + 20; // 20-121px wide
  dotItem.style.width = dotSize + "px";
  dotItem.style.height = dotSize + "px";

  //distance from leftside of screen
  //WHY BROKEN?
  let leftposition = Math.floor((dotSize * 100) / screen.width);
  dotItem.style.left = Math.floor(Math.random() * 101) - leftposition + "%";

  //point value is normalized, and then attributed points.
  dotItem.setAttribute("data-value", Math.ceil((100 - (dotSize - 20)) / 10)); // values from 1-10

  dotNum++;

  return dotItem;
}

function rangeSlider(e) {
  let range = parseInt(document.querySelector(".range-slider.range").value);
  let level = document.querySelector(".level");
  let translatedLevel = document.querySelector('.actual-level');
  let currentDots = Array.apply(null, document.getElementsByClassName("dot"));
  // console.log(range);
  switch(range){
    case 5:
      level.innerHTML = "Pan-DOT-monium!!!";
      translatedLevel.innerHTML = "Very Hard";
      delay = 100;
      currentDots.forEach(dot => {
        if (dot.getAttribute('id') !== "dot_original") {
          dot.remove();
        }
        dot.style.animationDuration = '0.5s';
      });
      break;
    case 4:
      level.innerHTML = "Attending School of Dot";
      translatedLevel.innerHTML = "Hard";
      delay = 300;
      currentDots.forEach(dot => {
        if (dot.getAttribute('id') !== "dot_original") {
          dot.remove();
        }
        dot.style.animationDuration = '1s';
      });
      break;
    case 3:
      level.innerHTML = "Tick-tock, Tick-Dot";
      translatedLevel.innerHTML = "Normal";
      currentDots.forEach(dot => {
        if (dot.getAttribute('id') !== "dot_original") {
          dot.remove();
        }
        dot.style.animationDuration = '3s';
      });
      delay = 1000;
      break;
    case 2:
      level.innerHTML = "Polka Dot";
      translatedLevel.innerHTML = "Easy";
      currentDots.forEach(dot => {
        if (dot.getAttribute('id') !== "dot_original") {
          dot.remove();
        }
        dot.style.animationDuration = '5s';
      });
      delay = 1500;
      break;
    case 1:
      level.innerHTML = "Dip-n-Dots";
      translatedLevel.innerHTML = "Very Easy";
      currentDots.forEach(dot => {
        if (dot.getAttribute('id') !== "dot_original") {
          dot.remove();
        }
        dot.style.animationDuration = '7s';
      });
      delay = 2000;
      break;
  }
};

function nightMode(e) {
  let screen1 = document.querySelector('.game_interface')[0];
  let screen2 = document.querySelector('.game_play')[0];
  if (screen1.classList.contains('dark') && screen2.classList.contains('dark')) {
    screen1.classList.remove('dark');
    screen2.classList.remove('dark');
  } else {
    screen1.classList.add('dark');
    screen2.classList.add('dark');
  }
}

document.addEventListener("DOMContentLoaded", function() {

  document.querySelector(".start-game").onclick = function () {
    document.querySelector('.game_interface').classList.add('slideUpAway');
    playing = true;
    let currentDots = Array.apply(null, document.getElementsByClassName("dot"));
    currentDots.forEach(dot => {
      dot.style.animationPlayState = "running";
    });
    addDot();
    document.querySelector('.front-score').style.display = 'block';
  }

  document.querySelector('#pause').onclick = function () {
    document.querySelector('.game_interface').classList.remove('slideUpAway');
    document.querySelector('.start-game').innerHTML = "<h2>Resume</h2>";
    let currentDots = Array.apply(null, document.getElementsByClassName("dot"));
    playing = false;
    currentDots.forEach(dot => {
      dot.style.animationPlayState = "paused";
    });
  }

  document.querySelector('.night-mode').onclick = function() {
    // console.log('i am the night');
    let screen1 = document.querySelector('.game_interface');
    let screen2 = document.querySelector('.game_play');
    let btn = document.querySelector('.night-mode');

    if (screen1.classList.contains('dark') && screen2.classList.contains('dark') && btn.classList.contains('dark')) {
      screen1.classList.remove('dark');
      screen2.classList.remove('dark');
      btn.classList.remove('dark');
    } else {
      screen1.classList.add('dark');
      screen2.classList.add('dark');
      btn.classList.add('dark');
    }
  }

  document.querySelector('.exit').onclick = function() {
    let paused = document.getElementsByClassName('slideUpAway').length > 1;
    if (paused) {
      document.querySelector('.game_interface').innerHTML = "<h1 class='title'>Thanks for Visiting, Bye!</h1>";

      document.querySelector('.game_interface').classList.add('slideUpAway');
      //now clear that div with Good bye!
    }
    document.querySelector('.game_interface').innerHTML = "<h1 class='title'>Thanks for Visiting, Bye!</h1>";
  }

  document.querySelector('.restart').onclick = function() {
    window.location.reload(true);
  }

});