import { useEffect, useState } from "react";

type AlertProps = {
  children: React.ReactNode;
  type: "success" | "error" | "info";
  duration?: number; // ms
  onClose?: () => void;
};

export function Alert({ children, type = "info", duration = 3000, onClose }: AlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-4 py-3 rounded shadow-lg transition-opacity duration-300 ${typeStyles[type]}`}>
        {children}
      </div>
    </div>
  );
}
