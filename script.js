let scheduleData = {};

let selectedDay2 = "A";
let selectedDay3 = "α";

fetch("data/schedule.json")
  .then(res => res.json())
  .then(data => {
    scheduleData = data;

    renderTimeline();
    updateLiveSchedule();

    setInterval(updateLiveSchedule, 1000);
  });

/* ボタン切り替え */
document.querySelectorAll(".course-btn").forEach(btn => {

  btn.addEventListener("click", () => {

    const day = btn.dataset.day;
    const course = btn.dataset.course;

    document
      .querySelectorAll(`.course-btn[data-day="${day}"]`)
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    if(day === "2"){
      selectedDay2 = course;
    }else{
      selectedDay3 = course;
    }

    renderTimeline();
  });

});

/* タイムライン描画 */
function renderTimeline(){

  const timeline = document.getElementById("timeline");

  timeline.innerHTML = "";

  const day2 = scheduleData.day2?.[selectedDay2] || [];
  const day3 = scheduleData.day3?.[selectedDay3] || [];

  const merged = [
    ...day2,
    ...day3
  ];

  merged.forEach(item => {

    timeline.innerHTML += `
      <div class="timeline-item">
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.description}</div>
      </div>
    `;

  });

}

/* 現在予定 */
function updateLiveSchedule(){

  const now = new Date();

  const currentEvent = document.getElementById("currentEvent");
  const nextEvent = document.getElementById("nextEvent");
  const countdown = document.getElementById("countdown");

  const events = [
    {
      start: new Date("2026-06-01T08:00:00"),
      end: new Date("2026-06-01T09:45:00"),
      title:"羽田空港集合"
    },
    {
      start: new Date("2026-06-02T13:30:00"),
      end: new Date("2026-06-02T15:00:00"),
      title:"アクティビティ"
    },
    {
      start: new Date("2026-06-03T14:30:00"),
      end: new Date("2026-06-03T17:00:00"),
      title:"登別観光"
    }
  ];

  let current = null;
  let next = null;

  for(let i=0;i<events.length;i++){

    const ev = events[i];

    if(now >= ev.start && now <= ev.end){
      current = ev;
      next = events[i+1];
      break;
    }

    if(now < ev.start){
      next = ev;
      break;
    }

  }

  currentEvent.textContent =
    current ? current.title : "現在予定はありません";

  nextEvent.textContent =
    next ? next.title : "次の予定はありません";

  if(next){

    const diff = next.start - now;

    const h = Math.floor(diff / 1000 / 60 / 60);
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    countdown.textContent =
      `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

  }

}