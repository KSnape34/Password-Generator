const slider = document.querySelector('.slider');
const length = document.querySelector('.length');
const passwordCopyButton = document.querySelector('.password-copy');


const includeUppercase = document.querySelector('#upper');
const includeLowercase = document.querySelector('#lower');
const includeNumbers = document.querySelector('#numbers');
const includeSymbols = document.querySelector('#symbols');

const generateButton = document.querySelector('.btn-generate');
const passwordDisplay = document.querySelector('.password');
const copyButton = document.querySelector('password-copy');

let canCopy = false;

slider.addEventListener('input', () =>{
    length.textContent = slider.value
})

const characters = {
    uppercase: 'abcdefghijklmnopqrstuvxyz',
    lowercase: 'ABCDEFGHIJKLMNOPQRSTUVXYZ',
    numbers: '0123456789',
    symbols: '£$&()*+[]@#^-_!<>?;:,.'
};

const createPassword = (options) => {
    let charset = '';

    if(options.uppercase){
        charset += characters.uppercase
    }

    if(options.lowercase){
        charset += characters.lowercase
    }

    if(options.numbers){
        charset += characters.numbers
    }

    if(options.symbols){
        charset += characters.symbols
    }

    if(charset.length === 0){
        alert('Please select at least one character type')
        return '';
    }

    
    
    let password = '';
    for(let i = 0; i < options.length; i++){
        const randomIndex = Math.floor(Math.random() * charset.length)
        password += charset.charAt(randomIndex)
    }
    return password;
}


generateButton.addEventListener('click', () => {
    const passwordOptions ={
        length: slider.value,
        uppercase: includeUppercase.checked,
        lowercase: includeLowercase.checked,
        numbers: includeNumbers.checked,
        symbols: includeSymbols.checked,
    };

    const password = createPassword(passwordOptions)
    passwordDisplay.textContent = password;
});

const copyPassword = async () => {
    if(!passwordDisplay.textContent || passwordCopiedNotification.textContent) return;
    if(!canCopy) return;
  
    await navigator.clipboard.writeText(passwordDisplay.textContent);
    passwordCopiedNotification.textContent = 'Copied';
  
    // Fade out text after 1 second
    setTimeout(() => {
      passwordCopiedNotification.style.transition = 'all 1s';
      passwordCopiedNotification.style.opacity = 0;
  
      // Remove styles and text after fade out
      setTimeout(() => {
        passwordCopiedNotification.style.removeProperty('opacity');
        passwordCopiedNotification.style.removeProperty('transition');
        passwordCopiedNotification.textContent = '';
      }, 1000);
    }, 1000);
    
  }

  passwordCopyButton.addEventListener('click', copyPassword);