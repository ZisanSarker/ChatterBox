// ========== api.ts ==========
import axios from 'axios'

// Base API configuration
const API_BASE_URL = 'http://localhost:5000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Message interface matching backend
export interface Message {
  username: string
  text: string
  createdAt: string
}

// API functions
export const fetchMessages = async (): Promise<Message[]> => {
  try {
    const response = await apiClient.get<Message[]>('/api/messages')
    return response.data
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    // Return empty array as fallback
    return []
  }
}

export const sendMessage = async (message: { username: string; text: string }): Promise<void> => {
  try {
    await apiClient.post('/api/messages', message)
  } catch (error) {
    console.error('Failed to send message:', error)
    throw error
  }
}

export default apiClient