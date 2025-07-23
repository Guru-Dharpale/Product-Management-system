// src/Components/ProductManagement/ProductTable.jsx
import React from "react";

function ProductTable({ products, handleEdit, handleDelete }) {
  return (
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
  );
}

export default ProductTable;