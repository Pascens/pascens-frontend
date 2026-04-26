import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IndicatorType } from "../../constants/indicators";
import { Colors } from "../../constants/theme";
import { IngredientListItem } from "../IngredientListItem/IngredientListItem";

interface Ingredient {
  id: string;
  name: string;
  indicators: IndicatorType[];
}

interface Category {
  title: string;
  color: string;
  ingredients: Ingredient[];
}

interface IngredientListProps {
  headerTitle: string;
  headerSubtitle: string;
  categories: Category[];
}

/**
 * IngredientList Component
 * * Renders a categorized and collapsible list of ingredients with their indicators.
 * * @component
 */
export const IngredientList: React.FC<IngredientListProps> = ({
  headerTitle,
  headerSubtitle,
  categories,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map((c) => c.title),
  );

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{headerTitle}</Text>
        <Text style={styles.subtitle}>{headerSubtitle}</Text>
      </View>

      {categories.map((category) => {
        const isExpanded = expandedCategories.includes(category.title);

        return (
          <View key={category.title} style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => toggleCategory(category.title)}
              activeOpacity={0.7}
            >
              <View style={styles.categoryInfo}>
                <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                <Text style={[styles.categoryTitle, { color: category.color }]}>
                  {category.title}
                </Text>
              </View>

              <View style={styles.categoryRight}>
                <View style={[styles.countBadge, { backgroundColor: `${category.color}1A` }]}>
                  <Text style={[styles.countText, { color: category.color }]}>
                    {category.ingredients.length}
                  </Text>
                </View>
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={Colors.mediunGray}
                />
              </View>
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.ingredientsContent}>
                {category.ingredients.map((item, index) => (
                  <View key={item.id}>
                    <IngredientListItem
                      name={item.name}
                      dotColor={category.color}
                      indicatorTypes={item.indicators}
                      onPress={() => console.log(`Pressed ${item.name}`)}
                    />
                    {index < category.ingredients.length - 1 && <View style={styles.separator} />}
                  </View>
                ))}
              </View>
            )}
            <View style={styles.categorySeparator} />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.darkGray,
    marginTop: 4,
  },
  categoryContainer: {
    marginBottom: 4,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  categoryRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  countBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  countText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  ingredientsContent: {},
  separator: {
    height: 1,
    backgroundColor: Colors.gray,
    marginLeft: 16,
  },
  categorySeparator: {
    height: 1,
    backgroundColor: Colors.gray,
    marginHorizontal: 16,
  },
});

export default IngredientList;
