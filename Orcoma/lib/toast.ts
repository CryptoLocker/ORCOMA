import { toast as hotToast } from "react-hot-toast"

// Configuración personalizada para ORCOMA
export const showToast = {
  success: (title: string, description?: string) => {
    const message = description ? `${title}\n${description}` : title
    return hotToast.success(message, {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        maxWidth: "400px",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#10B981",
      },
    })
  },

  error: (title: string, description?: string) => {
    const message = description ? `${title}\n${description}` : title
    return hotToast.error(message, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        maxWidth: "400px",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#EF4444",
      },
    })
  },

  loading: (message: string) => {
    return hotToast.loading(message, {
      position: "top-right",
      style: {
        background: "#F59E0B",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        maxWidth: "400px",
      },
    })
  },

  info: (title: string, description?: string) => {
    const message = description ? `${title}\n${description}` : title
    return hotToast(message, {
      duration: 3000,
      position: "top-right",
      icon: "ℹ️",
      style: {
        background: "#3B82F6",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        maxWidth: "400px",
      },
    })
  },

  warning: (title: string, description?: string) => {
    const message = description ? `${title}\n${description}` : title
    return hotToast(message, {
      duration: 3500,
      position: "top-right",
      icon: "⚠️",
      style: {
        background: "#F59E0B",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        maxWidth: "400px",
      },
    })
  },

  dismiss: (toastId?: string) => {
    hotToast.dismiss(toastId)
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: any) => string)
    },
  ) => {
    return hotToast.promise(promise, messages, {
      position: "top-right",
      style: {
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        maxWidth: "400px",
      },
      success: {
        style: {
          background: "#10B981",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#10B981",
        },
      },
      error: {
        style: {
          background: "#EF4444",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#EF4444",
        },
      },
      loading: {
        style: {
          background: "#F59E0B",
          color: "#fff",
        },
      },
    })
  },
}

// Configuración global de toast
export const toastConfig = {
  duration: 3000,
  position: "top-right" as const,
  reverseOrder: false,
  gutter: 12,
  containerClassName: "toast-container",
  containerStyle: {
    top: "1rem",
    right: "1rem",
  },
  toastOptions: {
    className: "",
    duration: 3000,
    style: {
      background: "#fff",
      color: "#363636",
      borderRadius: "12px",
      padding: "16px 20px",
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      maxWidth: "400px",
    },
  },
}
