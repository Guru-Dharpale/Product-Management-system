import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import ProductSearchSort from "./ProductSearchSort";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ...rest of your imports
const API_URL = "http://localhost:8080";
function ProductManagement({ token, setToken }) {
  // ...all your state and functions
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

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size] = useState(5);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  // Fetch all products
  const fetchProducts = (
    pageNum = 0,
    sortField = sortBy,
    sortDirection = sortDir,
    keyword = searchKeyword
  ) => {
    let url = `${API_URL}/products?page=${pageNum}&size=${size}&sortBy=${sortField}&sortDir=${sortDirection}`;
    if (keyword.trim() !== "") {
      url = `${API_URL}/products/search?keyword=${keyword}&page=${pageNum}&size=${size}&sortBy=${sortField}&sortDir=${sortDirection}`;
    }
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
        setPage(pageNum);
      })
      .catch((err) => toast.error("Failed to fetch products"));
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
          toast.success("Product added successfully");
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
    <div>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <div className="w-full flex justify-between items-center mb-6 max-w-5xl">
          <h1 className="text-3xl font-bold text-blue-700">
            Product Management
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        <div className="w-full max-w-5xl flex flex-row gap-6 md:flex-row gap-6">
          <div className="flex-1">
            <ProductForm
              form={form}
              error={error}
              editingId={editingId}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          </div>
          <div className="flex-[2]">
            <ProductSearchSort
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              fetchProducts={fetchProducts}
              page={page}
              totalPages={totalPages}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortDir={sortDir}
              setSortDir={setSortDir}
            />
            <ProductTable
              products={products}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductManagement;