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

      // Update price
      document.querySelector(".product__price").innerText = formatMoney(
        selectedVariant.price
      );

      // Change add to cart button status
      const addToCart = document.querySelector(".product__add-to-cart");
      if (selectedVariant.available) {
        addToCart.removeAttribute("disabled", "");

        addToCart.querySelector("span").innerText = "ADD TO CART";
        addToCart.querySelector("span").style.borderRadius = ".25rem 0 0 .25rem";
        addToCart.querySelector("span").style.background = "#000";
        addToCart.querySelector("span").style.color = "#fff";
        addToCart.querySelector("span").style.cursor = "pointer";
        addToCart.querySelector("span").style.pointerEvents = "default";
        document.querySelector(".product__price").style.display = "block";
      } else {
        addToCart.setAttribute("disabled", "");

        addToCart.querySelector("span").innerText = "SOLD OUT";
        addToCart.querySelector("span").style.borderRadius = ".25rem";
        addToCart.querySelector("span").style.background = "#fff";
        addToCart.querySelector("span").style.color = "#000";
        addToCart.querySelector("span").style.cursor = "not-allowed";
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
