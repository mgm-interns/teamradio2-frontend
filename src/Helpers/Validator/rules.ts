import { ALPHANUMERIC_REGEX, EMAIL_REGEX, USERNAME_REGEX } from './regexRules';

const required = {
  test: (value: any) => value,
  message: (name: string) => `${name} is required.`,
};

const validEmail = {
  test: (value: string) => EMAIL_REGEX.test(value),
  message: (name: string) => `${name} must be a valid address.`,
};

const minLength = (minNum: number) => {
  return {
    test: (value: string) => value.length >= minNum,
    message: (name: string) => `${name} must be at least ${minNum} characters.`,
  };
};

const minLength6 = minLength(6);

const maxLength = (maxNum: number) => {
  return {
    test: (value: string) => value.length <= maxNum,
    message: (name: string) =>
      `${name} must be less than ${maxNum} characters.`,
  };
};

const maxLength15 = maxLength(15);

const matchPassword = (password: string) => {
  return {
    test: (value: string) => value === password,
    message: () => `Password does not match the confirm password.`,
  };
};

const validUsername = {
  test: (value: string) => USERNAME_REGEX.test(value),
  message: () =>
    `Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.`,
};

const validDisplayName = {
  test: (value: string) => ALPHANUMERIC_REGEX.test(value),
  message: () => `Display name may only contain alphanumeric characters.`,
};

const validStationName = {
  test: (value: string) => ALPHANUMERIC_REGEX.test(value),
  message: (name: string) => `${name} only contain alphanumeric characters.`,
};

export const Rules = {
  required,
  validEmail,
  maxLength15,
  minLength6,
  matchPassword,
  validUsername,
  validDisplayName,
  validStationName,
};
