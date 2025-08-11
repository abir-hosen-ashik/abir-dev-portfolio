import { useEffect } from "react";
import { X } from "lucide-react";

export type NotificationType = "success" | "error" | "info";

interface NotificationProps {
    type?: NotificationType;
    message: string;
    onClose: () => void;
}

export default function Notification({
    type = "success",
    message,
    onClose,
}: NotificationProps) {
    // Auto-close after 3s
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColors: Record<NotificationType, string> = {
        success: "bg-gradient-to-r from-primary-500 to-secondary-900 text-white",
        error: "bg-gradient-to-r from-secondary-500 to-accent-500 text-white",
        info: "bg-gradient-to-r  bg-gradient-to-r from-accent-500 to-success-500 r text-white",
    };

    return (
        <div
            className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-card
      flex items-center gap-3 animate-slide-in-right ${bgColors[type]}`}
        >
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="hover:opacity-80">
                <X size={18} />
            </button>
        </div>
    );
}
