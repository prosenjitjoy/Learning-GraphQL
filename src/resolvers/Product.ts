export const Product = {
  category: (parent, args, { db }) => {
    const categories = db.categories;
    const categoryId = parent.categoryId;
    return categories.find((category) => category.id === categoryId);
  },
  reviews: (parent, args, { db }) => {
    const reviews = db.reviews;
    const productId = parent.id;
    return reviews.filter((review) => review.productId === productId);
  },
};
