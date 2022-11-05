class MovieItem extends HTMLElement {
  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="card h-100">
        <img
          src="${this._movie.Poster}"
          class="movie-poster rounded-top"
          alt="Poster: ${this._movie.Title}" 
        />
        <div class="card-body border-0 rounded-bottom ">
          <h5 class="card-title text-danger" title="${this._movie.Title}">${this._movie.Title.length > 25 ? this._movie.Title.slice(0, 25) + "...": this._movie.Title}</h5>
          <p class="card-subtitle text-danger" title="${this._movie.Year}">Release Year: ${this._movie.Year}</p>
          <a href="https://www.imdb.com/title/${this._movie.imdbID}/?ref_=nv_sr_srsg_0" class="btn btn-danger mt-3 text-white" target="_blank">Show Details</a>
        </div>
      </div>
    `;
  }
}

customElements.define("movie-item", MovieItem);
