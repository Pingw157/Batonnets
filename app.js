if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(() => { alert('Service Worker Registered'); });
}
var userName = window.prompt('Enter your user name');
if (!userName) {
  userName = "Nameless player";
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var elGameContainer = document.getElementById("gameContainer");
var elScene = document.createElement("div");
var elPlateau = document.createElement("div");
var elJoueur1 = document.createElement("p");
var speed = 5;
var animtimer;

var elJ1ret1 = document.createElement("button");
var elJ1ret2 = document.createElement("button");
var elJ1ret3 = document.createElement("button");
var elrestart = document.createElement("button");

var batonnets = [];
var slots = [];
var currentBat = 0;

var initV2 = function() {
  for (i = 0; i < 20; i++) {
    slots[i] = document.createElement("div");
    slots[i].className = "slots";
    slots[i].style.width = "2%";
    slots[i].style.left = 1.5 + i * 5 + "%";
    elPlateau.appendChild(slots[i]);
  }
  for (i = 0; i < 20; i++) {
    batonnets[i] = document.createElement("div");
    batonnets[i].className = "batonnets";
    batonnets[i].style.width = "2%";
    batonnets[i].style.left = 1.5 + i * 5 + "%";
    elPlateau.appendChild(batonnets[i]);
  }

  elScene.className = "scene";
  elPlateau.className = "plateau";

  elJoueur1.innerHTML = "Joueur 1";
  elJoueur1.className = "player";
  elJoueur1.style.top = "0";

  elJ1ret1.innerHTML = "1";
  elJ1ret2.innerHTML = "2";
  elJ1ret3.innerHTML = "3";
  elrestart.innerHTML = "Play again";

  elJ1ret1.className = "rmvButton";
  elJ1ret2.className = "rmvButton";
  elJ1ret3.className = "rmvButton";
  elrestart.className = "restartbtn";

  elGameContainer.appendChild(elScene);
  elScene.appendChild(elJoueur1);
  elJoueur1.appendChild(elJ1ret1);
  elJoueur1.appendChild(elJ1ret2);
  elJoueur1.appendChild(elJ1ret3);
  elScene.appendChild(elPlateau);
  elPlateau.appendChild(elrestart);

  elrestart.style.display = "none";
  currentBat = 19;

};


var goUp = function(numero) {
  var batnum = batonnets[numero];
  var top = 25;
  var initanimup = function() {
    var pas = -1;
    batnum.style.top = top + pas + "%";
    top += pas;
    if (top <= -30) {
      clearTimeout(animtimer);
    }
  };
  var animtimer = setInterval(initanimup, speed);
};

var goDn = function(numero) {
  var batnum = batonnets[numero];
  var top = 25;
  var initanimDn = function() {
    var pas = 1;
    batnum.style.top = top + pas + "%";
    top += pas;
    if (top >= 80) {
      clearTimeout(animtimerd);
    }
  };
  var animtimerd = setInterval(initanimDn, speed);
};

var addButtonJ1 = function() {
  if (currentBat > 2) { elJ1ret3.style.display = "inline-block"; }
  if (currentBat > 1) { elJ1ret2.style.display = "inline-block"; }
  if (currentBat > 0) { elJ1ret1.style.display = "inline-block"; }
};

var rmvButtonJ1 = function() {
  elJ1ret1.style.display = "none";
  elJ1ret2.style.display = "none";
  elJ1ret3.style.display = "none";
};

var J1play = function(nombre) {
  rmvButtonJ1();
  for (i = 1; i <= nombre; i++) {
    goUp(currentBat);
    currentBat--;
  }
  if (currentBat === 0) {
    alert(userName+" win");
    elrestart.style.display = "block";
  }
  else {
    aiPlay();
  }
};

var J2play = function(nombre) {
  
  for (i = 1; i <= nombre; i++) {
    goDn(currentBat);
    currentBat--;
  }
  if (currentBat === 0) {
    alert("Computer win");
    elrestart.style.display = "block";
  }
  else {
    addButtonJ1();
  }
};

var aiPlay = function() {
  if (currentBat == 1 || currentBat == 5 || currentBat == 9 || currentBat == 13 || currentBat ==17) {
    j2r1();
  } else if (currentBat == 2 || currentBat == 6 || currentBat == 10 || currentBat == 14 || currentBat ==18) {
    j2r2();
  } else if (currentBat == 3 || currentBat == 7 || currentBat == 11 || currentBat == 15 || currentBat ==19) {
    j2r3();
  } else {
    J2play(randInt(1,3));
  }
};

var j1r1 = function() { J1play(1); };
var j1r2 = function() { J1play(2); };
var j1r3 = function() { J1play(3); };
var j2r1 = function() { J2play(1); };
var j2r2 = function() { J2play(2); };
var j2r3 = function() { J2play(3); };

var reinitV2 = function() {
  for (i = 0; i < 20; i++) {
    elPlateau.removeChild(batonnets[i]);
  }
  batonnets = [];
  initV2();
  addButtonJ1();
};

initV2();

elJ1ret1.addEventListener("click", j1r1, false);
elJ1ret2.addEventListener("click", j1r2, false);
elJ1ret3.addEventListener("click", j1r3, false);
elrestart.addEventListener("click", reinitV2, false);
