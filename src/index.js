import lozad from 'lozad';
import anime from 'animejs/lib/anime.es.js';
import './style.css';
// import './cube.js';
import './form.js';


const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

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


// Wrap every letter in a span
let textWrapper = document.querySelector('.ml10 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: false })
  .add({
    targets: '.ml10 .letter',
    rotateY: [-90, 0],
    duration: 2600,
    delay: (el, i) => 90 * i
  })



// addEventListener("scroll", (event) => {
//   let rect = textWrapper.getBoundingClientRect();
//   console.log(rect.y);
//   if (rect.y <= 90) {
//     anime.timeline({ loop: false })
//       .add({
//         targets: '.ml10',
//         opacity: 0,
//         duration: 1000,
//         easing: "easeOutExpo",
//         delay: 0
//       });
//   };
// });
