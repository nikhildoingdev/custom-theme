class ProductPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.handle = this.getAttribute("handle");
    this.formElement = this.querySelector("form");
    this.variantElement = this.querySelector(".product__variant-select");

    this.variants = JSON.parse(document.getElementById("product__variants-json").innerText);

    this.selectedVariant = this.variants.find(variant => variant.id == this.variantElement.value);

    this.formElement.addEventListener("input", this.updateVariantInfo.bind(this));
  }

  variantFromOptionValues() {
    const option1 = this.querySelector('input[name="option1"]:checked')
      ?.value || null;
    const option2 = this.querySelector('input[name="option2"]:checked')
      ?.value || null;
    

    return this.variants.find(variant => variant.option1 == option1 && variant.option2 == option2);
  }

  updateVariantInfo() {
    this.selectedVariant = this.variantFromOptionValues();

    // Update preview images
    const previewImagesGrid = this.querySelector(".product-images-carousel");
    previewImagesGrid.innerHTML = "";
    this.selectedVariant.images.forEach(image => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("preview-image-container");
      const img = document.createElement("img");
      img.src = image;

      wrapper.appendChild(img);
      previewImagesGrid.appendChild(wrapper);
    });

    // Update main image
    this.querySelector(".main-image-container img").src = this.selectedVariant.images[0];

    // Update element
    this.variantElement.value = this.selectedVariant.id;

    const price = document.querySelector(".product__price");
    // Update price
    if (price) {
      price.innerText = formatMoney(this.selectedVariant.price);
    }

    // Update button state
    const submitButton = this.querySelector(".product__submit-button");
    const addToCart = this.querySelector(".product__add-to-cart");

    if (this.selectedVariant.available) {
      submitButton.removeAttribute("disabled", "");

      addToCart.innerText = "ADD TO CART";
      submitButton.classList.remove("disabled");
      addToCart.classList.remove("disabled");
      this.querySelector(".product__price").style.display = "block";
    } else {
      submitButton.setAttribute("disabled", "");

      addToCart.innerText = "SOLD OUT";
      submitButton.classList.add("disabled");
      addToCart.classList.add("disabled");
      this.querySelector(".product__price").style.display = "none";
    }

    // Update history state
    window.history.replaceState({}, "", `/products/${this.handle}?variant=${this.selectedVariant.id}`);
  }
}

customElements.define("product-page", ProductPage);
