import axios from 'axios';

const KEY = '30240578-43afdca340dbb2f4dbb691dc2';
const URL = 'https://pixabay.com/api/';

async function fetchImages(name, page) {
  return await axios(
    `${URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}

const api = {
  fetchImages,
};
export default api;
