const details = document.querySelectorAll("details");

details.forEach(detail => {
  const summary = detail.querySelector("summary");
  const content = detail.querySelector("p");

  // Apply initial styles for smooth transitions
  content.style.transition = "max-height 0.3s ease";
  content.style.overflow = "hidden";
  content.style.maxHeight = "0"; // Collapsed by default

  summary.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default summary behavior

    if (detail.open) {
      // Smoothly collapse
      content.style.maxHeight = "0";
      setTimeout(() => {
        detail.removeAttribute("open"); // Wait until animation finishes to toggle
      }, 300); // Match transition duration
    } else {
      // Smoothly expand
      detail.setAttribute("open", ""); // Open before expanding
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});


//stars
const container = document.getElementById('container');
const generateButton = document.getElementById('generateButton');
const maxStars = 5000;
let appearanceSpeed = 30; // Default appearance speed in milliseconds
let isGenerating = false; // Tracks whether stars are being generated
let starTimeouts = []; // Stores timeouts for star generation

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random rainbow color
function getRandomColor() {
  const hue = getRandomNumber(0, 360); // Hue ranges from 0 to 360
  return `hsl(${hue}, 100%, 50%)`; // Saturation 100%, Lightness 50% for vivid colors
}

function createStar() {
  const star = document.createElement('span');
  star.classList.add('star');
  star.textContent = '*';
  
  // Randomize position and color
  star.style.left = getRandomNumber(0, document.documentElement.clientWidth) + 'px';
  star.style.top = getRandomNumber(0, document.documentElement.scrollHeight) + 'px';
  star.style.color = getRandomColor();
  
  container.appendChild(star);
}

function generateStars() {
  if (container.querySelectorAll('.star').length < maxStars) {
    createStar();
    const timeout = setTimeout(generateStars, appearanceSpeed); // Adjust the appearance speed here
    starTimeouts.push(timeout); // Save timeout reference for later clearing
  } else {
    generateButton.disabled = true; // Disable the button after generating all stars
  }
}

// Toggle stars on and off
function toggleStars() {
  if (isGenerating) {
    // Stop generating and remove all stars
    isGenerating = false;
    generateButton.textContent = '*'; // Update button text
    generateButton.disabled = false;
    clearTimeouts(); // Clear all pending timeouts
    container.innerHTML = ''; // Remove all stars
  } else {
    // Start generating stars
    isGenerating = true;
    generateButton.textContent = '*'; // Update button text
    generateStars();
  }
}

// Clear all timeouts to stop generating stars
function clearTimeouts() {
  starTimeouts.forEach(timeout => clearTimeout(timeout));
  starTimeouts = [];
}

generateButton.addEventListener('click', toggleStars);

setTimeout(function() {
  var loadDiv = document.getElementById('load');
  loadDiv.style.display = 'none';
}, 5000);

// Update the container size dynamically to cover the entire page
function updateContainerSize() {
  container.style.height = document.documentElement.scrollHeight + 'px';
  container.style.width = document.documentElement.clientWidth + 'px';
}

// Update the container size on page resize or detail tag expansion
window.addEventListener('resize', updateContainerSize);
window.addEventListener('load', updateContainerSize);
updateContainerSize();
