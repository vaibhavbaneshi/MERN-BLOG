// class ApiError extends Error {
//     constructor(statusCode, data, message = "Something went wrong", errors = [], stack = "") {
//       super(message);
//       this.statusCode = statusCode;
//       this.data = data || null;
//       this.errors = errors || [];
//       this.success = false;
  
//       if (stack) {
//         this.stack = stack;
//       } else {
//         Error.captureStackTrace(this, this.constructor);
//       }
//     }
//   }
  
//   export { ApiError };

export const errorHandler = (success, statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};