const Response = {
  _200(
    data, 
    message = "All Correct") {
    return {
      message,
      data,
    };
  },
  _400(
    message = "Something is wrong",
    error,
    data, 
    ) {
    return {
      message,
      error,
      data,
    };
  },
  _404(
    message = "Resource not Found", 
    data,
    error) {
    return {
      message,
      error,
      data,
    };
  },
  _500(
    error,
    message = "Server error, call the administrator", 
    data,
    ) {
    return {
      message,
      error,
      data,
    };
  },

};
module.exports = Response;
