let globalAllPrice = 0;

function showCart() {
    let cart = getCart();
    let cartList = document.getElementById('cart');
    cartList.innerHTML = '';

    //전체 수량을 위해 변수선언
    let allQuantity = 0;
    let allPrice = 0;

    for (let productId in cart) {
        let quantity = cart[productId];
        let product = document.querySelector('#products li[data-id="' + productId + '"]');
        let productName = product.textContent;
        let price = product.textContent.match(/\d{4}/)[0]; // 정규표현식으로 가격 추출
        let cartItem = document.createElement('li');

        //수량 및 가격 더하기(전체가격, 수량)
        allQuantity += quantity
        allPrice += (price*quantity);

        cartItem.innerHTML = `
            <div class="cartLeft">
                <div class="cartImg">
                    <img src="./img/coffeeimg/${productId}.jpg">
                </div>
                <div class="cartTxt">
                    <p class="name">${productName}</p>
                    <p class="quant">수량 : ${quantity}개</p>
                </div>
            </div>
            <div class="cartRight">
                <div class="price">${price*quantity} 원</div>
                <button onclick="removeFromCart(${productId})">DELETE</button>
            </div>
        `;
        cartList.appendChild(cartItem);
    }

    //html 전체수량 반영하기
    let totalQ = document.getElementById('num')
    let totalP = document.getElementById('price')
    totalQ.textContent = `총 구매 상품 : ${allQuantity}개`
    totalP.textContent = `${allPrice} 원`
    //전체가격을 다른 함수에서 쓰기 위해 글로벌 변수에 합산가격을 더해주었음.
    globalAllPrice = allPrice;
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


function clearCart() {
    localStorage.removeItem('cart');
    showCart();
    //초기화 버튼을 누르면 가격도 초기화
    globalAllPrice = 0;
  }

function payment() {
    let money = prompt("결제 금액을 입력해 주세요.")
    let intmoney = parseInt(money)
    if (intmoney >= globalAllPrice) {
        clearCart()
        confirm("결제가 완료되었습니다.")
        location.replace("./complete.html")
    } else {
        alert("잔액이 부족하거나 잘 못 입력하였습니다. 숫자만 입력해 주세요.")
    }
}