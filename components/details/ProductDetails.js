import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const ProductDetails = ({ route }) => {
  const { book } = route.params; // Get the book object from navigation params

  const handleAddToCart = () => {
    // Add logic to handle adding to cart
    alert("Successfully add to Cart!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image source={{ uri: book.image }} style={styles.bookImage} /> */}

      <View style={[styles.section, styles.titleSection]}>
        <Text style={styles.bookTitle}>Book Name</Text>
      </View>

      <View style={[styles.section, styles.authorSection]}>
        <Text style={styles.bookAuthor}>Book Author</Text>
      </View>

      <View style={[styles.section, styles.genreSection]}>
        <Text style={styles.bookGenre}>Book Genre</Text>
      </View>

      <View style={[styles.section, styles.publishedSection]}>
        <Text style={styles.bookPublished}>Published Date</Text>
      </View>

      <View style={[styles.section, styles.descriptionSection]}>
        <Text style={styles.bookDescription}>
          This is a brief description about the book. You can extend this part
          to include more details about the book.
        </Text>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#E8EAF6", // Soft lavender background for the entire page
  },
  section: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  titleSection: {
    backgroundColor: "#FFCDD2", // Soft Red for the title section
  },
  authorSection: {
    backgroundColor: "#C8E6C9", // Soft Green for the author section
  },
  genreSection: {
    backgroundColor: "#BBDEFB", // Soft Blue for the genre section
  },
  publishedSection: {
    backgroundColor: "#FFF9C4", // Soft Yellow for the published date section
  },
  descriptionSection: {
    backgroundColor: "#D1C4E9", // Soft Purple for the description section
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  bookAuthor: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#666",
  },
  bookGenre: {
    fontSize: 16,
    color: "#555",
  },
  bookPublished: {
    fontSize: 16,
    color: "#555",
  },
  bookDescription: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  addToCartButton: {
    backgroundColor: "#3F51B5", // Dark Blue color for the button
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addToCartText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetails;
