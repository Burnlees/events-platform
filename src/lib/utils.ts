import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractErrorMessage = (error: {
  serverError?: string;
  validationErrors?: {
    _errors?: string[];
    id?: { _errors?: string[] };
  };
  bindArgsValidationErrors?: readonly [];
}): string => {
  if (error.serverError) {
    return error.serverError;
  }

  if (error.validationErrors?._errors?.[0]) {
    return error.validationErrors._errors[0];
  }

  return "An unknown error occurred.";
};
