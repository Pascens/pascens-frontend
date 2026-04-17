import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

export interface LegalSection {
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

export interface LegalDocumentProps {
  lastUpdated: string;
  sections: LegalSection[];
}

export const LegalDocument = ({ lastUpdated, sections }: LegalDocumentProps) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.card} contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Última actualización: {lastUpdated}</Text>
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {index + 1}. {section.title}
            </Text>
            <Text style={styles.body}>{section.content}</Text>
            {section.subsections?.map((sub, subIndex) => (
              <View key={subIndex} style={styles.subsection}>
                <Text style={styles.subsectionTitle}>
                  {index + 1}.{subIndex + 1} {sub.title}
                </Text>
                <Text style={styles.body}>{sub.content}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.gray,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#C8CFC8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  lastUpdated: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  subsection: {
    gap: 4,
    marginTop: 4,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
  },
  body: {
    fontSize: 13,
    color: "#444",
    lineHeight: 20,
  },
});

export default LegalDocument;
