const order = [];
let transactionCounter = 0;
let completedTransaction = null;
const productGrid = document.querySelector("#product-grid");
const itemCount = document.querySelector("#item-count");
const orderSummary = document.querySelector("#order-summary");
const orderTotal = document.querySelector("#order-total");
const cartItems = document.querySelector("#cart-items");
const continueSummaryButton = document.querySelector("#continue-summary-button");
const selectionScreen = document.querySelector("#selection-screen");
const summaryScreen = document.querySelector("#summary-screen");
const summaryItems = document.querySelector("#summary-items");
const summaryTotal = document.querySelector("#summary-total");
const backButton = document.querySelector("#back-button");
const orderBar = document.querySelector(".order-bar");
const paymentButton = document.querySelector("#payment-button");
const paymentScreen = document.querySelector("#payment-screen");
const paymentBackButton = document.querySelector("#payment-back-button");
const paymentOptions = document.querySelector("#payment-options");
const paymentTotal = document.querySelector("#payment-total");
const paymentPanels = document.querySelectorAll(".payment-detail");
const cashTotal = document.querySelector("#cash-total");
const qrTotal = document.querySelector("#qr-total");
const cardTotal = document.querySelector("#card-total");
const amountPaid = document.querySelector("#amount-paid");
const cashMessage = document.querySelector("#cash-message");
const cashPayButton = document.querySelector("#cash-pay-button");
const qrConfirmButton = document.querySelector("#qr-confirm-button");
const cardProcessButton = document.querySelector("#card-process-button");
const paymentSuccess = document.querySelector("#payment-success");
const confirmationTotal = document.querySelector("#confirmation-total");
const confirmationPaid = document.querySelector("#confirmation-paid");
const confirmationMethod = document.querySelector("#confirmation-method");
const confirmationNumber = document.querySelector("#confirmation-number");
const viewReceiptButton = document.querySelector("#view-receipt-button");
const receiptScreen = document.querySelector("#receipt-screen");
const receiptDate = document.querySelector("#receipt-date");
const receiptNumber = document.querySelector("#receipt-number");
const receiptItems = document.querySelector("#receipt-items");
const receiptTotal = document.querySelector("#receipt-total");
const receiptMethod = document.querySelector("#receipt-method");
const receiptPaid = document.querySelector("#receipt-paid");
const receiptChange = document.querySelector("#receipt-change");
const newTransactionButton = document.querySelector("#new-transaction-button");

const formatPrice = (price) => `₱${price.toFixed(2)}`;

productGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");

  if (!card) return;

  const existingItem = order.find((item) => item.name === card.dataset.product);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    order.push({
      name: card.dataset.product,
      price: Number(card.dataset.price),
      quantity: 1,
    });
  }

  renderOrder();
});

cartItems.addEventListener("click", (event) => {
  const actionButton = event.target.closest("button[data-action]");

  if (!actionButton) return;

  const item = order.find((orderItem) => orderItem.name === actionButton.dataset.product);
  if (!item) return;

  if (actionButton.dataset.action === "increase") item.quantity += 1;
  if (actionButton.dataset.action === "decrease") item.quantity -= 1;
  if (actionButton.dataset.action === "remove" || item.quantity <= 0) {
    order.splice(order.indexOf(item), 1);
  }

  renderOrder();
});

function getOrderTotal() {
  return order.reduce((total, item) => total + item.price * item.quantity, 0);
}

function renderOrder() {
  const count = order.reduce((total, item) => total + item.quantity, 0);
  const total = getOrderTotal();
  itemCount.textContent = count;
  orderSummary.textContent = count ? `${count} item${count === 1 ? "" : "s"} selected` : "No items selected";
  orderTotal.textContent = formatPrice(total);
  continueSummaryButton.disabled = count === 0;

  cartItems.innerHTML = order.length
    ? order.map((item) => `
      <article class="cart-item">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <span>${formatPrice(item.price)} each · Subtotal ${formatPrice(item.price * item.quantity)}</span>
        </div>
        <div class="quantity-controls" aria-label="${item.name} quantity controls">
          <button type="button" data-action="decrease" data-product="${item.name}" aria-label="Decrease ${item.name} quantity">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-action="increase" data-product="${item.name}" aria-label="Increase ${item.name} quantity">+</button>
          <button class="remove-button" type="button" data-action="remove" data-product="${item.name}">Remove</button>
        </div>
      </article>`).join("")
    : '<p class="empty-cart">Your selected items will appear here.</p>';
}

continueSummaryButton.addEventListener("click", () => {
  renderSummary();
  selectionScreen.classList.add("is-hidden");
  summaryScreen.classList.remove("is-hidden");
  orderBar.classList.add("is-hidden");
  window.scrollTo(0, 0);
});

backButton.addEventListener("click", () => {
  summaryScreen.classList.add("is-hidden");
  selectionScreen.classList.remove("is-hidden");
  orderBar.classList.remove("is-hidden");
  window.scrollTo(0, 0);
});

paymentButton.addEventListener("click", () => {
  renderPaymentTotals();
  summaryScreen.classList.add("is-hidden");
  paymentScreen.classList.remove("is-hidden");
  window.scrollTo(0, 0);
});

paymentBackButton.addEventListener("click", () => {
  paymentScreen.classList.add("is-hidden");
  summaryScreen.classList.remove("is-hidden");
  window.scrollTo(0, 0);
});

paymentOptions.addEventListener("click", (event) => {
  const option = event.target.closest("[data-method]");
  if (!option) return;

  paymentPanels.forEach((panel) => panel.classList.add("is-hidden"));
  paymentSuccess.classList.add("is-hidden");
  cashMessage.textContent = "";
  amountPaid.value = "";
  document.querySelector(`#${option.dataset.method}-panel`).classList.remove("is-hidden");
});

cashPayButton.addEventListener("click", () => {
  const paid = Number(amountPaid.value);
  const total = getOrderTotal();

  if (amountPaid.validity.badInput) {
    cashMessage.textContent = "Enter a valid numeric payment amount.";
    return;
  }
  if (amountPaid.value.trim() === "") {
    cashMessage.textContent = "Enter the amount received to continue.";
    return;
  }
  if (!Number.isFinite(paid) || paid < 0) {
    cashMessage.textContent = "Enter a valid payment amount of zero or more.";
    return;
  }
  if (paid < total) {
    cashMessage.textContent = `Insufficient payment. Please provide at least ${formatPrice(total)}.`;
    return;
  }

  showPaymentSuccess("Cash", paid - total, paid);
});

qrConfirmButton.addEventListener("click", () => showPaymentSuccess("QR payment", 0));

cardProcessButton.addEventListener("click", () => {
  cardProcessButton.textContent = "Processing…";
  cardProcessButton.disabled = true;
  window.setTimeout(() => {
    cardProcessButton.textContent = "Process Payment";
    cardProcessButton.disabled = false;
    showPaymentSuccess("Card payment", 0);
  }, 700);
});

viewReceiptButton.addEventListener("click", () => {
  renderReceipt();
  paymentScreen.classList.add("is-hidden");
  receiptScreen.classList.remove("is-hidden");
  window.scrollTo(0, 0);
});

newTransactionButton.addEventListener("click", () => {
  order.splice(0, order.length);
  completedTransaction = null;
  renderOrder();
  resetPaymentAndReceipt();
  receiptScreen.classList.add("is-hidden");
  selectionScreen.classList.remove("is-hidden");
  orderBar.classList.remove("is-hidden");
  window.scrollTo(0, 0);
});

function renderSummary() {
  summaryItems.innerHTML = order.map((item) => `
    <div class="summary-row">
      <strong>${item.name}</strong>
      <span>${item.quantity}</span>
      <span>${formatPrice(item.price)}</span>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </div>`).join("");
  summaryTotal.textContent = formatPrice(getOrderTotal());
}

function renderPaymentTotals() {
  const total = formatPrice(getOrderTotal());
  paymentTotal.textContent = total;
  cashTotal.textContent = total;
  qrTotal.textContent = total;
  cardTotal.textContent = total;
}

function showPaymentSuccess(method, change, paid = getOrderTotal()) {
  transactionCounter += 1;
  completedTransaction = {
    number: `TXN-${String(transactionCounter).padStart(3, "0")}`,
    date: new Date(),
    items: order.map((item) => ({ ...item })),
    total: getOrderTotal(),
    method,
    paid,
    change,
  };
  paymentPanels.forEach((panel) => panel.classList.add("is-hidden"));
  paymentSuccess.classList.remove("is-hidden");
  confirmationTotal.textContent = formatPrice(completedTransaction.total);
  confirmationPaid.textContent = formatPrice(paid);
  confirmationMethod.textContent = method;
  confirmationNumber.textContent = completedTransaction.number;
}

function renderReceipt() {
  if (!completedTransaction) return;

  receiptDate.textContent = completedTransaction.date.toLocaleString();
  receiptNumber.textContent = completedTransaction.number;
  receiptItems.innerHTML = completedTransaction.items.map((item) => `
    <div class="receipt-item">
      <div><strong>${item.name}</strong><span>Qty ${item.quantity} × ${formatPrice(item.price)}</span></div>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </div>`).join("");
  receiptTotal.textContent = formatPrice(completedTransaction.total);
  receiptMethod.textContent = completedTransaction.method;
  receiptPaid.textContent = formatPrice(completedTransaction.paid);
  receiptChange.textContent = formatPrice(completedTransaction.change);
}

function resetPaymentAndReceipt() {
  amountPaid.value = "";
  cashMessage.textContent = "";
  cardProcessButton.textContent = "Process Payment";
  cardProcessButton.disabled = false;
  paymentSuccess.classList.add("is-hidden");
  paymentPanels.forEach((panel) => panel.classList.add("is-hidden"));
  confirmationTotal.textContent = formatPrice(0);
  confirmationPaid.textContent = formatPrice(0);
  confirmationMethod.textContent = "—";
  confirmationNumber.textContent = "—";
  receiptDate.textContent = "";
  receiptNumber.textContent = "";
  receiptItems.innerHTML = "";
  receiptTotal.textContent = formatPrice(0);
  receiptMethod.textContent = "—";
  receiptPaid.textContent = formatPrice(0);
  receiptChange.textContent = formatPrice(0);
}
