import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import productApi from "../api/productApi";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // Mobile filter
  const [openFilter, setOpenFilter] = useState(false);

  // Sync state from URL
  useEffect(() => {
    setCategory(searchParams.get("category") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setKeyword(searchParams.get("keyword") || "");
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = { keyword, category, minPrice, maxPrice, sort };
        Object.keys(params).forEach(
          (key) => !params[key] && delete params[key]
        );

        const res = await productApi.getProducts(params);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Update URL
  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    value ? newParams.set(key, value) : newParams.delete(key);
    setSearchParams(newParams);
  };

  // Apply price safely
  const applyPriceFilter = () => {
    if (
      minPrice &&
      maxPrice &&
      Number(minPrice) > Number(maxPrice)
    ) {
      alert("Min price cannot be greater than Max price");
      return;
    }

    handleFilterChange("minPrice", minPrice);
    handleFilterChange("maxPrice", maxPrice);
    setOpenFilter(false);
  };

  const clearFilters = () => {
    setSearchParams({});
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setKeyword("");
    setSort("");
  };

  const FilterUI = () => (
    <>
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category */}
      <select
        value={category}
        onChange={(e) =>
          handleFilterChange("category", e.target.value)
        }
        className="w-full mb-4 rounded-xl border p-2"
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Home">Home</option>
        <option value="Beauty">Beauty</option>
        <option value="Sports">Sports</option>
      </select>

      {/* Price */}
      <div className="flex gap-2 mb-3">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full rounded-xl border p-2"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full rounded-xl border p-2"
        />
      </div>

      <button
        onClick={applyPriceFilter}
        className="w-full bg-indigo-600 text-white py-2 rounded-xl mb-3"
      >
        Apply Price
      </button>

      <button
        onClick={clearFilters}
        className="w-full border py-2 rounded-xl"
      >
        Clear Filters
      </button>
    </>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {keyword ? `Results for "${keyword}"` : "All Products"}
          </h2>

          <div className="flex gap-3">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                handleFilterChange("sort", e.target.value);
              }}
              className="rounded-xl border p-2"
            >
              <option value="">Sort</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>

            {/* Mobile filter */}
            <button
              onClick={() => setOpenFilter(true)}
              className="lg:hidden border px-4 py-2 rounded-xl"
            >
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop */}
          <aside className="hidden lg:block w-1/4 bg-white p-6 rounded-2xl">
            <FilterUI />
          </aside>

          {/* Products */}
          <main className="w-full lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : products.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-20">
                No products found
              </p>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      {openFilter && (
        <div className="fixed inset-0 bg-black/40 z-40">
          <div className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setOpenFilter(false)}>✕</button>
            </div>
            <FilterUI />
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
