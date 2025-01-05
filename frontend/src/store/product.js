import { create } from "zustand";

// mistake ive made
// use convention json {success , message , data} all the time

const BASE_URL="https://mern-01-crud-backend.onrender.com/api/products";

// const BASE_URL="http://localhost:5000/api/products";

export const useProductStore = create((set) => ({
	products: [], // Ensure the default value is an empty array
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
	  if (!newProduct.name || !newProduct.image || !newProduct.price) {
		return { success: false, message: "Please fill in all fields." };
	  }
	  try {
		const res = await fetch(`${BASE_URL}`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(newProduct),
		});
		if (!res.ok) throw new Error("Failed to create product.");
		const data = await res.json();
  
		// Safely append to the existing array
		set((state) => ({ products: [...(state.products || []), data.data] }));
  
		return { success: true, message: "Product created successfully" };
	  } catch (error) {
		console.error("Error creating product:", error);
		return { success: false, message: "Error creating product." };
	  }
	},
	fetchProducts: async () => {
		const res = await fetch(`${BASE_URL}`);
		const data = await res.json();
		 console.log("Fetched products from API:", data); // Debug log
		set({ products: data.data });
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`${BASE_URL}/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`${BASE_URL}/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));
