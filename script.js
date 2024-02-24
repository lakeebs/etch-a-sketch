// Declare variables
const grid = document.querySelector('.grid');
const resize = document.querySelector('button.resize');
const reset = document.querySelector('button.reset');
const clear = document.querySelector('button.clear');

// Radio buttons
const blackButton = document.querySelector('#black');
const shadeButton = document.querySelector('#shade');
const rgbButton = document.querySelector('#rgb');

blackButton.addEventListener('click', function() {
  if (rgbButton.checked) {
    rgbButton.checked = false;
  }
});

rgbButton.addEventListener('click', function() {
  if (blackButton.checked) {
    blackButton.checked = false;
  }
});

// Event listeners
reset.addEventListener('click', resetGrid);
resize.addEventListener('click', resizeGrid);

// Add squares to container
function createGrid(gridNum) {
  grid.innerHTML = ''; // Empty the grid
  const gridNumSq = gridNum * gridNum;

  for(let i = 0; i < (gridNumSq ? gridNumSq : 256); i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.opacity = '0';
    square.style.flex = '0 0 calc(100% / ' + gridNum + ')';
    grid.appendChild(square);

    // Mark squares on hover
    square.addEventListener('mouseenter', function(){
      if (blackButton.checked) {
        this.style.opacity = 1;

        if (this.classList.contains('marked-rgb') || this.classList.contains('marked-shade')) {
          this.classList.remove('marked-rgb');
          this.classList.remove('marked-shade');
        }
        this.classList.add('marked-black');
      } else if (rgbButton.checked) {
        this.style.opacity = 1;

        if (this.classList.contains('marked-black') || this.classList.contains('marked-shade')) {
          this.classList.remove('marked-black');
          this.classList.remove('marked-shade');
        }
        this.classList.add('marked-rgb');
        this.style.setProperty('--red', Math.floor(Math.random() * 256));
        this.style.setProperty('--green', Math.floor(Math.random() * 256));
        this.style.setProperty('--blue', Math.floor(Math.random() * 256));
      } else if (shadeButton.checked) {
        if (this.classList.contains('marked-rgb') || this.classList.contains('marked-black')) {
          this.classList.remove('marked-black');
          this.classList.remove('marked-rgb');
        }
        this.classList.add('marked-shade');
        if (parseFloat(this.style.opacity) < 1) {
          this.style.opacity = parseFloat(this.style.opacity) + 0.1;
        }
      }
    });

    // Clear the board
    clear.addEventListener('click', function(){
      square.style.opacity = '0';
      square.classList.remove('marked-black');
      square.classList.remove('marked-shade');
      square.classList.remove('marked-rgb');
    });
  }

};

// IIFE function that runs on window load
(function() {
  createGrid(16);
})();

// Reset
function resetGrid() {
  createGrid(16);
}

// Resize the grid
function resizeGrid() {
  const gridNum = prompt('Enter a number');
  if (!gridNum) return;

  if (gridNum > 100 || gridNum <= 0 || (gridNum % 1 !== 0)) {
    alert('Number invalid!');
    resizeGrid();
  } else {
    const markedSquares = document.querySelectorAll('.marked-black');
    markedSquares.forEach(function(element) {
      element.classList.remove('marked-black');
      element.classList.remove('marked-shade');
      element.classList.remove('marked-rgb');
    });
    createGrid(gridNum);
  }
};