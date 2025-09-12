import type { ReactNode } from "react";

export const LOGIN_FORM = "LOGIN_FORM",
  SIGNUP_FORM = "SIGNUP_FORM",
  FORGOTPASSWORD_FORM = "FORGOTPASSWORD_FORM";

export type FormType =
  | typeof LOGIN_FORM
  | typeof SIGNUP_FORM
  | typeof FORGOTPASSWORD_FORM;

export type Crumb = {
  label: string;
  href?: string;
  icon?: ReactNode;
  isCurrent?: boolean;
};
