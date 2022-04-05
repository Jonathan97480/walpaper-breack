var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var workTime = 1;
var breakTimeMinutes = 15;
var workTimeMinutes = workTime * 60;
var activity = [
    "Passer le balai",
    "Faire la vaiselle",
    "Ranger le fauteuil",
    "Ranger son bureau",
    "netoyer la litiere du chat",
    "Faire un tour de la maison",
    "sortire de la maison",
];
var audio = new Audio("../assets/alert_breack.mp3");
var curentActivity = "";
var curentWorkTime = workTimeMinutes * 60;
var curentBreakTime = breakTimeMinutes * 60;
var curentTime = 0;
var curentStatus = "";
var imagesBackground = [
    "19c98b100021d687cc5f6e5dcf69bd13.jpg",
    "1638073.webp",
    "beautiful-anime-kamado-nezuko.jpg",
    "Flandre-Scarlet-anime-girl-4k.jpg",
    "wp8706597.jpg",
];
function StartWorkTime() {
    curentStatus = "Work";
    changeBackGround();
    clearSound();
    clearActivity();
    var workInterval = setInterval(function () {
        if (curentWorkTime > 0) {
            curentWorkTime--;
            curentTime = curentWorkTime;
            DrawTimer();
        }
        else {
            clearInterval(workInterval);
            curentBreakTime = breakTimeMinutes * 60;
            StartBreakTime();
        }
    }, 1000);
}
function StartBreakTime() {
    curentStatus = "Break";
    playAlert();
    startActivity();
    var breakInterval = setInterval(function () {
        if (curentBreakTime > 0) {
            curentBreakTime--;
            curentTime = curentBreakTime;
            DrawTimer();
        }
        else {
            clearInterval(breakInterval);
            curentWorkTime = workTimeMinutes * 60;
            clearActivity();
            StartWorkTime();
        }
    }, 1000);
}
function startActivity() {
    curentActivity = activity[Math.floor(Math.random() * activity.length)];
}
function nextActivity() {
    startActivity();
    var activityElement = document.getElementById("activity");
    activityElement.innerHTML = curentActivity;
}
function clearActivity() {
    curentActivity = "";
}
function playAlert() {
    audio.play();
    var div = document.querySelector("#player_widget");
    div.style.display = "flex";
}
function stopAlert() {
    audio.pause();
}
StartWorkTime();
/* View Html Partie */
function DrawTimer() {
    var timer = document.getElementById("timer");
    var temps = new Date(curentTime * 1000);
    var status = document.getElementById("status");
    status.querySelector("p").innerHTML = curentStatus + " in progress";
    var statusPicture = document.getElementById("statusPicture");
    if (curentStatus == "Work") {
        statusPicture.setAttribute("src", "./assets/svg/Work.svg");
    }
    else {
        statusPicture.setAttribute("src", "./assets/svg/Break.svg");
    }
    var minutesElement = document.getElementById("Minute");
    var secondElement = document.getElementById("Seconde");
    var hoursElement = document.getElementById("Hour");
    minutesElement.querySelector("p").innerHTML = temps.getMinutes().toString();
    secondElement.querySelector("p").innerHTML = temps.getSeconds().toString();
    hoursElement.querySelector("p").innerHTML = (temps.getHours() - 4).toString();
    if (curentStatus == "Break") {
        document.getElementById("activity").innerHTML = curentActivity;
    }
}
var btn = document.querySelector("#btn_action");
btn.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        btn.setAttribute("src", "../assets/svg/Pause.svg");
    }
    else {
        audio.pause();
        btn.setAttribute("src", "../assets/svg/Play.svg");
    }
});
function clearSound() {
    audio.pause();
    audio.currentTime = 0;
    var div = document.querySelector("#player_widget");
    div.style.display = "none";
}
function changeBackGround() {
    var random = Math.floor(Math.random() * imagesBackground.length);
    var body = document.querySelector("body");
    body.style.backgroundImage =
        "url(./assets/pic/" + imagesBackground[random] + ")";
}
function getFileFolder(path) {
    return __awaiter(this, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = [];
                    return [4 /*yield*/, $.ajax({
                            url: path,
                            method: "GET",
                            cache: false,
                            dataType: "json",
                            crossDomain: true,
                            headers: {
                                accept: "application/json",
                                "Access-Control-Allow-Origin": "*"
                            },
                            data: {
                                path: path
                            }
                        }).then(function (data) {
                            files = data;
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, files];
            }
        });
    });
}
