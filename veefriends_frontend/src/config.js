console.log('Environment variables:', process.env);
console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';
console.log('Final API_BASE:', API_BASE);

export default API_BASE;
