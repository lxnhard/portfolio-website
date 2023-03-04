import './style.css';
import './cube.js';
import './form.js';

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".contact__button");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


const menuButton = document.querySelector(".menu__button");
const navList = document.querySelector(".navigation-list");
const brand = document.querySelector(".page-header__brand");
const brandTitle = document.querySelector(".page-header__brand__title");
const brandLabel = document.querySelector(".page-header__brand__label");

function toggleNav() {
  menuButton.classList.toggle("menu__button--rotate");
  navList.classList.toggle("mobile--hidden");
  brand.classList.toggle("mobile--hidden");
  brandTitle.classList.toggle("mobile--hidden");
  brandLabel.classList.toggle("mobile--hidden");
}

menuButton.addEventListener("click", toggleNav);