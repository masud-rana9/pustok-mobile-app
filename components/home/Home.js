import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons for the search icon
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AuthContext } from "../firebase/Authprovider/AuthProvider";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(""); // Search text state
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products state
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products); // Initialize filtered products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to filter products by title when the search button is clicked
  const handleSearch = () => {
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Function to reset the search
  const handleReset = () => {
    setSearchText(""); // Clear the search text
    setFilteredProducts(products); // Reset to all products
  };

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

  return (
    <TouchableWithoutFeedback>
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
                  source={{
                    uri:
                      user.photoURL ||
                      require("../../assets/user-profile-icon-free-vector.jpg"),
                  }}
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
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>All Books</Text>

          {/* Search bar with a button and reset button */}
          <View style={styles.searchBarWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by title..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              // Disable outline
              underlineColorAndroid="transparent" 
              selectionColor="#6200EE" 
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <MaterialIcons name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Render filtered products */}
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

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
  },
  navbar: {
    backgroundColor: "#6200EE",
    padding: 20,
    paddingTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50, // Rounded corners for the search bar
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 25, 
    backgroundColor: '#fff', 
    outline: 'none'
  },
  
  searchButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 50, 
    justifyContent: "center",
    alignItems: "center",
   
  },
  resetButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 50, 
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  resetText: {
    color: "white",
    fontSize: 16,
  },
  productItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
  productCategory: {
    fontSize: 12,
    color: "#555",
  },
  productDescription: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  viewDetailsButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#6200EE",
    borderRadius: 25,
    alignItems: "center",
    elevation: 5,
  },
  viewDetailsText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#6200EE",
    padding: 15,
    justifyContent: "center",
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
    fontSize: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});



//uuuuu
export default Home;
