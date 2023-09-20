

import Notiflix from 'notiflix';
import InfiniteScroll from 'infinite-scroll';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import { photoSearch,API_CEY,baseURL } from "./js/axios.get";
import markupCreation from "./js/apiCreate";

const form = document.getElementById('search-form');
const inputValue = form.querySelector('input[name="searchQuery"]');
const btmForm = form.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
const target= document.querySelector('.js-guard')


// console.log(pastNameInp);
const perPage = 40;
let page = 1;
let totalCardInHTML = 0;


btmForm.addEventListener('click', onClick);

function onClick(evt) {
    evt.preventDefault();
    
    const searchParam = inputValue.value.trim();
    if (!searchParam) {
       return
   }

    // clearGallery()
    clearingPage();
    callRequest(searchParam);
    return searchParam
    // inputValue.value = '';
    // photoSearch(searchParam, perPage, page);
    
};


async function callRequest(param) {
    // photoSearch(param, perPage, page); 
    try {
        const resp = await photoSearch(param, perPage, page);
        console.log("rrrrr", resp);
        
        // console.log(param); 
        if (!resp.hits.length) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return
        };

        if (resp.total === 0) {
            Notiflix.Notify.failure('Please write correct data!');
            return;
        }

         totalCardInHTML += resp.hits.length;
        let totalCard = resp.total;
        if (totalCardInHTML > totalCard || resp.total < 40) {
            Notiflix.Notify.info('There are no images on this topic!');
        }
        
        gallery.insertAdjacentHTML("beforeend", markupCreation(resp.hits));
        observer.observe(target);
        if (totalCard > 40) {
           const { height: cardHeight } = document
        // .querySelector(".gallery")
        gallery.firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });         };

        const lightbox = new SimpleLightbox('.gallery a', { animationSpeed: 300 });
        
        

    } catch (error) {
        console.log(error);
       
    }; 
    // console.log(response.hits);
}

// let infScroll = new InfiniteScroll(gallery, {
//  // options
//     path: function () {
//         return
//   },
//   append: '.post',
//   history: false,
// });

let options = {
  root: null,
  rootMargin: "300px",
  threshold: 1.0,
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry);
        page += 1;
        
      callRequest(inputValue.value); 
    }
  });
}, options);

function clearingPage() {
    gallery.innerHTML = "";
    page = 1;
}
 


