import axios from 'axios';

// API base URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for offline scenarios
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNFAILED' || error.code === 'ERR_NETWORK') {
      // Handle offline scenario per manifesto: "Offline-Ready"
      console.warn('Network error - operating in offline mode');
      // Could queue requests for later sync here
    }
    
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Auth & Fayda
  auth: {
    login: '/auth/login',
    faydaInitiate: '/auth/fayda/initiate',
    faydaCallback: '/auth/fayda/callback',
    logout: '/auth/logout',
  },
  // Business & Inventory
  business: '/business',
  products: '/products',
  stockHistory: '/stock-history',
  // Transactions
  sales: '/sales',
  supplies: '/supplies',
  wasteLogs: '/waste-logs',
  // Audit & Intelligence
  audits: '/audits',
  auditLogs: '/audit-logs',
  // OCR & Image Processing
  ocr: '/ocr/process',
  fuzzyMatch: '/ocr/fuzzy-match',
};

// Type-safe API calls
export const apiCalls = {
  // Products
  getProducts: (businessId: string) => 
    api.get(`${endpoints.products}?businessId=${businessId}`),
  
  createProduct: (data: any) => 
    api.post(endpoints.products, data),
  
  // Sales
  getSales: (businessId: string, startDate?: Date, endDate?: Date) => 
    api.get(endpoints.sales, { params: { businessId, startDate, endDate } }),
  
  createSale: (data: any) => 
    api.post(endpoints.sales, data),
  
  // Audits
  getAudits: (businessId: string) => 
    api.get(`${endpoints.audits}?businessId=${businessId}`),
  
  createAudit: (data: any) => 
    api.post(endpoints.audits, data),
  
  // OCR Processing
  processImage: (formData: FormData) => 
    api.post(endpoints.ocr, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  // Fayda Authentication
  initiateFaydaAuth: () => 
    api.get(endpoints.auth.faydaInitiate),
};

export default api;
