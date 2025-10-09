document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".shopify-product-form")
    .addEventListener("input", (evt) => {
      const variants = JSON.parse(document.getElementById('product__variants-json').innerText);
      console.log(variants)
      const selectedVariantID = document.querySelector('.product__variant-select').value;
      const selectedVariant = variants.find(variant => variant.id == selectedVariantID);

      // Update price
        document.querySelector('.product__price').innerText = formatMoney(selectedVariant.price, 'USD', 'en-US');
      document.querySelector('.main-image-container img').src = selectedVariant.featured_image.src;
    });
});
