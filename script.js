// script.js

// 現在時刻表示

function updateClock(){

  const now = new Date();

  const text =
    now.getFullYear() + "/" +
    (now.getMonth()+1) + "/" +
    now.getDate() + " " +
    now.getHours().toString().padStart(2,"0") + ":" +
    now.getMinutes().toString().padStart(2,"0");

  document.getElementById("current-time").textContent = text;
}

setInterval(updateClock,1000);

updateClock();


// コース保存

const select = document.getElementById("course-select");

const savedCourse = localStorage.getItem("course");

if(savedCourse){
  select.value = savedCourse;
}

select.addEventListener("change",()=>{

  localStorage.setItem(
    "course",
    select.value
  );

  updateSchedule();

});


// 仮スケジュール

const schedules = {

  A:{
    time:"13:30",
    title:"大沼公園着",
    description:"カヌー体験"
  },

  B:{
    time:"15:30",
    title:"中島ハイキング",
    description:"自由行動"
  },

  C:{
    time:"15:15",
    title:"ウポポイ学習",
    description:"館内自由行動"
  },

  alpha:{
    time:"11:30",
    title:"有珠山山頂",
    description:"ロープウェイ"
  },

  beta:{
    time:"08:30",
    title:"登山開始",
    description:"体調注意"
  },

  gamma:{
    time:"09:15",
    title:"三松正夫記念館",
    description:"自由見学"
  }

};


function updateSchedule(){

  const course = select.value;

  const data = schedules[course];

  document.getElementById(
    "event-time"
  ).textContent = data.time;

  document.getElementById(
    "event-title"
  ).textContent = data.title;

  document.getElementById(
    "event-description"
  ).textContent = data.description;

}

updateSchedule();