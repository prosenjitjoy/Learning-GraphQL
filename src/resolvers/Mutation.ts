import { v4 as uuid } from "uuid";

export const Mutation = {
  addCategory: (parent, args, { db }) => {
    const input = args.input;
    const categories = db.categories;
    const newCategory = {
      id: uuid(),
      name: input.name,
    };

    categories.push(newCategory);
    return newCategory;
  },

  addProduct: (parent, args, { db }) => {
    const input = args.input;
    const products = db.products;
    const newProduct = {
      id: uuid(),
      name: input.name,
      description: input.description,
      image: input.image,
      price: input.price,
      onSale: input.onSale,
      quantity: input.quantity,
      categoryId: input.categoryId,
    };

    products.push(newProduct);
    return newProduct;
  },

  addReview: (parent, args, { db }) => {
    const input = args.input;
    const reviews = db.reviews;
    const newReview = {
      id: uuid(),
      data: input.data,
      title: input.title,
      comment: input.comment,
      rating: input.rating,
      productId: input.productId,
    };

    reviews.push(newReview);
    return newReview;
  },

  deleteCategory: (parent, args, { db }) => {
    db.categories = db.categories.filter((category) => category.id !== args.id);
    db.products = db.products.map((product) => {
      if (product.categoryId === args.id) {
        return {
          ...product,
          categoryId: null,
        };
      } else {
        return product;
      }
    });
    return true;
  },

  deleteProduct: (parent, args, { db }) => {
    db.products = db.products.filter((product) => product.id !== args.id);
    db.reviews = db.reviews.filter((review) => review.productId !== args.id);
    return true;
  },

  deleteReview: (parent, args, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== args.id);
    return true;
  },

  updateCategory: (parent, args, { db }) => {
    const index = db.categories.findIndex(
      (category) => category.id === args.id
    );

    if (index === -1) return null;

    db.categories[index] = {
      ...db.categories[index],
      ...args.input,
    };
    return db.categories[index];
  },

  updateProduct: (parent, args, { db }) => {
    const index = db.products.findIndex((product) => product.id === args.id);

    if (index === -1) return null;

    db.products[index] = {
      ...db.products[index],
      ...args.input,
    };
    return db.products[index];
  },

  updateReview: (parent, args, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === args.id);

    if (index === -1) return null;

    db.reviews[index] = {
      ...db.reviews[index],
      ...args.input,
    };
    return db.reviews[index];
  },
};
