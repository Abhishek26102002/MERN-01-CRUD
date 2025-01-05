import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt , updatedAt
  }
);

const Mproduct=mongoose.model('Mproduct',productSchema)
// mongooes with convert Mproduct to mproducts collections for convenience

export default Mproduct;
