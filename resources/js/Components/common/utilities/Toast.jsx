import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { useEventBus } from "@/EventBus";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Toast({}) {
  const [toasts, setToasts] = useState([]);
  const { on } = useEventBus();

  useEffect(() => {
    on("toast.show", (message, title, color = "slate") => {
      const uuid = uuidv4();

      setToasts((oldToast) => [...oldToast, { color, message, title, uuid }]);

      setTimeout(() => {
        setToasts((oldToast) =>
          oldToast.filter((toast) => toast.uuid !== uuid)
        );
      }, 10000);
    });
  }, [on]);

  return (
    <div className="toast min-w-[280px]">
      {toasts.map((toast, index) => (
        <Alert
          key={index}
          className={`bg-${toast.color}-100 text-${toast.color}-600 border border-${toast.color}-600`}
        >
          <Check
            size={16}
            color={
              toast.color === "red" || toast.color === "green"
                ? toast.color
                : undefined
            }
          />

          <div>
            <AlertTitle className={`text-${toast.color}-600`}>
              {toast.title}
            </AlertTitle>
            <AlertDescription>{toast.message}</AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
}
