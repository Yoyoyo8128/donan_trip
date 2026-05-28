// ====================================

setInterval(updateSchedule, 1000);
updateSchedule();


// ====================================
// 地図
// ====================================

const map = L.map('map').setView([42.4, 140.8], 8);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(map);


// 1日目
const day1 = [
  [41.77, 140.73],
  [41.79, 140.75]
];

// 2日目
const day2 = [
  [41.79, 140.75],
  [42.56, 140.84]
];

// 3日目
const day3 = [
  [42.56, 140.84],
  [42.49, 141.14]
];

// 4日目
const day4 = [
  [42.49, 141.14],
  [43.19, 140.99]
];

L.polyline(day1, {
  color: 'orange',
  weight: 7
}).addTo(map);

L.polyline(day2, {
  color: 'deepskyblue',
  weight: 7
}).addTo(map);

L.polyline(day3, {
  color: 'yellow',
  weight: 7
}).addTo(map);

L.polyline(day4, {
  color: 'hotpink',
  weight: 7
}).addTo(map);


// ニコちゃん
const smileIcon = L.divIcon({
  className: 'emoji-icon',
  html: '😊',
  iconSize: [40, 40]
});

L.marker([42.56, 140.84], {
  icon: smileIcon
}).addTo(map);
