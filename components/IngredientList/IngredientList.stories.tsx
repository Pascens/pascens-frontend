import { Colors } from '@/constants/theme';
import type { Meta, StoryObj } from '@storybook/react';
import { IngredientList } from './IngredientList';

const meta = {
  title: 'Components/IngredientList',
  component: IngredientList,
} satisfies Meta<typeof IngredientList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnalisisCompleto: Story = {
  args: {
    headerTitle: "Ingredientes",
    headerSubtitle: "10 ingredientes analizados",
    categories: [
      {
        title: "Poco saludable",
        color: Colors.red,
        ingredients: [
          { id: '1', name: "Azúcar", indicators: ['Ultraprocesado', 'Aditivo', 'Info'] },
          { id: '2', name: "Jarabe de maíz de alta fructosa", indicators: ['Ultraprocesado', 'Aditivo', 'Info'] },
          { id: '3', name: "Malta de cebada", indicators: ['Alergeno', 'Info'] },
        ]
      },
      {
        title: "Moderado",
        color: Colors.orange,
        ingredients: [
          { id: '4', name: "Sal", indicators: ['Conservador', 'Info'] },
          { id: '5', name: "Maíz", indicators: ['Natural', 'Info'] },
        ]
      },
      {
        title: "Saludable",
        color: Colors.secondary,
        ingredients: [
          { id: '6', name: "Niacina (Vitamina B3)", indicators: ['Antioxidante', 'Natural', 'Info'] },
          { id: '7', name: "Vitamina B6", indicators: ['Antioxidante', 'Natural', 'Info'] },
          { id: '8', name: "Hierro reducido", indicators: ['Natural', 'Info'] },
          { id: '9', name: "Óxido de zinc", indicators: ['Antioxidante', 'Info'] },
          { id: '10', name: "Ácido fólico", indicators: ['Natural', 'Antioxidante', 'Info'] },
        ]
      }
    ]
  },
};