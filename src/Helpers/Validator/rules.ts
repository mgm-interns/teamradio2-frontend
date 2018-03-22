import { EMAIL_REGEX, USERNAME_REGEX, DISPLAY_NAME_REGEX } from "./regExRules";

const required = {
  test: (value: any) => value,
  message: (name: string) => `${name} is required.`
};

const validEmail = {
  test: (value: string) => EMAIL_REGEX.test(value),
  message: (name: string) => `${name} must be a valid address.`,
};

const minLength = (minNum: number) => {
  return {
    test: (value: string) => value.length >= minNum,
    message: (name: string) => `${name} must be at least ${minNum} characters.`,
  }
};

const minLength6 = minLength(6);

const maxLength = {
  test: (maxNum: number) => (value: string) => value.length >= maxNum,
  message: (maxNum: number) => (name: string) => `${name} must be less than ${maxNum} characters.`,
};

const matchPassword = (password: string) => {
  return {
    test: (value: string) => value === password,
    message: () => `Password does not match the confirm password.`,
  }
};

const validUsername = {
  test: (value: string) => USERNAME_REGEX.test(value),
  message: () => `Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.`,
};

const validDisplayName = {
  test: (value: string) => DISPLAY_NAME_REGEX.test(value),
  message: () => `Display name may only contain alphabet characters.`,
};

export const Rules = {
  required: required,
  validEmail: validEmail,
  minLength6: minLength6,
  maxLength: maxLength,
  matchPassword: matchPassword,
  validUsername: validUsername,
  validDisplayName: validDisplayName,
};


