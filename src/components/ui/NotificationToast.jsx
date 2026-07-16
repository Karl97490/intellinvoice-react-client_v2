import { Toast } from "flowbite-react";
import { Check, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

const NotificationToast = ({ status, message }) => {
  const color = status === "error" ? "red" : "green";
  return (
    <Toast className="border border-gray-100">
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-${color}-100 text-${color}-500 dark:bg-${color}-800 dark:text-${color}-200`}
      >
        {status === "error" ? <TriangleAlert size={14} /> : <Check size={14} />}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
    </Toast>
  );
};

export default NotificationToast;
