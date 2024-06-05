function addToCart(productId) {
    let cart = getCart();
    if (cart[productId]) {
        cart[productId] += 1;
    } else {
        cart[productId] = 1;
    }
    saveCart(cart);
    alert('상품이 장바구니에 추가되었습니다!');
}

function showCart() {
    let cart = getCart();
    let cartList = document.getElementById('cart');
    cartList.innerHTML = '';
    for (let productId in cart) {
        let quantity = cart[productId];
        let product = document.querySelector('#products li[data-id="' + productId + '"]');
        let productName = product.textContent;
        let price = product.textContent.match(/\d{4}/)[0]; // 가격 추출
        let cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${productName} (가격: ${price}원) x ${quantity}개 = ${price * quantity}원
            <button onclick="removeFromCart(${productId})">삭제</button>
        `;
        cartList.appendChild(cartItem);
    }
}

function getCart() {
    let cartString = localStorage.getItem('cart');
    if (cartString) {
        return JSON.parse(cartString);
    } else {
        return {};
    }
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    let cart = getCart();
    delete cart[productId];
    saveCart(cart);
    showCart();
}
