export interface InputProps {
  id?: string;
  label?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  type?: "text" | "email" | "password" | "url" | "tel" | "search" | "number";
  name?: "required-field" | "optional-field";
  showRequiredMark?: boolean;
  validationMode?: "onChange" | "onBlur" | "onSubmit";
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
  suffixClassName?: string;
  errorClassName?: string;
  suffix?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
