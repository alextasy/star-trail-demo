document.addEventListener('mousemove', handleMouseMove);

const COLORS = ['#ffa3ed', '#a3fffd', '#daffa3', '#ffeba3', '#ffc2a3'];
const ANIMATIONS = ['fall-1', 'fall-2', 'fall-3'];
const DISTANCE_BEFORE_SPAWN = 100;
const previousSpawnPos = { x: 0, y: 0 };

function handleMouseMove(event) {
  const x = event.clientX;
  const y = event.clientY;

  if (!shouldSpawnElement(x, y, DISTANCE_BEFORE_SPAWN)) return;

  const el = createStarSVG();
  el.classList.add('star-trail-element');
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  document.body.appendChild(el);

  setTimeout(() => document.body.removeChild(el), 1000);
}

function createStarSVG() {
  const svgNS = 'http://www.w3.org/2000/svg';

  // Create the SVG element
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('height', '20px');
  svg.setAttribute('width', '20px');
  svg.setAttribute('viewBox', '0 0 47.94 47.94');
  svg.setAttribute('xmlns', svgNS);
  svg.style.animationName = getRandomArrayElement(ANIMATIONS);

  // Create the path element
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('style', `fill:${getRandomArrayElement(COLORS)};`);
  path.setAttribute('d', 'M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956C22.602,0.567,25.338,0.567,26.285,2.486z');

  svg.appendChild(path);

  return svg;
}

function getRandomArrayElement(arr) {
  const randomIndex = Math.round(Math.random() * (arr.length - 1));
  return arr[randomIndex];
}

function shouldSpawnElement(x, y, distanceBeforeSpawn) {
  const distanceFromLastPos = calculateDistanceBetweenPoints(previousSpawnPos, { x, y });
  if (distanceFromLastPos < distanceBeforeSpawn) return;

  previousSpawnPos.x = x;
  previousSpawnPos.y = y;
  return true;
}


function calculateDistanceBetweenPoints({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}
