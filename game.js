const game = {
    currentNumber: '',
    displayTime: 2000,
    timeDecrement: 100,
    level: 1,
  
    generateNumber() {
      return Math.floor(10000 + Math.random() * 90000).toString();
    },
  
    displayNumber() {
      this.currentNumber = this.generateNumber();
      document.getElementById('number-display').textContent = this.currentNumber;
      document.getElementById('level-display').textContent = `Level ${this.level}`;
      setTimeout(() => {
        document.getElementById('number-display').textContent = '';
      }, this.displayTime);
    },
  
    checkGuess() {
      const userGuess = document.getElementById('user-input').value;
      const resultElement = document.getElementById('result');
  
      if (userGuess === this.currentNumber) {
        this.level++;
        resultElement.textContent = `Correct! Moving to Level ${this.level}`;
        this.displayTime -= this.timeDecrement;
        if (this.displayTime < 100) {
          this.displayTime = 100;
        }
        this.throwConfetti();
      } else {
        this.gameOver();
      }
  
      document.getElementById('user-input').value = '';
    },
  
    throwConfetti() {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    },
  
    gameOver() {
      document.querySelector('.game-over').style.display = 'flex';
    },
  
    restart() {
      this.level = 1;
      this.displayTime = 2000;
      document.querySelector('.game-over').style.display = 'none';
      document.getElementById('result').textContent = '';
      this.displayNumber();
    },
  
    handleDialInput(value) {
      const input = document.getElementById('user-input');
      if (value === 'clear') {
        input.value = '';
      } else if (value === 'backspace') {
        input.value = input.value.slice(0, -1);
      } else if (input.value.length < 5) {
        input.value += value;
      }
    },
  
    init() {
      document.getElementById('submit-btn').addEventListener('click', () => {
        this.checkGuess();
        if (this.level > 1) {  // Only display next number if not game over
          this.displayNumber();
        }
      });
      
      const dialButtons = document.querySelectorAll('.dial-button');
      dialButtons.forEach(button => {
        button.addEventListener('click', () => {
          const value = button.dataset.action || button.textContent;
          this.handleDialInput(value);
        });
      });
  
      document.getElementById('restart-btn').addEventListener('click', () => this.restart());
  
      this.displayNumber();
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => game.init());