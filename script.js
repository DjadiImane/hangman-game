let obj = [
  {
    type: "history",
    questions: [
      {
        name: "NAPOLEON",
        hint: "A famous French military leader and emperor who played a major role in European history in the early 19th century.",
      },
      {
        name: "Revolution",
        hint: "A sudden and important change in the way a country is governed, often involving people fighting for new rights.",
      },
      {
        name: "Pharaoh",
        hint: "The title used for the ancient rulers of Egypt who were considered both kings and divine figures.",
      },
      {
        name: "Democracy",
        hint: "A system of government in which the people have the power to choose their leaders through voting.",
      },
      {
        name: "Renaissance",
        hint: "A historical period in Europe marked by a revival of art, science, culture, and learning after the Middle Ages.",
      },
    ],
  },

  {
    type: "books",
    questions: [
      {
        name: "Hamlet",
        hint: "A famous tragedy by William Shakespeare about a prince who seeks revenge after his father's death.",
      },
      {
        name: "Frankenstein",
        hint: "A novel by Mary Shelley about a scientist who creates a living creature that becomes uncontrollable.",
      },
      {
        name: "Odyssey",
        hint: "An ancient Greek epic poem that tells the long and dangerous journey of Odysseus returning home after the Trojan War.",
      },
      {
        name: "Macbeth",
        hint: "A Shakespeare play about ambition, power, and guilt, where a Scottish general becomes king through dark actions.",
      },
      {
        name: "Sherlock",
        hint: "A fictional detective created by Arthur Conan Doyle, known for solving mysteries using logic and observation.",
      },
    ],
  },

  {
    type: "animals",
    questions: [
      {
        name: "Elephant",
        hint: "The largest land animal, known for its long trunk, strong memory, and intelligence.",
      },
      {
        name: "Giraffe",
        hint: "A very tall African animal with a long neck that allows it to eat leaves from high trees.",
      },
      {
        name: "Dolphin",
        hint: "A highly intelligent marine mammal known for its friendly behavior and ability to communicate using sounds.",
      },
      {
        name: "Kangaroo",
        hint: "An Australian animal that moves by jumping and carries its babies in a pouch.",
      },
      {
        name: "Penguin",
        hint: "A flightless bird that lives in cold regions and is an excellent swimmer in icy waters.",
      },
    ],
  },
];
let btn_start = document.querySelector(".btn_start");
let fisrtfenetre = document.querySelector(".fisrtfenetre");
let secfenetre = document.querySelector(".secfenetre");
let thirdfenetre = document.querySelector(".thirdfenetrehide");
let alphabtns = document.querySelectorAll(".alpha button");
let hintparent = document.querySelector(".hint");
let nameparent = document.querySelector(".name");
let nbguesse = document.querySelector(".nbguesse");
let timing = document.querySelector(".timing");
let photoman = document.querySelector(".photoman");
let gameover = document.querySelector(".gameover");
let correctnamegm = document.querySelector(".correctnamegm");
let correctname = document.querySelector(".correctname");
let win = document.querySelector(".win");
let choosencategory = "";
let nbr = 0;
let name = "";
let k = 0;
let letters = [];
let gm = false;
function nextfentere() {
  secfenetre.classList.replace("secfenetre", "secfenetreactive");
  fisrtfenetre.classList.replace("fisrtfenetre", "fisrtfenetrehide");
}

function retourchoix() {
  secfenetre.classList.replace("secfenetre", "secfenetreactive");
  thirdfenetre.classList.replace("thirdfenetre", "thirdfenetrehide");
  starttime = 0;
  elapsedtime = 0;
  clearInterval(timer);
  timing.textContent = `00:00`;
  let hintp = document.querySelector(".hintp");
  if (hintp) {
    hintp.remove();
  }
  let namedivs = document.querySelectorAll(".borderbuttom");
  namedivs.forEach((namediv) => {
    if (namediv) {
      namediv.remove();
    }
  });
}
let hangimg = null;

let questionchoose = [];
function startgame(choose) {
  choosencategory = choose;
  secfenetre.classList.replace("secfenetreactive", "secfenetre");
  thirdfenetre.classList.replace("thirdfenetrehide", "thirdfenetre");
  starttime = Date.now() - elapsedtime;
  timer = setInterval(timestart, 10);
  photoman.innerHTML = "";
  nbguesse.textContent = "0/6";
  nbr = 0;
  alphabtns.forEach((btn) => {
    btn.disabled = false;
  });
  hangimg = document.createElement("img");
  hangimg.classList = "hangimg";
  hangimg.src = `images/hangman-${0}.svg`;
  photoman.append(hangimg);
  let find = false;
  let i = 0;
  while (i < obj.length && find === false) {
    if (choosencategory === obj[i].type) {
      find = true;
      questionchoose = obj[i].questions;
    }
    i++;
  }
  afficherelements(k);
}

function afficherelements(j) {
  name = questionchoose[j].name.toUpperCase();
  let hint = questionchoose[j].hint;
  let hintp = document.createElement("p");
  hintp.textContent = hint;
  hintp.className = "hintp";
  hintparent.append(hintp);
  letters = [...name];
  for (let i = 0; i < letters.length; i++) {
    let div = document.createElement("div");
    div.classList = `borderbuttom`;
    nameparent.append(div);
  }
}

alphabtns.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    event.target.disabled = true;
    let found = false;
    for (let i = 0; i < letters.length; i++) {
      if (event.target.textContent === letters[i]) {
        found = true;
        let alphap = document.createElement("p");
        alphap.classList = "alphap";
        let div = document.querySelectorAll(`.borderbuttom`);
        div[i].append(alphap);
        alphap.textContent = letters[i];
      }
    }
    let alphanametrouve = document.querySelectorAll(".alphap");
    alphanametrouve = Array.from(alphanametrouve);
    if (alphanametrouve.length == letters.length) {
      alphabtns.forEach((btn) => {
        btn.disabled = true;
      });
      clearInterval(timer);
      win.classList.replace("win", "winactive");
      correctname.textContent = name;
    }
    if (!found) {
      nbr++;
      nbguesse.textContent = `${nbr}/6`;
      hangimg.src = `images/hangman-${nbr}.svg`;
    }
    if (nbguesse.textContent == `6/6`) {
      if (!gm) {
        gm = true;
        clearInterval(timer);
        alphabtns.forEach((btn) => {
          btn.disabled = true;
        });
        gameover.classList.replace("gameover", "gameoveractive");
        correctnamegm.textContent = name;
      }
    }
  });
});

let starttime = 0;
let elapsedtime = 0;
let timer = null;
function timestart() {
  let currentime = Date.now();
  elapsedtime = currentime - starttime;
  let sec = Math.floor(elapsedtime / 1000);
  let min = Math.floor((elapsedtime / (1000 * 60)) % 60);
  min = String(min).padStart(2, "0");
  sec = String(sec).padStart(2, "0");

  timing.textContent = `${min}:${sec}`;

  if (sec == 50) {
    clearInterval(timer);
    elapsedtime = Date.now() - starttime;
    let alphanametrouve = document.querySelectorAll(".alphap");
    alphanametrouve = Array.from(alphanametrouve);
    if (alphanametrouve.length != letters.length) {
      if (!gm) {
        gm = true;
        clearInterval(timer);
        alphabtns.forEach((btn) => {
          btn.disabled = true;
        });
        gameover.classList.replace("gameover", "gameoveractive");
        correctnamegm.textContent = name;
      }
    }
  }
}

function replay(h) {
  if (h === "gameover") {
    gameover.classList.replace("gameoveractive", "gameover");
  } else {
    win.classList.replace("winactive", "win");
  }
  k++;
  if (k >= questionchoose.length) {
    k = 0;
  }
  alphabtns.forEach((btn) => {
    btn.disabled = false;
  });
  gm = false;
  thirdfenetre.classList.replace("thirdfenetrehide", "thirdfenetre");
  hintparent.innerHTML = "";
  nameparent.innerHTML = "";
  starttime = 0;
  elapsedtime = 0;
  clearInterval(timer);
  timing.textContent = `00:00`;
  photoman.innerHTML = "";
  nbguesse.textContent = "0/6";
  nbr = 0;

  hangimg = document.createElement("img");
  hangimg.classList = "hangimg";
  hangimg.src = `images/hangman-${0}.svg`;
  photoman.append(hangimg);
  starttime = Date.now() - elapsedtime;
  timer = setInterval(timestart, 10);
  afficherelements(k);
}
