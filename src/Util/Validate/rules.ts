import { EMAIL_REGEX } from "./regExRules";

export const required = {
  test: (value: any) => value,
  message: (name: string) => `${name} is required.`
};

export const validEmail = {
  test: (value: string) => EMAIL_REGEX.test(value),
  message: (name: string) => `${name} must be a valid email.`,
};

export const minLength = (minNum: number) => {
  return {
    test: (value: string) => value.length >= minNum,
    message: (name: string) => `${name} must be at least ${minNum} characters.`,
  }
};

export const minLength6 = minLength(6);

export const maxLength = {
  test: (maxNum: number) => (value: string) => value.length >= maxNum,
  message: (maxNum: number) => (name: string) => `${name} must be less than ${maxNum} characters.`,
};

export const matchPassword = (password: string) => {
  return {
    test: (value: string) => value === password,
    message: () => `Password does not match the confirm password.`,
  }
};



