export const Query = {
  hello: (parent, args, context) => {
    return "world";
  },
  numberOfAnimals: (parent, args, context) => {
    return 55;
  },
  price: (parent, args, context) => {
    return 2342.23;
  },
  isCool: (parent, args, context) => {
    return false;
  },
  array: (parent, args, context) => {
    return ["Hello", "my", "Friend"];
  },
  products: (parent, args, { db }) => {
    const products = db.products;
    const reviews = db.reviews;
    const filter = args.filter;

    console.log(reviews);
    let filteredProducts = products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;

          return avgProductRating >= avgRating;
        });
      }
    }
    return filteredProducts;
  },
  product: (parent, args, { db }) => {
    const products = db.products;
    const { id } = args;
    return products.find((product) => product.id === id);
  },
  categories: (parent, args, { db }) => {
    const categories = db.categories;
    return categories;
  },
  category: (parent, args, { db }) => {
    const categories = db.categories;
    const { id } = args;
    return categories.find((category) => category.id === id);
  },
};
