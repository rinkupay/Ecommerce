const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cookieParser = require("cookie-parser")
const cloudinary = require("cloudinary")


app.use(cookieParser());



// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


//Config 
dotenv.config({ path: "backend/config/config.env" });

// Connecting to database
connectDatabase();

// Cloudinary connection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Unhandled Promise Rejection`);

//   server.close(() => {
//     process.exit(1);
//   });
// });

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the error or log it appropriately
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
    process.exit(1);
  });
});
