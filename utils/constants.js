const dbName = 'moviesdb';
const mongoParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  dbName,
  mongoParams,
};
