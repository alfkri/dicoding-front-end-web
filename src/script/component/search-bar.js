class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.querySelector("#searchElement").value;
  }

  render() {
    this.innerHTML = `
      <div class="row mt-2">
        <div class="col-md-auto my-auto mx-auto">
          <div
            id="search-container"
            class="search-container d-flex justify-content-center"
          >
            <input
              class="searchElement rounded-start border-1 border-danger p-2 shadow"
              placeholder="Search: (ex. marvel)"
              id="searchElement"
              type="search"
            />
            <button
              class="search-btn rounded-end border-0 shadow"
              id="searchButtonElement"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    `;

    this.querySelector("#searchButtonElement").addEventListener(
      "click",
      this._clickEvent
    );
  }
}

customElements.define("search-bar", SearchBar);
