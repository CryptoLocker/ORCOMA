// lib/actions.js
export async function riskIdentificationFormAction(formData) {
    // Simulación de envío de datos
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          errors: null,
        });
      }, 1000);
    });
  }