// ===============================
// 道南コース Web App
// main.js
// ===============================


// ===============================
// 現在時刻表示
// ===============================

function updateClock() {

  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, '0');

  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');

  const minutes = String(now.getMinutes()).padStart(2, '0');

  const seconds = String(now.getSeconds()).padStart(2, '0');


  // 日付
  const dateElement = document.getElementById("date");

  if (dateElement) {

    dateElement.textContent =
      `${year} / ${month} / ${day}`;

  }

  // 時間
  const clockElement = document.getElementById("clock");

  if (clockElement) {

    clockElement.textContent =
      `${hours}:${minutes}:${seconds}`;

  }

}

setInterval(updateClock, 1000);

updateClock();


// ===============================
// コース情報
// ===============================

let selectedCourseDay2 =
  localStorage.getItem("courseDay2") || "A";

let selectedCourseDay3 =
  localStorage.getItem("courseDay3") || "α";


// ===============================
// コース表示更新
// ===============================

function updateCourseDisplay() {

  const course2Element =
    document.getElementById("course-day2");

  const course3Element =
    document.getElementById("course-day3");


  const courseNamesDay2 = {
    A: "A（カヌー）",
    B: "B（中島遊覧）",
    C: "C（ウポポイ）"
  };

  const courseNamesDay3 = {
    α: "α（火口散策）",
    β: "β（登山）",
    γ: "γ（三松正夫記念館）"
  };


  if (course2Element) {

    course2Element.textContent =
      `2日目：${courseNamesDay2[selectedCourseDay2]}`;

  }

  if (course3Element) {

    course3Element.textContent =
      `3日目：${courseNamesDay3[selectedCourseDay3]}`;

  }

}

updateCourseDisplay();


// ===============================
// コース変更
// ===============================

function changeCourse() {

  const newCourse2 = prompt(
    "2日目のコースを入力してください（A / B / C）"
  );

  if (
    newCourse2 === "A" ||
    newCourse2 === "B" ||
    newCourse2 === "C"
  ) {

    selectedCourseDay2 = newCourse2;

    localStorage.setItem(
      "courseDay2",
      newCourse2
    );

  }


  const newCourse3 = prompt(
    "3日目のコースを入力してください（α / β / γ）"
  );

  if (
    newCourse3 === "α" ||
    newCourse3 === "β" ||
    newCourse3 === "γ"
  ) {

    selectedCourseDay3 = newCourse3;

    localStorage.setItem(
      "courseDay3",
      newCourse3
    );

  }

  updateCourseDisplay();

}


// ===============================
// 行程データ
// ===============================

const schedules = {

  common: [

    {
      time: "07:00",
      title: "起床"
    },

    {
      time: "08:30",
      title: "ホテル出発"
    }

  ],

  A: [

    {
      time: "09:30",
      title: "鹿部間欠泉"
    },

    {
      time: "13:30",
      title: "カヌー体験"
    },

    {
      time: "18:00",
      title: "ホテル到着"
    }

  ],

  B: [

    {
      time: "09:30",
      title: "鹿部間欠泉"
    },

    {
      time: "15:30",
      title: "中島ハイキング"
    },

    {
      time: "18:00",
      title: "ホテル到着"
    }

  ],

  C: [

    {
      time: "10:30",
      title: "遊覧船"
    },

    {
      time: "15:15",
      title: "ウポポイ学習"
    },

    {
      time: "18:30",
      title: "ホテル到着"
    }

  ]

};


// ===============================
// 次の予定表示
// ===============================

function updateNextSchedule() {

  const now = new Date();

  const currentMinutes =
    now.getHours() * 60 + now.getMinutes();


  const allSchedules = [

    ...schedules.common,
    ...schedules[selectedCourseDay2]

  ];


  let nextSchedule = null;


  for (const schedule of allSchedules) {

    const [hours, minutes] =
      schedule.time.split(":").map(Number);

    const scheduleMinutes =
      hours * 60 + minutes;


    if (scheduleMinutes >= currentMinutes) {

      nextSchedule = schedule;

      break;

    }

  }


  // 全て終了
  if (!nextSchedule) {

    document.getElementById(
      "next-time"
    ).textContent = "--:--";

    document.getElementById(
      "next-title"
    ).textContent = "本日の予定は終了しました";

    document.getElementById(
      "countdown"
    ).textContent = "";

    return;

  }


  // 次の予定表示
  document.getElementById(
    "next-time"
  ).textContent = nextSchedule.time;

  document.getElementById(
    "next-title"
  ).textContent = nextSchedule.title;


  // カウントダウン
  const [nextHours, nextMinutes] =
    nextSchedule.time.split(":").map(Number);

  const nextTotalMinutes =
    nextHours * 60 + nextMinutes;

  const remainMinutes =
    nextTotalMinutes - currentMinutes;


  document.getElementById(
    "countdown"
  ).textContent =
    `あと ${remainMinutes} 分`;

}

setInterval(updateNextSchedule, 1000);

updateNextSchedule();


// ===============================
// タイムライン生成
// ===============================

function renderTimeline() {

  const timeline =
    document.getElementById("timeline");

  if (!timeline) return;

  timeline.innerHTML = "";


  const allSchedules = [

    ...schedules.common,
    ...schedules[selectedCourseDay2]

  ];


  allSchedules.forEach(schedule => {

    const item = document.createElement("div");

    item.className = "timeline-item";


    item.innerHTML = `

      <div class="dot"></div>

      <div class="timeline-content">

        <div class="timeline-time">
          ${schedule.time}
        </div>

        <div class="timeline-title">
          ${schedule.title}
        </div>

      </div>

    `;

    timeline.appendChild(item);

  });

}

renderTimeline();


// ===============================
// 緊急連絡データ
// ===============================

const notices = [

  {
    title: "集合時間変更",
    body:
      "17:00集合 → 17:15集合に変更になりました。"
  },

  {
    title: "花火について",
    body:
      "20:15より洞爺湖花火が始まります。"
  }

];


// ===============================
// 緊急連絡表示
// ===============================

function renderNotice() {

  const noticeTitle =
    document.getElementById("notice-title");

  const noticeText =
    document.getElementById("notice-text");


  if (!noticeTitle || !noticeText) return;


  noticeTitle.textContent =
    notices[0].title;

  noticeText.textContent =
    notices[0].body;

}

renderNotice();


// ===============================
// ページ読み込み演出
// ===============================

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});


// ===============================
// デバッグ
// ===============================

console.log("道南コース Web App 起動"); 

// =====================================
// コース設定読み込み
// =====================================

function loadCourseSettings(){

  const day2 =
    localStorage.getItem("courseDay2") || "A";

  const day3 =
    localStorage.getItem("courseDay3") || "α";


  // 表示更新

  const day2Element =
    document.getElementById("course-day2");

  const day3Element =
    document.getElementById("course-day3");


  if(day2Element){

    day2Element.textContent =
      `2日目：${day2}`;

  }

  if(day3Element){

    day3Element.textContent =
      `3日目：${day3}`;

  }

}

loadCourseSettings();

// =====================================
// IMPORTANT同期
// =====================================
// =====================================
// IMPORTANT同期
// =====================================

function loadImportantNotice(){

  // notice.html のデータ取得

  const notices = JSON.parse(
    localStorage.getItem("notices")
  ) || [];

  // HTML取得

  const title =
    document.getElementById("notice-title");

  const text =
    document.getElementById("notice-text");


  // =====================================
  // 連絡が0件の場合
  // =====================================

  if(notices.length === 0){

    if(title){

      title.textContent =
        "現在、重要な連絡はありません。";

    }

    if(text){

      text.textContent =
        "新しい連絡が追加されるとここに表示されます。";

    }

    return;

  }


  // =====================================
  // 一番上の連絡を表示
  // =====================================

  const latestNotice = notices[0];

  if(title){

    title.textContent =
      latestNotice.title;

  }

  if(text){

    text.textContent =
      latestNotice.body;

  }

}

// 実行

loadImportantNotice();