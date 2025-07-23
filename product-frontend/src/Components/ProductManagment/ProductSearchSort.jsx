// src/Components/ProductManagement/ProductSearchSort.jsx
import React from "react";

function ProductSearchSort({
  searchKeyword,
  setSearchKeyword,
  fetchProducts,
  page,
  totalPages,
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Search products..."
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
          fetchProducts(0, sortBy, sortDir, e.target.value);
        }}
        className="border p-2 rounded mb-4 w-full max-w-md"
      />
      <div className="flex items-center mb-4">
        <button
          disabled={page === 0}
          onClick={() => fetchProducts(page - 1)}
          className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          {page + 1} / {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => fetchProducts(page + 1)}
          className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            fetchProducts(page, e.target.value, sortDir);
          }}
          className="ml-4 border rounded p-1"
        >
          <option value="id">ID</option>
          <option value="productName">Name</option>
          <option value="price">Price</option>
          <option value="status">Status</option>
        </select>
        <select
          value={sortDir}
          onChange={(e) => {
            setSortDir(e.target.value);
            fetchProducts(page, sortBy, e.target.value);
          }}
          className="ml-2 border rounded p-1"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </>
  );
}

export default ProductSearchSort;