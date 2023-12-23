const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

let secretCode = generateSecretCode();

function generateSecretCode() {
  const code = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    code.push(colors[randomIndex]);
  }
  return code;
}

function createPeg(color, container) {
  const peg = document.createElement('div');
  peg.className = `${container}-peg`;
  peg.style.backgroundColor = color;
  return peg;
}

function displayCode() {
  const codeContainer = document.getElementById('code-container');
  secretCode.forEach(color => {
    codeContainer.appendChild(createPeg(color, 'code'));
  });
}

function checkGuess() {
  // Implement the logic to check the guessed code and provide feedback
  // Update the interface accordingly
}

// Call displayCode to show the secret code when the page loads
displayCode();
