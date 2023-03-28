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


// navigation 

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

// sections

const sectionProfile = document.querySelector(".section-profile");
const sectionProfileContent = document.querySelector(".profile");
const sectionWork = document.querySelector(".section-projects");
const sectionWorkContent = document.querySelector(".project-list");
const navigationLinkAbout = document.querySelector("#navigation-link-about");
const navigationLinkWork = document.querySelector("#navigation-link-work");

let animationInProgress = false;

function toggleSections(sectionActivate) {

  if (animationInProgress) return;
  animationInProgress = true;

  if (sectionActivate.classList.contains("section--hidden")) {

    // identify DOM elements
    const sectionDeactivate = (sectionActivate == sectionProfile) ? sectionWork : sectionProfile;
    const headerActivate = (sectionActivate == sectionProfile) ? '.section-profile .section__header .letter' : '.section-projects .section__header .letter'
    const headerDeactivate = (sectionActivate != sectionProfile) ? '.section-profile .section__header .letter' : '.section-projects .section__header .letter'
    const contentActivate = (sectionActivate == sectionProfile) ? sectionProfileContent : sectionWorkContent;
    const contentDeactivate = (sectionActivate != sectionProfile) ? sectionProfileContent : sectionWorkContent;

    // animate
    anime.timeline({ loop: false })
      .add({
        targets: contentDeactivate,
        opacity: '0',
        duration: 520,
        easing: 'easeInSine'
      })
      .add({
        targets: headerDeactivate,
        rotateY: [0, -90],
        duration: 520,
        easing: 'easeInSine',
        delay: anime.stagger(45, { direction: 'reverse' }),
        complete: function () {
          sectionActivate.classList.toggle("section--hidden");
          sectionDeactivate.classList.toggle("section--hidden");
        },
      }, '-=520')
      .add({
        targets: headerActivate,
        rotateY: [-90, 0],
        duration: 520,
        easing: 'easeInSine',
        delay: anime.stagger(45),
      })
      .add({
        targets: contentActivate,
        opacity: '1',
        duration: 520,
        easing: 'easeInSine',
        complete: function () {
          animationInProgress = false;
        }
      }, '-=520')
  }
  animationInProgress = false;
}

navigationLinkAbout.addEventListener("click", () => { toggleSections(sectionProfile) });
navigationLinkWork.addEventListener("click", () => { toggleSections(sectionWork) });


// H2 animation
let textWrapper = document.querySelectorAll('.section__header .letters');
textWrapper[0].innerHTML = textWrapper[0].textContent.replace(/\S/g, "<span class='letter'>$&</span>");
textWrapper[1].innerHTML = textWrapper[1].textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: false })
  .add({
    targets: '.section-profile .section__header .letter',
    rotateY: [-90, 0],
    duration: 520,
    easing: 'easeInSine',
    delay: anime.stagger(45)
  })

