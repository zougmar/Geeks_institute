// client/src/services/api.js
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY || 'crm_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request(path, { method='GET', body=null, auth=true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if(auth) {
    const token = getToken();
    if(token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(()=> ({}));
  if(!res.ok) throw data;
  return data;
}

export default {
  login: (payload) => request('/auth/login', { method: 'POST', body: payload, auth:false }),
  me: () => request('/auth/me'),
  // employer endpoints
  dashboardStats: () => request('/employer/dashboard-stats'),
  listManagers: () => request('/employer/managers'),
  createManager: (m) => request('/employer/managers', { method:'POST', body:m }),
  updateManager: (id,m) => request(`/employer/managers/${id}`, { method:'PUT', body:m }),
  deleteManager: (id) => request(`/employer/managers/${id}`, { method:'DELETE' }),
  listLeads: (q='') => request(`/employer/leads${q ? '?'+q : ''}`),
  createLead: (l) => request('/employer/leads', { method:'POST', body:l }),
  updateLead: (id,l) => request(`/employer/leads/${id}`, { method:'PUT', body:l }),
  deleteLead: (id) => request(`/employer/leads/${id}`, { method:'DELETE' }),
  // manager endpoints
  managerLeads: () => request('/managers/leads'),
  managerUpdateLead: (id, body) => request(`/managers/leads/${id}`, { method:'PATCH', body }),
};
export { TOKEN_KEY };
