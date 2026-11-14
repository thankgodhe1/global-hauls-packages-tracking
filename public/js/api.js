const api = {
  async getTracking(trackingNumber) {
    try {
      const res = await axios.get(`${API_BASE_URL}/tracking/${trackingNumber}`);
      return res.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Tracking not found');
      }
      throw new Error('Network error. Please try again.');
    }
  },

  async lookup(trackingNumber) {
    try {
      const res = await axios.post(`${API_BASE_URL}/tracking/lookup`, {
        trackingNumber: trackingNumber.trim().toUpperCase()
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Tracking not found');
      }
      throw new Error('Network error. Please try again.');
    }
  },

  async getCustomerShipments(email) {
    try {
      const res = await axios.get(`${API_BASE_URL}/tracking/customer/${encodeURIComponent(email)}`);
      return res.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Could not load shipments');
      }
      throw new Error('Network error. Please try again.');
    }
  }
};
