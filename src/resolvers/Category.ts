export const Category = {
  products: (parent, args, { db }) => {
    const products = db.products;
    const reviews = db.reviews;
    const categoryId = parent.id;
    const categoryProducts = products.filter(
      (product) => product.categoryId === categoryId
    );
    const filter = args.filter;
    let filteredCategoryProducts = categoryProducts;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => {
            return product.onSale;
          }
        );
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => {
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
          }
        );
      }
    }

    return filteredCategoryProducts;
  },
};
