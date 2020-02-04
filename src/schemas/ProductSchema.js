import BaseSchema from './BaseSchema';

const productSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default productSchema;
