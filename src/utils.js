const movies = require("./mocks/movies");
const categories = require("./mocks/categories");

exports.getMoviesForCategory = categoryName => {
  return movies.filter(movie =>
    movie.category_ids
      .map(categoryId =>
        categories
          .find(category => category.id === categoryId)
          .name.toUpperCase()
      )
      .includes(categoryName.toUpperCase())
  );
};
