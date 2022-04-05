const workTime: number = 1;
const breakTimeMinutes: number = 15;

const workTimeMinutes: number = workTime * 60;
const activity: string[] = [
  "Passer le balai",
  "Faire la vaiselle",
  "Ranger le fauteuil",
  "Ranger son bureau",
  "netoyer la litiere du chat",
  "Faire un tour de la maison",
  "sortire de la maison",
];
let audio: HTMLAudioElement = new Audio("../assets/alert_breack.mp3");
let curentActivity: string = "";
let curentWorkTime: number = workTimeMinutes * 60;
let curentBreakTime: number = breakTimeMinutes * 60;
let curentTime: number = 0;
let curentStatus: string = "";
let imagesBackground: string[] = [
  "19c98b100021d687cc5f6e5dcf69bd13.jpg",
  "1638073.webp",
  "beautiful-anime-kamado-nezuko.jpg",
  "Flandre-Scarlet-anime-girl-4k.jpg",
  "wp8706597.jpg",
];

function StartWorkTime(): void {
  curentStatus = "Work";
  changeBackGround();
  clearSound();
  clearActivity();
  const workInterval = setInterval(() => {
    if (curentWorkTime > 0) {
      curentWorkTime--;
      curentTime = curentWorkTime;
      DrawTimer();
    } else {
      clearInterval(workInterval);
      curentBreakTime = breakTimeMinutes * 60;
      StartBreakTime();
    }
  }, 1000);
}

function StartBreakTime(): void {
  curentStatus = "Break";
  playAlert();

  startActivity();

  const breakInterval = setInterval(() => {
    if (curentBreakTime > 0) {
      curentBreakTime--;
      curentTime = curentBreakTime;
      DrawTimer();
    } else {
      clearInterval(breakInterval);
      curentWorkTime = workTimeMinutes * 60;
      clearActivity();
      StartWorkTime();
    }
  }, 1000);
}

function startActivity(): void {
  curentActivity = activity[Math.floor(Math.random() * activity.length)];
}

function nextActivity(): void {
  startActivity();
  let activityElement = document.getElementById(
    "activity"
  ) as HTMLParagraphElement;
  activityElement.innerHTML = curentActivity;
}

function clearActivity(): void {
  curentActivity = "";
}

function playAlert() {
  audio.play();
  let div = document.querySelector("#player_widget") as HTMLDivElement;
  div.style.display = "flex";
}
function stopAlert() {
  audio.pause();
}
StartWorkTime();

/* View Html Partie */

function DrawTimer() {
  const timer = document.getElementById("timer") as HTMLDivElement;
  let temps: Date = new Date(curentTime * 1000);

  let status = document.getElementById("status") as HTMLParagraphElement;
  status.querySelector("p").innerHTML = curentStatus + " in progress";
  let statusPicture = document.getElementById(
    "statusPicture"
  ) as HTMLImageElement;

  if (curentStatus == "Work") {
    statusPicture.setAttribute("src", "./assets/svg/Work.svg");
  } else {
    statusPicture.setAttribute("src", "./assets/svg/Break.svg");
  }

  let minutesElement = document.getElementById("Minute") as HTMLElement;
  let secondElement = document.getElementById("Seconde") as HTMLElement;
  let hoursElement = document.getElementById("Hour") as HTMLElement;

  minutesElement.querySelector("p").innerHTML = temps.getMinutes().toString();
  secondElement.querySelector("p").innerHTML = temps.getSeconds().toString();
  hoursElement.querySelector("p").innerHTML = (temps.getHours() - 4).toString();

  if (curentStatus == "Break") {
    document.getElementById("activity").innerHTML = curentActivity;
  }
}

let btn = document.querySelector("#btn_action");
btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btn.setAttribute("src", "../assets/svg/Pause.svg");
  } else {
    audio.pause();
    btn.setAttribute("src", "../assets/svg/Play.svg");
  }
});

function clearSound() {
  audio.pause();
  audio.currentTime = 0;
  let div = document.querySelector("#player_widget") as HTMLDivElement;
  div.style.display = "none";
}

function changeBackGround() {
  let random = Math.floor(Math.random() * imagesBackground.length);
  let body = document.querySelector("body") as HTMLBodyElement;
  body.style.backgroundImage =
    "url(./assets/pic/" + imagesBackground[random] + ")";
}

async function getFileFolder(path: string) {
  let files: string[] = [];
  await $.ajax({
    url: path,
    method: "GET",
    cache: false,
    dataType: "json",
    crossDomain: true,

    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },

    data: {
      path: path,
    },
  }).then((data) => {
    files = data;
  });
  return files;
}
