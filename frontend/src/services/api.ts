import axios from 'axios'

export const fetchMessages = async () => {
  const res = await axios.get('http://localhost:5000/api/messages')
  return res.data
}
