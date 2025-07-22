// src/ProductManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

function ProductManagement({ token, setToken }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    status: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch all products
  const fetchProducts = () => {
    axios
      .get(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => setError("Failed to fetch products"));
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Edit product
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.productName || form.price === "") {
      setError("Product name and price are required.");
      return;
    }
    if (editingId) {
      // Edit
      axios
        .put(`${API_URL}/products/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setForm({ productName: "", description: "", price: "", status: "" });
          setEditingId(null);
          fetchProducts();
        })
        .catch((err) => setError(err.response?.data || "Edit failed"));
    } else {
      // Add
      axios
        .post(`${API_URL}/products/save`, form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setForm({ productName: "", description: "", price: "", status: "" });
          fetchProducts();
        })
        .catch((err) => setError(err.response?.data || "Add failed"));
    }
  };

  // Delete product
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchProducts())
      .catch(() => setError("Delete failed"));
  };

  // Start editing
  const handleEdit = (product) => {
    setForm({
      productName: product.productName || "",
      description: product.description || "",
      price: product.price || "",
      status: product.status || "",
    });
    setEditingId(product.id);
  };

  // Cancel editing
  const handleCancel = () => {
    setForm({ productName: "", description: "", price: "", status: "" });
    setEditingId(null);
    setError("");
  };

  // Search products
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    if (keyword.trim() === "") {
      fetchProducts();
    } else {
      axios
        .get(`${API_URL}/products/search?keyword=${keyword}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProducts(res.data))
        .catch(() => setProducts([]));
    }
  };

  // Logout
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full flex justify-between items-center mb-6 max-w-2xl">
        <h1 className="text-3xl font-bold text-blue-700">Product Management</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            name="status"
            value={form.status}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            type="submit"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search products..."
          value={searchKeyword}
          onChange={(e) => handleSearch(e.target.value)}
          className="border p-2 rounded mb-4 w-full max-w-md"
        />
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td className="py-2 px-4 border-b">{prod.id}</td>
                <td className="py-2 px-4 border-b">{prod.productName}</td>
                <td className="py-2 px-4 border-b">{prod.description}</td>
                <td className="py-2 px-4 border-b">₹{prod.price}</td>
                <td className="py-2 px-4 border-b">{prod.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(prod)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(prod.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;