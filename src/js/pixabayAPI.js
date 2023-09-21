import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_CEY = '39538903-b61d7980a82458644abd1a2e7';
const baseURL = 'https://pixabay.com/api/';

// axios.defaults.headers.common["x-api-key"] = API_CEY;

async function photoSearch(searchParam,perPage,page) {
    try {
   
    const response = await axios.get(`?key=${API_CEY}&q=${searchParam}
      &image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`);
        
    // if (response.status !== 200) {
    // throw new Error(response.statusText)
    //     };
        
    // console.log("resp",response);
        //     console.log(response.data);
        // Notiflix.Notify.success('Your photos');
        // console.log(response);
        return response.data;
        
  } catch (error) {
        console.log(error.message);
        
    }; 
};

export {photoSearch}