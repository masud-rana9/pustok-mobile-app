import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { AuthContext } from "../firebase/Authprovider/AuthProvider";

const Profile = ({ navigation }) => {
  const { user, logOut } = useContext(AuthContext);

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleLogout = () => {
    logOut();
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        {/* User Profile Image */}
        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require("../../assets/user-profile-icon-free-vector.jpg")
          }
          style={styles.profileImage}
        />

        {/* User Name and Email */}
        <Text style={styles.userName}>
          {user?.displayName || "Md Masud Rana"}
        </Text>
        <Text style={styles.userEmail}>
          {user?.email || "john.doe@example.com"}
        </Text>

        {/* Other Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.otherInfo}>
            Joined on: {user?.createdAt || "January 1, 2023"}
          </Text>
          <Text style={styles.otherInfo}>
            Phone: {user?.phoneNumber || "Not available"}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={handleEditProfile}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    padding: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#6200EE",
    marginBottom: 15,
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#888",
    marginBottom: 15,
  },
  infoContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
  },
  otherInfo: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  editProfileButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "80%",
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Profile;
