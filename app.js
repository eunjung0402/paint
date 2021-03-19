const canvas = document.getElementById("jsCanvas");
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const defaultColor = "#2c2c2c";
const cavasSize = 700;

const ctx = canvas.getContext("2d");

canvas.width = cavasSize;
canvas.height = cavasSize;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, cavasSize);
ctx.strokeStyle = defaultColor;
ctx.fillStyle = defaultColor;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

//마우스 움직이는 값 모션
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

//컬러 변경 모션
function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
}

//브러쉬 사이즈 조절 모션
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

//fill의 색상 채우기 모션
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, cavasSize);
  }
}

//버튼명 변경 모션
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

//마우스 우클릭방지 모션
function handleCM(event) {
  event.preventDefault();
}

//이미지 저장 모션
function handleSaveClick() {
  const ing = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = ing;
  link.download = "은정 그림판 다운로드";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
