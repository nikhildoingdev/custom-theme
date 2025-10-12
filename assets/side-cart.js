class SideCart extends HTMLElement {
  constructor() {
    super();

    fetch(window.Shopify.routes.root + "cart.js").then(res => res.json()).then(data => console.log(data));
  }

  changeH1(message) {
    this.querySelector('h1').innerText = message;
  }
}

customElements.define("side-cart", SideCart);
