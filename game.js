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
      } else {
        resultElement.textContent = `Wrong! The number was ${this.currentNumber}. Stay on Level ${this.level}`;
      }
  
      document.getElementById('user-input').value = '';
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
      document.getElementById('submit-btn').addEventListener('click', () => this.checkGuess());
      
      const dialButtons = document.querySelectorAll('.dial-button');
      dialButtons.forEach(button => {
        button.addEventListener('click', () => {
          const value = button.dataset.action || button.textContent;
          this.handleDialInput(value);
        });
      });
  
      this.displayNumber();
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => game.init());