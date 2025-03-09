![logo](https://github.com/user-attachments/assets/35ae7237-a1f6-4f48-98f3-9fa0ee6949cc)

# Node.js Dictionary Service

## Introduction
This project is a core part of the **Modern Dictionary** system, developed using **Node.js** and **Express.js**. It provides a high-performance WebSocket service for real-time communication with users and manages user presence effectively. This microservice is optimized for speed and scalability, ensuring seamless integration with other modules of the ecosystem.

## Features
- Real-time communication using WebSockets
- User presence tracking via Redis (detects online/offline users)
- Fast response times using Redis caching
- Future updates: Team chat functionality and additional real-time features

## Technologies Used
- **Backend:** Node.js (Express.js)
- **WebSockets:** Socket.io
- **Caching & Presence Management:** Redis

## Installation & Setup
### Prerequisites
Ensure you have the following installed on your system:
- Node.js (LTS version recommended)
- npm or yarn
- Redis (required for real-time presence tracking)

### Setup Instructions
```bash
# Clone the repository
git clone https://github.com/your-repo.git
cd your-repo

# Install dependencies
npm install

# Copy environment variables
touch .env
# Add required environment variables in .env file

# Start the application
node server.js
```

## WebSocket Documentation
For WebSocket integration, refer to (also you should change the route of [vue js sockets](https://github.com/modern-dictionary/main):
```
http://localhost:3000/
```
For the complete system documentation, visit:
```
https://docs.modern-dictionary.com
```

## Deployment
To deploy the service in production:
```bash
npm run build
npm run start:prod
```

## Contributing
We welcome contributions! If you'd like to contribute, please check our contribution guidelines in the main documentation.

## License
This project is licensed under the MIT License.

