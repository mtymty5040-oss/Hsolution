let cart = JSON.parse(localStorage.getItem("hsolutionCart") || "[]");

function saveCart(){
  localStorage.setItem("hsolutionCart", JSON.stringify(cart));
  renderCart();
}

function addCart(name, price){
  const item = cart.find(x => x.name === name);
  if(item) item.qty++;
  else cart.push({name, price, qty:1});
  saveCart();
  showToast(name + "을(를) 장바구니에 담았습니다.");
}

function changeQty(index, amount){
  cart[index].qty += amount;
  if(cart[index].qty <= 0) cart.splice(index,1);
  saveCart();
}

function renderCart(){
  const count = cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartCount").textContent = count;

  const box = document.getElementById("cartItems");

  if(!cart.length){
    box.innerHTML = '<p style="color:#888">장바구니가 비어 있습니다.</p>';
  }else{
    box.innerHTML = cart.map((x,i)=>`
      <div class="cart-item">
        <strong>${x.name}</strong>
        <div>${(x.price*x.qty).toLocaleString()}원</div>
        <div class="qty">
          <button onclick="changeQty(${i},-1)">−</button>
          <span>${x.qty}</span>
          <button onclick="changeQty(${i},1)">+</button>
        </div>
      </div>
    `).join("");
  }

  const total = cart.reduce((s,x)=>s+x.price*x.qty,0);
  document.getElementById("cartTotal").textContent =
    total.toLocaleString()+"원";
}

function toggleCart(){
  document.getElementById("cartPanel").classList.toggle("open");
}

function showToast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;
  t.style.display="block";
  setTimeout(()=>t.style.display="none",1800);
}

function submitOrder(e){
  e.preventDefault();

  if(!cart.length){
    showToast("먼저 상품을 장바구니에 담아주세요.");
    return;
  }

  const items=cart.map(x=>`${x.name} ${x.qty}개`).join(", ");

  alert(
    "주문 확인\n\n" +
    "상품: " + items +
    "\n\n※ 현재는 테스트용 주문 화면입니다. " +
    "실제 주문 전송/결제 기능은 아직 연결되지 않았습니다."
  );
}

renderCart();
