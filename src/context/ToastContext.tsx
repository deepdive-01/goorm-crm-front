import { CheckCircleOutlineIcon, CloseOutlineIcon } from "@vapor-ui/icons";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ToastType = "success" | "error";

interface ToastState {
  type: ToastType;
  message: string;
  id: number;
}

interface ToastContextValue {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((type: ToastType, message: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ type, message, id: Date.now() });
    timerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const showSuccess = useCallback(
    (message: string) => show("success", message),
    [show],
  );

  const showError = useCallback(
    (message: string) => show("error", message),
    [show],
  );

  const dismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
      {toast && (
        <div
          key={toast.id}
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[280px] max-w-[360px] text-white ${
            toast.type === "success" ? "bg-primary-500" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircleOutlineIcon size={20} className="flex-shrink-0" />
          ) : (
            <CloseOutlineIcon size={20} className="flex-shrink-0" />
          )}
          <span className="text-body4 flex-1">{toast.message}</span>
          <button
            onClick={dismiss}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="알림 닫기"
          >
            <CloseOutlineIcon size={16} />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
