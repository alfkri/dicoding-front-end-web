class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="row d-flex justify-content-center">
        <div class="col-6 d-flex flex-column mt-3 mb-3">
          <a class="navbar-brand text-danger text-center fs-1" href="/"
            >muviKU
          </a>
          <p class="text-danger text-center fw-bold">Find Your Favorite Movie Here!</p>
        </div>
      </div>
    `;
  }
}

customElements.define("app-bar", AppBar);
