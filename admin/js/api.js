/**
 * Axios-based API helper with automatic auth header
 */
const api = {
  async request(method, endpoint, data = null, isFormData = false) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {};

    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const config = {
      method,
      url,
      headers
    };

    if (data) {
      config.data = isFormData ? data : JSON.stringify(data);
    }

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Token expired or unauthorized
        if (error.response.status === 401) {
          clearToken();
          if (!window.location.pathname.endsWith('index.html')) {
            window.location.href = 'index.html';
          }
        }
        throw new Error(error.response.data?.message || 'Request failed');
      }
      throw new Error(error.message || 'Network error');
    }
  },

  // Auth
  login(email, password) {
    return this.request('POST', '/auth/login', { email, password });
  },

  getMe() {
    return this.request('GET', '/auth/me');
  },

  // Tracking
  getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request('GET', `/tracking${query ? '?' + query : ''}`);
  },

  getOne(trackingNumber) {
    return this.request('GET', `/tracking/${trackingNumber}`);
  },

  create(formData) {
    return this.request('POST', '/tracking', formData, true);
  },

  update(trackingNumber, data) {
    return this.request('PUT', `/tracking/${trackingNumber}`, data);
  },

  delete(trackingNumber) {
    return this.request('DELETE', `/tracking/${trackingNumber}`);
  },

  getStats() {
    return this.request('GET', '/tracking/stats/overview');
  },

  // Email (Zoho)
  getEmailStatus() {
    return this.request('GET', '/email/status');
  },

  sendEmail(payload, isFormData = false) {
    return this.request('POST', '/email/send', payload, isFormData);
  }
};
