export interface InputProps {
  label?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  type?: "text" | "email" | "password" | "url" | "tel" | "search";
  name?: "required-field" | "optional-field";
  validationMode: "onChange" | "onBlur" | "onSubmit";
  match?:
    | boolean
    | "badInput"
    | "customError"
    | "patternMismatch"
    | "rangeOverflow"
    | "rangeUnderflow"
    | "stepMismatch"
    | "tooLong"
    | "tooShort"
    | "typeMismatch"
    | "valueMissing";
  readonly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  pattern?: string;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  description?: string;
  requiredError?: string;
  labelClassName?: string;
  textClassName?: string;
  inputClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}
