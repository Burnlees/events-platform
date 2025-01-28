## Summary

The **NextUp Events Platform** is a versatile web application designed to simplify the creation, management, and discovery of events. Whether you're planning an intimate gathering or organising a large-scale public event, this platform offers a suite of powerful tools to make the process seamless.

With an intuitive and user-friendly interface:

- **Staff members** can effortlessly create, manage, and delete events.
- **Users** can RSVP, purchase tickets, add events to their Google Calendar, and share them across social media platforms to maximise engagement.

By bridging event organisers and attendees, the **NextUp Events Platform** ensures a streamlined and engaging experience for all participants.

### Key Features:

- **Secure Access for Staff**: Staff-specific features are protected by secure access and restricted routes, ensuring only authorised users can create, edit, and delete events.
- **Event Search with Pagination and Sorting**: Easily browse events with pagination and sorting options for a seamless user experience.
- **Comprehensive Event Engagement**: Users can register for events, add them to their Google Calendar, share them on social media, and purchase tickets directly through the platform.
- **Google OAuth Integration**: Simplify the login process with Google OAuth, allowing users to log in quickly and securely.
- **Staff Event Management**: Staff members can efficiently manage events through an intuitive interface, enabling the creation, editing, and deletion of events with ease.
- **Responsive Design**: The platform is fully responsive, ensuring a seamless experience across devices, including desktops, tablets, and mobile phones.
- **Accessibility**: Designed with accessibility in mind, the platform adheres to WCAG standards to accommodate users of all abilities.

[🎥 Watch a Video Walkthrough of the Platform]() _(Coming soon...)_

---
## Live Hosted Version

https://events-platform-jade.vercel.app/

---

## Test Account Access

To explore the platform's features, use the following test credentials:

##### Staff Account
- **Username**: testaccount
- **Password**: NextUpTest123
##### Average User
- **Username**: averageuseraccount
- **Password**: NextUpTest123

*(Both the above accounts have associated google accounts, making the integration with Google Calendar possible. The application is currently in testing/development mode within the Google Developers console, due to it not having its own custom domain, if you'd like to access the app via your own Google account, please send me the associated Gmail address and I can add you to the test user pool.)*

---

## Running the Project Locally

Follow these steps to set up the project on your local machine:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v21.6.2+ recommended)
- **Bun** (preferred) – Install via [Bun's official documentation](https://bun.sh/)
- **npm** or **yarn** (optional if not using Bun)

### Setup Steps

1. **Clone the Repository**
    
    ```bash
    git clone https://github.com/Burnlees/events-platform.git  
    cd events-platform  
    ```
    
2. **Install Dependencies**
    
    It is recommended to use **Bun** for faster installations, but you may also use **npm** or **yarn**
    
    Using Bun:
    
    ```bash
    bun install  
    ```
    
    Using npm:
    
    ```bash
    npm install  
    ```
    
    Using Yarn:
    
    ```bash
    yarn install  
    ```
    
3. **Environment Variables**
    
    Create a `.env` file in the project root, then copy over the variables from the `.env.example` file and populate it with your own secrets and credentials.
    
1. **Database Setup**
    - Using Bun:  
    
        ```bash
        bun run db:push  
        ```
        
        ```bash
        bun run seed.ts  
        ```
        
    - Using npm:  
    
        ```bash
        npm run db:push  
        ```
        
        ```bash
        npm run seed.ts  
        ```
        
    - Using yarn:  
    
        ```bash
        yarn db:push  
        ```
        
        ```bash
        yarn seed.ts  
        ```
        
5. **Start the Development Server**
    
    Using Bun:
    
    ```bash
    bun run dev  
    ```
    
    Using npm:
    
    ```bash
    npm run dev  
    ```
    
    Using Yarn:
    
    ```bash
    yarn dev  
    ```
    
6. **Access the Application**
    
    Open your browser and go to [http://localhost:3000](http://localhost:3000/).
    