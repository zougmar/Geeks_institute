// client/src/pages/employer/Managers.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function EmployerManagers() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', image: null });
  const [editingId, setEditingId] = useState(null);

  // Fetch managers on load
  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const data = await api.getManagers(); // GET /employer/managers
      setManagers(data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch managers');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  // Create or update manager
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.updateManager(editingId, form); // PUT /employer/managers/:id
        alert('Manager updated');
      } else {
        await api.createManager(form); // POST /employer/managers
        alert('Manager created');
      }
      setForm({ name: '', email: '', password: '', phone: '', image: null });
      setEditingId(null);
      fetchManagers();
    } catch (err) {
      console.error(err);
      alert('Failed to save manager');
    }
  };

  // Delete manager
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this manager?')) return;
    try {
      await api.deleteManager(id); // DELETE /employer/managers/:id
      fetchManagers();
    } catch (err) {
      console.error(err);
      alert('Failed to delete manager');
    }
  };

  // Edit manager
  const handleEdit = (manager) => {
    setEditingId(manager._id);
    setForm({
      name: manager.name,
      email: manager.email,
      password: '',
      phone: manager.phone || '',
      image: manager.image || null
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Managers</h1>

      {/* Manager Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Manager' : 'Add Manager'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 border rounded"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded"
            required
          />
          <input
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="p-2 border rounded"
          />
          {!editingId && (
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="p-2 border rounded"
              required
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 border rounded" />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {editingId ? 'Update Manager' : 'Add Manager'}
          </button>
          {editingId && (
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              onClick={() => {
                setEditingId(null);
                setForm({ name: '', email: '', password: '', phone: '', image: null });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Managers Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {managers.map((manager) => (
                <tr key={manager._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={manager.image || 'https://via.placeholder.com/40?text=No+Img'}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{manager.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{manager.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{manager.phone || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => handleEdit(manager)}>Edit</button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(manager._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
