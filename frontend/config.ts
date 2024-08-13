import * as dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Access the environment variables
const API_URL = process.env.API_BASE_URL
const SESSION_PASSWORD = process.env.SESSION_PASSWORD

export { API_URL, SESSION_PASSWORD }
