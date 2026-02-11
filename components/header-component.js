class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 py-4">
        <div class="w-full max-w-screen-lg mx-auto px-6 flex justify-between items-center">
          <!-- Your navigation HTML here -->
        </div>
      </nav>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
