export interface AuthenticationFormProps {
  size?: "sm" | "md" | "lg" | "xl";
  submitLabel: string;
  showEndBtn?: boolean;
  children?: React.ReactNode;
  className?: string;
  onSendCode: (email: string) => Promise<void>;
  onSubmit: (email: string, code: string) => Promise<string>;
}
