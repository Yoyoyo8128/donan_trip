// ===============================
// 道南コース Web App
// script.js
// ===============================



// =====================================
// 現在時刻表示
// =====================================

function updateClock(){

  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    String(now.getMonth() + 1)
    .padStart(2,"0");

  const day =
    String(now.getDate())
    .padStart(2,"0");

  const hours =
    String(now.getHours())
    .padStart(2,"0");

  const minutes =
    String(now.getMinutes())
    .padStart(2,"0");

  const seconds =
    String(now.getSeconds())
    .padStart(2,"0");



  // 日付

  const dateElement =
    document.getElementById("date");

  if(dateElement){

    dateElement.textContent =
      `${year} / ${month} / ${day}`;

  }



  // 時間

  const clockElement =
    document.getElementById("clock");

  if(clockElement){

    clockElement.textContent =
      `${hours}:${minutes}:${seconds}`;

  }

}

setInterval(updateClock,1000);

updateClock();



// =====================================
// コース取得
// =====================================

const courseDay2 =
  localStorage.getItem("courseDay2")
  || "A";

const courseDay3 =
  localStorage.getItem("courseDay3")
  || "α";

const courseDay4 =
  localStorage.getItem("courseDay4")
  || "小樽";



// =====================================
// コース表示
// =====================================

function updateCourseDisplay(){

  const day2Element =
    document.getElementById("course-day2");

  const day3Element =
    document.getElementById("course-day3");

  const day4Element =
    document.getElementById("course-day4");



  const courseNamesDay2 = {

    A:"A（カヌー）",
    B:"B（中島遊覧）",
    C:"C（ウポポイ）"

  };



  const courseNamesDay3 = {

    α:"α（火口散策）",
    β:"β（登山）",
    γ:"γ（三松正夫記念館）"

  };



  const courseNamesDay4 = {

    小樽:"小樽",
    室蘭:"室蘭"

  };



  if(day2Element){

    day2Element.textContent =
      `2日目：${courseNamesDay2[courseDay2]}`;

  }



  if(day3Element){

    day3Element.textContent =
      `3日目：${courseNamesDay3[courseDay3]}`;

  }



  if(day4Element){

    day4Element.textContent =
      `4日目：${courseNamesDay4[courseDay4]}`;

  }

}

updateCourseDisplay();



// =====================================
// 今日の工程取得
// =====================================

function getTodaySchedules(){

  const now = new Date();

  const month =
    now.getMonth() + 1;

  const date =
    now.getDate();



  // =====================================
  // 1日目
  // =====================================

  if((month === 6 && date === 1)){

    return schedules.day1;

  }



  // =====================================
  // 2日目
  // =====================================

  if((month === 6 && date === 2)||(month===5 && date===29)){

    return [

      ...schedules.day2_mae,

      ...schedules.day2[courseDay2],

      ...schedules.day2_ato

    ];

  }



  // =====================================
  // 3日目
  // =====================================

  if(month === 6 && date === 3){

    return [

      ...schedules.day3_mae,

      ...schedules.day3[courseDay3],

      ...schedules.day3_ato

    ];

  }



  // =====================================
  // 4日目
  // =====================================

  if(month === 6 && date === 4){

    return [

      ...schedules.day4_mae,

      ...schedules.day4[courseDay4],

      ...schedules.day4_ato

    ];

  }



  // =====================================
  // それ以外
  // =====================================

  return;

}



// =====================================
// NEXT SCHEDULE
// =====================================

function updateNextSchedule(){

  const now = new Date();

  const currentMinutes =

    now.getHours() * 60
    + now.getMinutes();



  const todaySchedules =
    getTodaySchedules();



  let nextSchedule = null;



  for(const schedule of todaySchedules){

    const [hour,minute] =

      schedule[0]
      .split(":")
      .map(Number);



    const scheduleMinutes =

      hour * 60 + minute;



    if(scheduleMinutes >= currentMinutes){

      nextSchedule = schedule;

      break;

    }

  }



  // =====================================
  // 全予定終了
  // =====================================

  if(!nextSchedule){

    const nextTime =
      document.getElementById("next-time");

    const nextTitle =
      document.getElementById("next-title");

    const nextSub =
      document.getElementById("next-sub");

    const countdown =
      document.getElementById("countdown");



    if(nextTime){

      nextTime.textContent =
        "--:--";

    }

    if(nextTitle){

      nextTitle.textContent =
        "本日の予定は終了しました";

    }

    if(nextSub){

      nextSub.textContent =
        "";

    }

    if(countdown){

      countdown.textContent =
        "";

    }

    return;

  }



  // =====================================
  // 表示
  // =====================================

  const nextTime =
    document.getElementById("next-time");

  const nextTitle =
    document.getElementById("next-title");

  const nextSub =
    document.getElementById("next-sub");

  const countdown =
    document.getElementById("countdown");



  if(nextTime){

    nextTime.textContent =
      nextSchedule[0];

  }



  if(nextTitle){

    nextTitle.textContent =
      nextSchedule[1];

  }



  if(nextSub){

    nextSub.textContent =
      nextSchedule[2];

  }



  // =====================================
  // カウントダウン
  // =====================================

  const [nextHour,nextMinute] =

    nextSchedule[0]
    .split(":")
    .map(Number);



  const remainMinutes =

    (nextHour * 60 + nextMinute)
    - currentMinutes;



  if(countdown){
    const remainHours =
    Math.floor(remainMinutes / 60);

    const remainMins =
    remainMinutes % 60;

    countdown.textContent =
      `あと ${remainHours} 時間 ${remainMins} 分`;

  }

}

setInterval(updateNextSchedule,1000);

updateNextSchedule();



// =====================================
// 今日のタイムライン
// =====================================

function renderTimeline(){

  const timeline =
    document.getElementById("timeline");

  if(!timeline){

    return;

  }



  timeline.innerHTML = "";



  const todaySchedules =
    getTodaySchedules();



  todaySchedules.forEach(schedule => {

    timeline.innerHTML += `

      <div class="timeline-item">

        <div class="dot"></div>

        <div class="timeline-content">

          <div class="timeline-time">
            ${schedule[0]}
          </div>

          <div class="timeline-title">
            ${schedule[1]}
          </div>

          <div class="timeline-desc">
            ${schedule[2]}
          </div>

        </div>

      </div>

    `;

  });

}

renderTimeline();



// =====================================
// IMPORTANT同期
// =====================================

function loadImportantNotice(){

  const notices = JSON.parse(

    localStorage.getItem("notices")

  ) || [];



  const title =
    document.getElementById("notice-title");

  const text =
    document.getElementById("notice-text");



  if(!title || !text){

    return;

  }



  // =====================================
  // 連絡なし
  // =====================================

  if(notices.length === 0){

    title.textContent =
      "現在、重要な連絡はありません。";

    text.textContent =
      "新しい連絡が追加されるとここに表示されます。";

    return;

  }



  // =====================================
  // 最新連絡
  // =====================================

  title.textContent =
    notices[0].title;

  text.textContent =
    notices[0].body;

}

loadImportantNotice();



// =====================================
// ページ読み込み
// =====================================

window.addEventListener("load",() => {

  document.body.classList.add("loaded");

});



// =====================================
// デバッグ
// =====================================

console.log("道南コース Web App 起動");