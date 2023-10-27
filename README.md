# Chatty React Web Application

Chatty React is a web application that allows users to have interactive conversations with a ChatGPT-powered chatbot. This project is built with React for the frontend and Node.js for the backend, and it communicates with the ChatGPT API to generate responses to user prompts.

## Features

- Real-time chat interface.
- Seamless integration with the ChatGPT API.
- User-friendly design.
- Chat History.
- Expandable for additional features.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Make sure you have Node.js installed on your system.
- ChatGPT API Key: You need an API key to access ChatGPT. You can obtain one from [OpenAI](https://beta.openai.com/signup/).

## Demo

You can see a live demo of Chatty app at https://chatty-teal-seven.vercel.app/
You can also access a live demo video at

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/abdullah-anzar/chatty.git
   cd chatty

   ```

2. Install the dependencies for both the frontend and backend:

   # Install frontend dependencies

   ````bash
   cd Backend
   npm install

   # Install backend dependencies
   ```bash
   cd ..
   cd Frontend
   npm install

   ````

3. Create a .env file with the following keys:
   | Key | Value |
   |----------|----------|
   | SERVER_PORT | An arbitrary port value on which the server should run, for eg: 3000 |
   | MONGODB | This project uses MongoDB store user information. Please place your MongoDB connection URL driver here. |
   | CHATGPT_API_KEY | The ChatGPT API key obtained from Open AI must be placed here. |
   | JWT_SECRET_KEY | This is used to generate a JWT Token for authentication. This can be anything but it is adviced to keep it short. For eg: JWT@123 |

4. Go back to the frontend and run the following command:

   ```bash
   npm run dev

    Your web app should start at a vite server URL after the above command. It will be printed in the console.
   ```

## Acknowledgments

I am grateful to OpenAI for providing us the amazing ChatGPT API.