import BaseSchema from './BaseSchema';
import ProductSchema from './ProductSchema';

const saleSchema = new BaseSchema({
  product: {
    type: ProductSchema,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default saleSchema;
