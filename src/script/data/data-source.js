const api_key = "4824288e";

class DataSource {
  static searchMovie(keyword) {
    return fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${keyword}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.Search) {
          return Promise.resolve(responseJson.Search);
        } else {
          return Promise.reject(`Sorry <strong>"${keyword}"</strong> is not found`);
        }
      });
  }
}

export default DataSource;
