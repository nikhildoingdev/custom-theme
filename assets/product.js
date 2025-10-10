document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".shopify-product-form")
    .addEventListener("input", (evt) => {
      evt.preventDefault()
      const variants = JSON.parse(document.getElementById('product__variants-json').innerText);
      console.log(variants)
      const selectedVariantID = document.querySelector('.product__variant-select').value;
      const selectedVariant = variants.find(variant => variant.id == selectedVariantID);

      // Update preview images
      const previewImagesGrid = document.querySelector('.product-images-carousel');
      selectedVariant.images.forEach(image => {
        console.log(image);
      });

      // Update price
      document.querySelector('.product__price').innerText = formatMoney(selectedVariant.price);
      document.querySelector('.main-image-container img').src = selectedVariant.featured_image.src;

      const addToCart = document.querySelector('.product__add-to-cart');
      if (selectedVariant.available) {
        
      } else {
        addToCart.setAttribute('disabled', '');

        addToCart.querySelector('span').innerText = "SOLD OUT";
        addToCart.querySelector('span').style.borderRadius = ".25rem";
        addToCart.querySelector('span').style.background = "#fff";
        addToCart.querySelector('span').style.color = "#000";
        addToCart.querySelector('span').style.cursor = "not-allowed";

        document.querySelector('.product__price').style.display = 'none';
      }

      const productHandle = document.querySelector('.product__variant-select').getAttribute('data-product-handle')
      window.history.replaceState({},'', `/products/${productHandle}?variant=${selectedVariantID}`)
      
      console.log(formatMoney(100000000, 'INR', 'en-IN'))
    });
});
