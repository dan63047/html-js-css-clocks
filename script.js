var month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    day_of_week = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    svg_pause = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/></svg>',
    svg_play = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>',
    svg_reset = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>',
    stopwatch_on_pause = true,
    timer_setted = false,
    elapsedTime = 0,
    startTime, sInterval, tInterval;

function Clocks(){
    var now = new Date();
    document.title = "Часики - " + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
    document.getElementById("main_time").innerHTML = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
    document.getElementById("msec_time").innerHTML = "." + ("00" + now.getMilliseconds()).slice(-3);
    document.getElementById("date").innerHTML = day_of_week[now.getDay()] + ", " + now.getDate() + " " + month[now.getMonth()] + " " + now.getFullYear() + " г.";
    document.getElementById("hour").style.transform = `rotateZ(${now.getHours()*30+(now.getMinutes()*6)/12+(now.getSeconds()*6)/720}deg)`;
    document.getElementById("min").style.transform = `rotateZ(${now.getMinutes()*6+(now.getSeconds()*6)/60+(now.getMilliseconds()*0.36)/3600}deg)`;
    document.getElementById("sec").style.transform = `rotateZ(${now.getSeconds()*6+(now.getMilliseconds()*0.36)/60}deg)`;
}
function ChangeSelect(e){
    let lal = document.getElementsByClassName("select")
    for (let i = 0; i < lal.length; i++) {
        const el = lal[i];
        if (el.className == "select thing"){el.classList.toggle("thing")}
    }
    e.classList.toggle("thing")
    let lal2 = [document.getElementById("clocks"), document.getElementById("stopwatch"), document.getElementById("timer")]
    for (let i = 0; i < lal2.length; i++){
        const el = lal2[i];
        if (el.className == "show"){el.classList.toggle("show")}
        if (e.id.substring(1) == el.id){el.classList.toggle("show")}
        
    }
}
setInterval(Clocks, 1000/60)
document.getElementById("s_start").innerHTML = svg_play
document.getElementById("timer_button").innerHTML = svg_play

function stopwatch() {
    if (stopwatch_on_pause){
        startTime = Date.now() - elapsedTime;
        sInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        let h = Math.floor(elapsedTime/3600000);
        let m = Math.floor((elapsedTime/1000/60)%60);
        let s = Math.floor((elapsedTime/1000)%60);
        let ms = Math.floor(elapsedTime%1000)
        document.getElementById("main_sw").innerHTML = h + ":" + ("0"+m).slice(-2) + ":" + ("0"+s).slice(-2);
        document.getElementById("msec_sw").innerHTML = "." + ("00"+ms).slice(-3);
        document.getElementById("shour").style.transform = `rotateZ(${h*30+(m*6)/12+(s*6)/720}deg)`;
        document.getElementById("smin").style.transform = `rotateZ(${m*6+(s*6)/60+(ms*0.36)/3600}deg)`;
        document.getElementById("ssec").style.transform = `rotateZ(${s*6+(ms*0.36)/60}deg)`;
    }, 1000/60);
    document.getElementById("s_start").innerHTML = svg_pause;
    stopwatch_on_pause = false
    }else{
        clearInterval(sInterval);
        document.getElementById("s_start").innerHTML = svg_play;
        stopwatch_on_pause = true
    }
}
function reset() {
    clearInterval(sInterval);
    document.getElementById("main_sw").innerHTML = "0:00:00";
    document.getElementById("msec_sw").innerHTML = ".000";
    document.getElementById("shour").style.transform = `rotateZ(0deg)`;
    document.getElementById("smin").style.transform = `rotateZ(0deg)`;
    document.getElementById("ssec").style.transform = `rotateZ(0deg)`;
    elapsedTime = 0;
    document.getElementById("s_start").innerHTML = svg_play;
    stopwatch_on_pause = true
  }
function timer(){
    if (timer_setted){
        clearInterval(tInterval);
        document.getElementById("main_t").innerHTML = "0:00:00";
        document.getElementById("msec_t").innerHTML = ".000";
        document.getElementById("thour").style.transform = `rotateZ(0deg)`;
        document.getElementById("tmin").style.transform = `rotateZ(0deg)`;
        document.getElementById("tsec").style.transform = `rotateZ(0deg)`;
        timer_setted = false;
        document.getElementById("timer_button").innerHTML = svg_play;
    }else{
        let timer_time = Date.now() + document.getElementById("set_timer_h").value*3600000 + document.getElementById("set_timer_m").value*60000 + document.getElementById("set_timer_s").value*1000;
        tInterval = setInterval(function printTimer() {
            let leftTime = timer_time - Date.now();
            if (leftTime > 0){
                let h = Math.floor(leftTime/3600000);
                let m = Math.floor((leftTime/1000/60)%60);
                let s = Math.floor((leftTime/1000)%60);
                let ms = Math.floor(leftTime%1000)
                document.getElementById("main_t").innerHTML = h + ":" + ("0"+m).slice(-2) + ":" + ("0"+s).slice(-2);
                document.getElementById("msec_t").innerHTML = "." + ("00"+ms).slice(-3);
                document.getElementById("thour").style.transform = `rotateZ(-${h*30+(m*6)/12+(s*6)/720}deg)`;
                document.getElementById("tmin").style.transform = `rotateZ(-${m*6+(s*6)/60+(ms*0.36)/3600}deg)`;
                document.getElementById("tsec").style.transform = `rotateZ(-${s*6+(ms*0.36)/60}deg)`;
            }else{
                timer()
            }
        }, 1000/60);
        timer_setted = true;
        document.getElementById("timer_button").innerHTML = svg_reset;
    }
}