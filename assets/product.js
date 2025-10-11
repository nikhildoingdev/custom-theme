document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".shopify-product-form")
    .addEventListener("input", (evt) => {
      evt.preventDefault();
      const variants = JSON.parse(
        document.getElementById("product__variants-json").innerText
      );
      console.log(variants);
      const selectedVariantID = document.querySelector(
        ".product__variant-select"
      ).value;
      const selectedVariant = variants.find(
        (variant) => variant.id == selectedVariantID
      );

      // Update preview images
      const previewImagesGrid = document.querySelector(
        ".product-images-carousel"
      );
      previewImagesGrid.innerHTML = "";
      selectedVariant.images.forEach((image) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("preview-image-container");
        const img = document.createElement("img");
        img.src = image;

        wrapper.appendChild(img);
        previewImagesGrid.appendChild(wrapper);
      });

      // Update main image
      document.querySelector(".main-image-container img").src =
        selectedVariant.images[0];
      
      const price = document.querySelector(".product__price");

      // Update price
      if (price) {
       price.innerText = formatMoney(selectedVariant.price)
     }

      // Change add to cart button status
      const submitButton = document.querySelector(".product__submit-button");
      const addToCart = document.querySelector(".product__add-to-cart");

      if (selectedVariant.available) {
        submitButton.removeAttribute("disabled", "");

        addToCart.innerText = "ADD TO CART";
        submitButton.classList.remove('disabled');
        addToCart.classList.remove('disabled');
        document.querySelector(".product__price").style.display = "block";

      } else {
        submitButton.setAttribute("disabled", "");

        addToCart.innerText = "SOLD OUT";
        submitButton.classList.add('disabled');
        addToCart.classList.add('disabled');
        document.querySelector(".product__price").style.display = "none";
      }

      // Update url
      window.history.replaceState(
        {},
        "",
        `/products/${selectedVariant.product_handle}?variant=${selectedVariantID}`
      );
    });
});
