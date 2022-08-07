import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const ITEM_KEY = 'feedback-form-state';
let formInputs = {};

if (localStorage.getItem(ITEM_KEY)) {
    const inputValues = JSON.parse(localStorage.getItem(ITEM_KEY));
    formInputs = inputValues;
    Object.keys(inputValues).forEach(key => {
        form[key].value = inputValues[key];
    });
};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
    formInputs[event.target.name] = event.target.value;
    localStorage.setItem(ITEM_KEY, JSON.stringify(formInputs));
}

function onFormSubmit(event) {
    event.preventDefault();
    console.log(JSON.parse(localStorage.getItem(ITEM_KEY)));
    localStorage.removeItem(ITEM_KEY);
    event.currentTarget.reset();
}