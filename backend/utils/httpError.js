/** Creates an error carrying an HTTP status code for the central handler. */
export function HttpError(statusCode, message) {
  const error = new Error(message);
  error.name = "HttpError";
  error.statusCode = statusCode;
  return error;
}
