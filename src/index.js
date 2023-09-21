import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import throttle from 'lodash/throttle';



import { photoSearch } from "./js/pixabayAPI";
import markupCreation from "./js/apiCreate";


const form = document.getElementById('search-form');
const inputValue = form.querySelector('input[name="searchQuery"]');
const btmForm = form.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
// const target= document.querySelector('.js-guard')
btmForm.setAttribute("disabled", true)

// console.log(pastNameInp);
const perPage = 40;
let page = 1;
let totalCardInHTML = 0;
console.log(inputValue.value.length);

inputValue.addEventListener("input", inputSearch);
function inputSearch() {
  inputValue.value = event.currentTarget.value;
if (inputValue.value.length > 1 ) {
  btmForm.removeAttribute("disabled");
} else {
  btmForm.setAttribute("disabled", true);
  };
}


form.addEventListener('submit', onClick);

function onClick(evt) {
  evt.preventDefault();
  inputValue.removeEventListener("input",inputSearch)
  window.removeEventListener('scroll', throttle(handleScroll, 2000));
    
    const searchParam = inputValue.value.trim();
    if (!searchParam) {
       return
  };
    clearingPage();
  callRequest(searchParam);
  
};

async function callRequest(param) {
  try {
      const resp = await photoSearch(param, perPage, page);
      console.log("rrrrr", resp);
      let totalPage = Math.ceil(resp.totalHits / 40);
      
      console.log('загальна кількість сторінок',totalPage);

        if (!resp.hits.length) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return
        };

      totalCardInHTML += resp.hits.length;
      let thisPage = Math.ceil(totalCardInHTML / perPage);
      console.log("поточна сторінка",thisPage);
      console.log("к-сть зав карток",totalCardInHTML);
      let totalCard = resp.total;
      
        if (totalCardInHTML > totalCard || resp.totalHits < 40) {
            Notiflix.Notify.info('There are no images on this topic!');
        }
        
      gallery.insertAdjacentHTML("beforeend", markupCreation(resp.hits));
      if (thisPage === 1) {
        Notiflix.Notify.success(`Found ${resp.totalHits} photos`);
      }

if (thisPage < totalPage) {
    window.addEventListener('scroll',handleScroll);
}

if (thisPage === totalPage) {
    console.log('hi, BB');
  window.removeEventListener('scroll', handleScroll);
  if (thisPage !== 1) {
     Notiflix.Notify.info('Congratulations, you have seen all the photos');
  }
}
      if (resp.totalHits > 40  ) {
        // observer.observe(target);
        if (totalCard > 40) {
           const { height: cardHeight } = document
       
        gallery.firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });         };
      };

      // observer.observe(target);
        if (totalCard > 40) {
           const { height: cardHeight } = document
    
        gallery.firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });         };

        const lightbox = new SimpleLightbox('.gallery a', { animationSpeed: 300 });
    
        
    } catch (error) {
        console.log(error);
    }; 
}

// let options = {
//   root: null,
//   rootMargin: "500px",
//   threshold: 1.0,
// };

// let observer = new IntersectionObserver((entries, observer) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       console.log(entry);
//         page += 1;
        
//       // callRequest(inputValue.value);
//     }
//   });
// }, options);

function onPage() {
  page += 1;
}

function clearingPage() {
    gallery.innerHTML = "";
  page = 1;
  totalCardInHTML = 0
};
 
function handleScroll() {
    // Отримуємо висоту сторінки
    const pageHeight = document.documentElement.scrollHeight;
    // Отримуємо висоту вікна перегляду
    const windowHeight = window.innerHeight;
    // Отримуємо поточну позицію прокрутки
    const scrollPosition = window.scrollY;

    if (scrollPosition + windowHeight >= pageHeight) {
        newFunction();
    }
}

function newFunction() {
  // console.log("hi");
  onPage()
  callRequest(inputValue.value)
}


