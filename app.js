  let dotNum = 0;
  let playing = true;
  let scoreBox = document.getElementById('score');
  let score = 0;
  let delay = 1000;

function catchDot(e) {
  if (playing) { //comment out this condition for testing
  let pointVal = parseInt(e.target.getAttribute("data-value"));
  // console.log(pointVal);
    score += pointVal;
    scoreBox.innerHTML = score;
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
  let currentDots = Array.apply(null, document.getElementsByClassName("dot"));
  // console.log(range);
  switch(range){
    case 5:
      level.innerHTML = "Pan-DOT-monium!!!";
      delay = 100;
      currentDots.forEach(dot => {
        dot.style.animationDuration = '0.5s';
      });
      break;
    case 4:
      level.innerHTML = "Attending School of Dot";
      delay = 300;
      currentDots.forEach(dot => {
        dot.style.animationDuration = '1s';
      });
      break;
    case 3:
      level.innerHTML = "Tick-tock, Tick-Dot";
      delay = 1000;
      break;
    case 2:
      level.innerHTML = "Polka Dot";
      currentDots.forEach(dot => {
        dot.style.animationDuration = '5s';
      });
      delay = 1500;
      break;
    case 1:
      level.innerHTML = "Dip-n-Dots";
      currentDots.forEach(dot => {
        dot.style.animationDuration = '7s';
      });
      delay = 2000;
      break;
  }
};

// function startandResumeGame() {
//   playing = true;
//   let currentDots = Array.apply(null, document.getElementsByClassName("dot"));
//   currentDots.forEach(dot => {
//     dot.style.animationPlayState = "running";
//   });
//   addDot();
// }


document.addEventListener("DOMContentLoaded", function() {

  document.querySelector(".start-game").onclick = function () {
    document.querySelector('.game_interface').classList.add('slideUpAway');
    playing = true;
    let currentDots = Array.apply(null, document.getElementsByClassName("dot"));
    currentDots.forEach(dot => {
      dot.style.animationPlayState = "running";
    });
    addDot();
  }

  document.querySelector('#pause').onclick = function () {
    document.querySelector('.game_interface').classList.remove('slideUpAway');
    let currentDots = Array.apply(null, document.getElementsByClassName("dot"));
    playing = false;
    currentDots.forEach(dot => {
      dot.style.animationPlayState = "paused";
    });
  }

});