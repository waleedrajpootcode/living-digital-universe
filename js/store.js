// Data Store to fetch and provide portfolio data
export const store = {
  data: null,

  async init() {
    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) throw new Error('Failed to load project records');
      this.data = await response.json();
      return this.data;
    } catch (err) {
      console.error('Store init error:', err);
      return null;
    }
  },

  getDeveloper() {
    return this.data ? this.data.developer : null;
  },

  getProjects() {
    return this.data ? this.data.projects : [];
  },

  getProjectById(id) {
    if (!this.data) return null;
    return this.data.projects.find(p => p.id === id);
  }
};