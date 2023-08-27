class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // implimenting filter function
  filter() {
    const queryObj = { ...this.queryStr };
    // Remove some field
    const exludedFields = ['page', 'keyword', 'sort', 'limit', 'fields'];
    // removing some fields
    exludedFields.forEach((el) => delete queryObj[el]);
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query.find(JSON.parse(queryString));
    return this;
  }

  // implimenting search function
  search() {
    // mongodb search keyword formate
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // implimenting limited field function client can request only necessory data
  limitFields() {
    const fields = this.queryStr.fields
      ? this.queryStr.fields.split(',').join(' ')
      : '-__v';

    this.query = this.query.select(fields);
    return this;
  }

  // pagination function
  pagination() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 20;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
