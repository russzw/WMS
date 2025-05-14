# WMS - Waste Management System ♻️

A full-stack, cloud-integrated dashboard that visualizes and monitors waste levels in smart bins using Adafruit IO and Recharts. Developed as a capstone project to demonstrate skills in IoT, cloud computing, and modern web development.

## 🚀 Features

- 📊 Real-time visualization of sensor data from smart bins
- ☁️ Integration with Adafruit IO for IoT data streaming
- 📉 Interactive Recharts graphs for tracking waste levels
- 🌐 MongoDB Atlas for cloud-based data persistence
- 🧠 Built using Next.js 14 with Server Actions and dynamic imports
- 🔐 Secure API route handling
- 🖥️ Responsive and accessible UI
- 🗂️ Modular architecture for scalability and maintenance

## 🛠️ Tech Stack

- **Frontend:** React (via Next.js 14), Tailwind CSS
- **Backend:** Next.js API Routes, Server Actions
- **Database:** MongoDB Atlas (Cloud MongoDB)
- **IoT Platform:** Adafruit IO
- **Visualization:** Recharts
- **Deployment:** Vercel / Node.js environment

## 📂 Project Structure

WMS/
├── app/ # Next.js 14 App directory (Routing, Server Components)
├── components/ # Reusable UI components
├── lib/ # Utility and helper functions
├── pages/ # API routes
├── public/ # Static assets (e.g., placeholder CSV)
├── styles/ # Global styles
├── .gitignore # Ignored files (e.g., large CSV)
├── README.md # You're here!

## 🧪 Getting Started

### 1. Clone the Repository

git clone https://github.com/russzw/WMS.git
cd WMS

## 2. Install Dependencies
npm install

## 3. Environment Variables
Create a .env.local file with your Adafruit IO credentials:

ADAFRUIT_IO_KEY=your_adafruit_io_key
ADAFRUIT_IO_USERNAME=your_username

## 4. Run the Development Server

npm run dev
Open http://localhost:3000 to view in your browser.

📡 Adafruit IO Setup
Sign up or log into Adafruit IO.

Create feeds for bin1, bin2, etc.

Send sample data using MQTT, HTTP, or dashboards.

📊 Graphs and Visuals
This project uses Recharts to render:

Real-time line charts

Bar charts for daily averages

Status indicators for waste thresholds

⚠️ Notes
A large CSV file in the public/ directory is ignored via .gitignore for performance reasons.

Ensure your Adafruit IO feed data matches the naming conventions used in the code (bin1, bin2, etc).

✅ To Do
 Add user authentication

 Add notifications when bin is full

 Export data for city analytics

🤝 Contributing
Feel free to fork the repo, create a branch, and submit pull requests.

📝 License
This project is licensed under the MIT License.

Capstone project submitted for Cloud Computing and IoT degree at UZ.
