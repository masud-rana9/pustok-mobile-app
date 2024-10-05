import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../firebase/Authprovider/AuthProvider";

const Login = ({ navigation }) => {
  const { signIn, googleSignIn } = useContext(AuthContext); // Assuming googleSignIn is part of AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and Password are required");
      return;
    }

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Login Failed", "Invalid credentials. Please try again.");
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigation.navigate("Home");
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Google Login Failed", "Something went wrong. Try again.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.slogan}>PUSTOK</Text>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
      </View>

      {/* Google Login Button */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <Image
          source={require("../../assets/image.png")} // Assuming you have a google-icon.png in assets
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      {/* Go to Registration Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Do not have an account?"
          onPress={() => navigation.navigate("Registration")}
          color="gray"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  slogan: {
    fontSize: 32,
    color: "#6200EE",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#757575",
    fontWeight: "bold",
  },
});

export default Login;
