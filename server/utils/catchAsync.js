/**
- receive a function and return a new function with catch so it can work property and handle error
- next is called with err by default

*/

module.exports = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};
