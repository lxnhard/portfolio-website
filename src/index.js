import lozad from 'lozad';
import anime from 'animejs/lib/anime.es.js';
import './style.css';
import './form.js';


const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();


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
const sectionContact = document.querySelector(".section-contact");
const sectionContactContent = document.querySelector(".contact");
const navigationLinkAbout = document.querySelector("#navigation-link-about");
const navigationLinkWork = document.querySelector("#navigation-link-work");
const navigationLinkContact = document.querySelector("#navigation-link-contact");

let sectionDeactivate = sectionProfile;

let animationInProgress = false;

function toggleSections(sectionActivate) {

  if (animationInProgress) return;
  animationInProgress = true;

  if (sectionActivate.classList.contains("section--hidden")) {

    // identify DOM elements
    // const sectionDeactivate;
    let headerActivate;
    let contentActivate;
    let headerDeactivate;
    let contentDeactivate;

    switch (sectionActivate) {
      case sectionProfile:
        headerActivate = '.section-profile .section__header .letter';
        contentActivate = sectionProfileContent;
        break
      case (sectionWork):
        headerActivate = '.section-projects .section__header .letter';
        contentActivate = sectionWorkContent;
        break
      case (sectionContact):
        headerActivate = '.section-contact .section__header .letter';
        contentActivate = sectionContactContent;
    }

    switch (sectionDeactivate) {
      case sectionProfile:
        headerDeactivate = '.section-profile .section__header .letter'
        contentDeactivate = sectionProfileContent;
        break
      case (sectionWork):
        headerDeactivate = '.section-projects .section__header .letter'
        contentDeactivate = sectionWorkContent;
        break
      case (sectionContact):
        headerDeactivate = '.section-contact .section__header .letter'
        contentDeactivate = sectionContactContent;
    }


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
          sectionDeactivate = sectionActivate;
        }
      }, '-=520')
  }
  animationInProgress = false;

}

navigationLinkAbout.addEventListener("click", () => { toggleSections(sectionProfile) });
navigationLinkWork.addEventListener("click", () => { toggleSections(sectionWork) });
navigationLinkContact.addEventListener("click", () => { toggleSections(sectionContact) });


// H2 animation
let textWrapper = document.querySelectorAll('.section__header .letters');
textWrapper[0].innerHTML = textWrapper[0].textContent.replace(/\S/g, "<span class='letter'>$&</span>");
textWrapper[1].innerHTML = textWrapper[1].textContent.replace(/\S/g, "<span class='letter'>$&</span>");
textWrapper[2].innerHTML = textWrapper[2].textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: false })
  .add({
    targets: '.section-profile .section__header .letter',
    rotateY: [-90, 0],
    duration: 520,
    easing: 'easeInSine',
    delay: anime.stagger(45)
  })



let card = document.querySelectorAll(".card");

card.forEach(item => {
  item.addEventListener('click', function () {
    if (animationInProgress)
      return;

    animationInProgress = true;
    anime({
      targets: item,
      scale: [{ value: 1 }, { value: 1.1 }, { value: 1, delay: 250 }],
      rotateY: { value: '+=180', delay: 200 },
      easing: 'easeInOutSine',
      duration: 400,
      complete: function () {
        animationInProgress = false;
      }
    });
  });
});