import axios from 'axios';

const API_KEY = 'dj0yJmk9YXFiSENqNkVmaU1EJmQ9WVdrOVJFVTVhMGxOVG1zbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWE0';

export const getSilverPrice =() => {
  return axios.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=XAG%3DX`, {
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'useQueryString': true
    }
  })
    .then((response:any) => {
      console.log('Data:', response.data.quoteResponse.result[0].regularMarketPrice);
      return response.data.quoteResponse.result[0].regularMarketPrice;
    })
    .catch((error:any) => {
      console.log(error);
    });
}
