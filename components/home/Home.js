import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { AuthContext } from "../firebase/Authprovider/AuthProvider";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productCount, setProductCount] = useState(0); // To store product count
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
  };

  const handleOutsidePress = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
    Keyboard.dismiss(); // Close the keyboard when tapping outside
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products); // Set initial filtered products to all products
        setProductCount(data.products.length); // Set the initial total product count
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.price.toString().includes(searchQuery)
    );
    setFilteredProducts(filtered);
    setProductCount(filtered.length); // Update the product count after filtering
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilteredProducts(products); // Reset to the original products list
    setProductCount(products.length); // Reset product count to the original number
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const getRandomColor = () => {
    const colors = ["#FFDDC1", "#CFFAFE", "#D1FAE5", "#FFF5EB", "#E6E6FA"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderProduct = ({ item }) => (
    <View style={[styles.productItem, { backgroundColor: getRandomColor() }]}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
      <Text style={styles.productCategory}>Category: {item.category}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      {/* "View Details" Button */}
      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() => navigation.navigate("ProductDetails", { product: item })}
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <SafeAreaView style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.navTitle}>Pustok</Text>
          <View style={styles.navLinks}>
            {user ? (
              <TouchableOpacity
                style={styles.profileIconWrapper}
                onPress={() => setDropdownVisible(!dropdownVisible)}
              >
                <Image
                  source={
                    user.photoURL
                      ? { uri: user.photoURL }
                      : require("../../assets/user-profile-icon-free-vector.jpg")
                  }
                  style={styles.profileIcon}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setDropdownVisible(!dropdownVisible)}
              >
                <Image
                  source={require("../../assets/10405572.png")}
                  style={styles.profileIcon}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            {dropdownVisible && (
              <View style={styles.dropdown}>
                {user && <Text style={styles.userEmail}>{user.email}</Text>}
                <TouchableOpacity onPress={() => navigation.navigate("About")}>
                  <Text style={styles.dropdownItem}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Contact")}
                >
                  <Text style={styles.dropdownItem}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Profile")}
                >
                  <Text style={styles.dropdownItem}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={
                    user ? handleLogout : () => navigation.navigate("Login")
                  }
                >
                  <Text style={styles.logoutText}>
                    {user ? "Logout" : "Login"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Adjust layout to avoid keyboard overlap */}
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.heading}>All Books</Text>

          {/* Show total product count */}
          <Text style={styles.productCountText}>
            Total Books: {productCount}
          </Text>

          {/* Search bar and buttons */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by title, category, price..."
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true} // Ensure scrolling works
          />
        </KeyboardAvoidingView>

        {/* Footer stays fixed */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 My Product Store. All rights reserved.
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    overflow: "visible",
  },
  navbar: {
    backgroundColor: "#6200EE",
    padding: 20,
    paddingTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    position: "relative",
  },
  navTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  profileIconWrapper: {
    marginRight: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderColor: "#FFFFFF",
    borderWidth: 2,
  },
  dropdown: {
    position: "absolute",
    top: 55,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width: 180,
    zIndex: 1000,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productCountText: {
    fontSize: 20, // Updated larger font size
    fontWeight: "bold", // Bold text
    backgroundColor: "#6200EE", // Dark purple background
    color: "#FFFFFF", // White text for contrast
    padding: 10, // Padding for spacing
    borderRadius: 8, // Rounded corners
    textAlign: "center", // Center the text
    marginBottom: 15, // Space below for better separation
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  resetButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  productItem: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: "#555",
  },
  viewDetailsButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "center",
  },
  viewDetailsText: {
    color: "#FFF",
    fontSize: 16,
  },
  footer: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});

export default Home;
