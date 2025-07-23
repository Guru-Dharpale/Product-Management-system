// src/Components/ProductManagement/ProductForm.jsx
import React from "react";

function ProductForm({ form, error, editingId, handleChange, handleSubmit, handleCancel }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
  );
}

export default ProductForm;