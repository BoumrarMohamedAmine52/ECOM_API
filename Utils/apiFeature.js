class apiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["sort", "fields", "page", "limit"];

    excludedFields.forEach((f) => {
      delete queryObj[f];
    });

    let queryStr = JSON.stringify(queryObj);

    queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort.split(",").join(" "));
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  fields() {
    if (this.queryString.fields) {
      this.query = this.query.select(
        this.queryString.fields.split(",").join(" "),
      );
    } else {
      this.query = this.query.select("-__v");
    }
  }

  pagination() {
    let page;
    let limit;
    this.queryString.page ? (page = this.queryString.page) : (page = 1);
    this.queryString.limit ? (limit = this.queryString.limit) : (limit = 100);

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports;
