# Laplace Explorer

Welcome to Laplace Explorer, an educational application for exploring, sharing, and solving problems related to the Laplace Transform. This app is built entirely on the Manifest backend platform, with a React frontend using the Manifest SDK.

## Features

- **User Authentication**: Sign up and log in as a student or instructor.
- **Transform Pair Library**: Browse a community-curated list of Laplace Transform pairs.
- **Contribute**: Logged-in users can add new transform pairs to the library.
- **Example Problems**: Study from a collection of example problems with step-by-step solutions, categorized by difficulty.
- **Admin Panel**: A complete backend interface for managing users, pairs, problems, and application data.

## Getting Started

### Prerequisites

- Node.js and npm
- A Manifest account and a deployed backend for this application.

### Setup

1.  **Clone the repository**

    ```bash
    git clone <repository_url>
    cd laplace-explorer
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**

    Create a `.env.local` file in the root of your project and add the following variables provided by your Manifest backend deployment:

    ```
    VITE_APP_ID=your_manifest_app_id
    VITE_BACKEND_URL=your_manifest_backend_url
    ```

4.  **Run the application**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Admin Access

-   Access the admin panel at `<your_manifest_backend_url>/admin`.
-   Default credentials: `admin@manifest.build` / `admin`
