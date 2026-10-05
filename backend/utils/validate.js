import { HttpError } from "./httpError.js";

/**
 * Validate `data` against a Joi schema.
 * Returns the validated (and defaulted) value, or throws a 422 HttpError.
 */
export function validate(schema, data) {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw new HttpError(422, error.details.map((d) => d.message).join(", "));
  }
  return value;
}
