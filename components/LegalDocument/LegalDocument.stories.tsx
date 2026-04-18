import type { Meta, StoryObj } from "@storybook/react";
import LegalDocument from "./LegalDocument";

const meta: Meta<typeof LegalDocument> = {
  title: "Components/LegalDocument",
  component: LegalDocument,
};

export default meta;
type Story = StoryObj<typeof LegalDocument>;

export const PrivacyPolicy: Story = {
  args: {
    lastUpdated: "4 de marzo de 2026",
    sections: [
      {
        title: "Introducción",
        content:
          "En Pascens Health App, nos comprometemos a proteger su privacidad y garantizar la seguridad de su información personal. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información cuando utiliza nuestra aplicación móvil.",
      },
      {
        title: "Información que Recopilamos",
        content: "",
        subsections: [
          {
            title: "Información de Registro",
            content:
              "Al crear una cuenta, recopilamos: nombre, correo electrónico, contraseña (encriptada) y foto de perfil (opcional).",
          },
          {
            title: "Información de Perfiles",
            content:
              "Datos demográficos de perfiles familiares (género, etapa de vida), condiciones de salud seleccionadas voluntariamente y preferencias de alérgenos.",
          },
          {
            title: "Historial de Escaneos",
            content:
              "Registramos los productos que escanea, fechas de escaneo, perfiles asociados y productos marcados como favoritos.",
          },
          {
            title: "Datos de Uso",
            content:
              "Información sobre cómo interactúa con la aplicación, incluyendo funciones utilizadas, tiempo de uso y patrones de navegación.",
          },
          {
            title: "Información del Dispositivo",
            content:
              "Modelo de dispositivo, sistema operativo, identificadores únicos del dispositivo y datos de rendimiento de la aplicación.",
          },
        ],
      },
      {
        title: "Cómo Utilizamos su Información",
        content: "Utilizamos la información recopilada para:",
      },
    ],
  },
};

export const ShortDocument: Story = {
  args: {
    lastUpdated: "1 de enero de 2026",
    sections: [
      {
        title: "Términos de Uso",
        content:
          "Al usar esta aplicación, aceptas los presentes términos y condiciones.",
      },
      {
        title: "Limitación de Responsabilidad",
        content:
          "Pascens Health App no se hace responsable por decisiones tomadas con base en la información provista.",
      },
    ],
  },
};
