# Mural Pay Coding Challenge

## 🚀 Overview

This is a single-page application (SPA) built using **React** and **TypeScript** that interacts with the **Mural Pay API Sandbox Environment**. The application allows users to:

1. **Create an account** (Customer & Account Creation).
2. **Initiate a transfer request** (Transfer Request Creation).
3. **Execute the transfer request** (Transfer Request Execution).

## 📌 Features

- ✅ **Customer & Account Creation**: Allows users to sign up and view account details such as balance, wallet address, and virtual bank account information.
- ✅ **Transfer Request Creation**: Users can create transfer requests by specifying an amount and recipient bank details.
- ✅ **Transfer Execution**: Pending transfer requests can be executed, and completed transactions are displayed in the UI.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **State Management:** React Context API
- **API Client:** Axios
- **Testing:** Vitest & React Testing Library

## 🚀 Submitted

The application is deployed in this url: https://mural-pay-challenge.vercel.app/

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/davidegd/mural-pay-challenge.git
cd mural-pay-challenge
```

### 2️⃣ Install Dependencies

```sh
pnpm install  # or npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```sh
VITE_API_URL=https://api-staging.muralpay.com
VITE_API_KEY=your_api_key_here
```

_Note: For Sandbox access, request credentials at boyce@muralpay.com._

### 4️⃣ Start the Development Server

```sh
npm run dev  # or pnpm run dev
```

## 🔄 API Integration

This project interacts with Mural Pay's API for:

- **Customer Creation** (`POST /customers`)
- **Account Retrieval** (`GET /accounts/{customerId}`)
- **Transfer Requests** (`POST /transfers`)
- **Transfer Execution** (`POST /transfers/{transferId}/execute`)

🔗 **API Docs** (Password: `powerfulpayments`): [Mural Pay API Docs](https://developers.muralpay.com/docs/getting-started)

## 🧪 Running Tests

To run the unit and integration tests:

```sh
npm run test  # or pnpm run test
```

## 🚀 Deployment

To build and deploy the project:

```sh
npm run build  # or pnpm run build
```

---
