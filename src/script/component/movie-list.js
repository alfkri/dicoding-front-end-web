import "./movie-item.js";

class MovieList extends HTMLElement {
  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  render() {
    this.innerHTML = "";

    this._movies.forEach((movie) => {
      const movieItemElement = document.createElement("movie-item");
      movieItemElement.setAttribute("class", "col-6 col-md-4 mb-4");
      movieItemElement.movie = movie;
      this.appendChild(movieItemElement);
    });
  }

  renderError(message) {
    this.innerHTML = `
      <div class="row">
        <div class="col-6">
          <h4 class="text-danger text-center">
            ${message}
          </h4>
        </div>
      </div>
    `;
  }
}

customElements.define("movie-list", MovieList);
