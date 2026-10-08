let cart = JSON.parse(localStorage.getItem("hsolution_cart") || "[]");

function saveCart(){localStorage.setItem("hsolution_cart",JSON.stringify(cart));updateCount();}
function updateCount(){document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0);}
function addCart(name,price){
  const item=cart.find(i=>i.name===name);
  if(item)item.qty++; else cart.push({name,price,qty:1});
  saveCart(); alert("장바구니에 담았습니다.");
}
function buyNow(name,price){cart=[{name,price,qty:1}];saveCart();openOrder();}
function openCart(){renderCart();document.getElementById("cartModal").classList.add("show");}
function closeCart(){document.getElementById("cartModal").classList.remove("show");}
function renderCart(){
  const box=document.getElementById("cartItems");
  if(!cart.length){box.innerHTML='<div class="empty">장바구니가 비어 있습니다.</div>';document.getElementById("cartTotal").textContent="0원";return;}
  box.innerHTML=cart.map((i,n)=>`<div class="cart-row"><div><b>${i.name}</b><br><span>${money(i.price)}</span></div><div class="qty"><button onclick="changeQty(${n},-1)">−</button> ${i.qty} <button onclick="changeQty(${n},1)">+</button><br><button onclick="removeItem(${n})" style="margin-top:6px;border:0;background:none;color:#888">삭제</button></div></div>`).join("");
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0));
}
function changeQty(n,d){cart[n].qty+=d;if(cart[n].qty<=0)cart.splice(n,1);saveCart();renderCart();}
function removeItem(n){cart.splice(n,1);saveCart();renderCart();}
function money(n){return n.toLocaleString("ko-KR")+"원";}
function checkout(){if(!cart.length){alert("장바구니가 비어 있습니다.");return;}closeCart();openOrder();}
function openOrder(){
  document.getElementById("orderSummary").innerHTML=cart.map(i=>`<div class="cart-row"><span>${i.name} × ${i.qty}</span><b>${money(i.price*i.qty)}</b></div>`).join("")+`<div class="total"><span>총 주문금액</span><b>${money(cart.reduce((s,i)=>s+i.price*i.qty,0))}</b></div>`;
  document.getElementById("orderModal").classList.add("show");
}
function closeOrder(){document.getElementById("orderModal").classList.remove("show");}
function submitOrder(e){
  e.preventDefault();
  const name=document.getElementById("buyerName").value;
  const phone=document.getElementById("buyerPhone").value;
  const address=document.getElementById("buyerAddress").value;
  alert(`주문서가 작성되었습니다.\n\n주문자: ${name}\n연락처: ${phone}\n배송지: ${address}\n\n현재는 테스트 버전이라 실제 결제/주문 전송은 연결되지 않았습니다.`);
}
updateCount();
