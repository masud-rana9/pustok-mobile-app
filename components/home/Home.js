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
} from "react-native";
import { AuthContext } from "../firebase/Authprovider/AuthProvider";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
  };

  const handleOutsidePress = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

        <View style={styles.content}>
          <Text style={styles.heading}>All Books</Text>
          <FlatList
            data={products}
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
    overflow: "visible", // Ensure parent container doesn't clip
  },
  navbar: {
    backgroundColor: "#6200EE",
    padding: 20,
    paddingTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000, // Ensure navbar is above other content
    position: "relative", // For zIndex to work
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
    zIndex: 2000,
  },
  dropdownItem: {
    fontSize: 16,
    padding: 10,
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#6200EE",
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  logoutText: {
    color: "white",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: "visible", // Ensure no clipping
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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
    backgroundColor: "#FFFFE0", // Highlighted background color
    padding: 5,
    borderRadius: 5,
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
    borderRadius: 25, // Rounded button
    alignItems: "center",
    elevation: 5, // Raised button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  viewDetailsText: {
    color: "white",
    fontSize: 16, // Larger font size for visibility
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
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
});

export default Home;
