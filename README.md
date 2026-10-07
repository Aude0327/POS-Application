# POS Application

A browser-based self-service Point of Sale (POS) application designed for touchscreen, tablet, desktop, and mobile use. It supports ordering, payment, receipts, discounts, tax, reports, and customer feedback.

## Features

- Product selection with large, touch-friendly product cards
- Shopping cart for the current order
- Quantity increase, decrease, and remove controls
- Automatic item subtotal and order-total calculation
- Order Summary view before payment
- Cash payment with blank, invalid, negative, and insufficient-payment validation
- Automatic cash change calculation, including exact payment with `0.00` change
- Simulated QR payment flow
- Simulated credit/debit card payment flow
- Payment-success confirmation with a unique transaction reference number
- Digital receipt generation with items, quantities, pricing, payment details, and status
- New Transaction control that clears the active order and payment/receipt state
- Responsive touchscreen-oriented layout for desktop and mobile screens

## Branch Features

### Branch 1 — Product Search and Categories

- Product categories: **All Items**, **Drinks**, **Food**, and **Snacks**
- Category filtering to narrow the visible product cards
- Product-name search box for quickly finding an item
- Empty-state message when no products match the selected category or search term
- Filtered products can still be added to the cart and managed normally

### Branch 2 — Discounts and VAT

- Discount selector with **No Discount (0%)**, **Student Discount (10%)**, and **Senior Citizen / PWD Discount (20%)**
- Automatic discount-amount calculation based on the order subtotal
- Configured **12% VAT** calculation after the selected discount
- Clear display of subtotal, discount percentage and amount, VAT, and final total
- Payment screens, payment validation, change calculations, successful-payment details, and receipts use the final total

### Branch 3 — Order History and Sales Report

- Completed transactions saved in browser Local Storage
- Order History screen for viewing saved transactions
- Transaction number, date and time, purchased items and quantities, payment method, and final total for each order
- Daily Sales Report with transaction count and overall sales total
- Sales totals grouped by cash, QR payment, and card payment
- Clear History option with a confirmation prompt before saved transaction data is removed

### Branch 4 — User Feedback and Ratings

- Customer experience ratings from one to five stars
- Optional written feedback with a 300-character limit and visible remaining-character count
- Rating-required validation and a thank-you confirmation after submission
- Feedback entries saved in browser Local Storage
- Feedback History showing the rating, comment, transaction number when available, and submitted date/time
- Feedback Summary with total submissions, average rating, and counts for each one-to-five-star rating
- Clear Feedback option with a confirmation prompt before permanently removing saved feedback

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/akosigalos/POS-Application.git
   ```

2. Open the `POS-Application` project folder.
3. Open `index.html` in a modern web browser.

No installation or build step is required because this project uses only HTML, CSS, and Vanilla JavaScript.

## How to Use the System

1. Choose products from the Item Selection screen.
2. Adjust item quantities in the cart using the large plus, minus, and remove controls.
3. Use product categories or product-name search when those controls are available.
4. Continue to the Order Summary and review the order details.
5. Select a discount when available; subtotal, discount, VAT, and final total update immediately.
6. Choose Cash, QR Payment, or Credit/Debit Card as the payment method.
7. Complete payment. Cash payments must meet or exceed the final total; QR and card payments are simulated.
8. View the successful-payment details and the digital receipt.
9. Use Order History and the Daily Sales Report to review saved completed transactions when those features are available.
10. Use the Feedback section to submit, review, or clear customer feedback when available.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage

## Project Structure

```text
POS-Application/
├── index.html
├── styles.css
├── script.js
└── README.md
```
