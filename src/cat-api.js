import axios from 'axios';
// MY_KEY = "live_ZKly88AXk1 HvdgjfHbJy6ghbyTJ0T3KvgWB8pTkRtUlVrsrikcNkip8eK9xwmVcL";
MY_KEY = "live_OTkuyK434vK48ClwOqQVxJn0ctUWbmCerq456VEfWSDnTPVVmzQyNHgkUGJIFoqW";
axios.defaults.headers.common['x-api-key'] = MY_KEY;

const instance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export function fetchBreeds() {
  return instance
    .get("/breeds")
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}

export function fetchCatByBreed(breedId) {
  return instance
    .get(`/images/search?breed_ids=${breedId}&api_key=${MY_KEY}`)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(err => {
      return err;
    });
}