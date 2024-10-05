import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../firebase/Authprovider/AuthProvider";

const Registration = ({ navigation }) => {
  const { createUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Error", "Password is required");
      return;
    } else if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    // Create user
    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        // Reset form fields after successful registration
        setName("");
        setEmail("");
        setPassword("");

        // Redirect to Home page after successful registration
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Registration Failed",
          "An error occurred during registration. Please try again."
        );
      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Register</Text>
      </View>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

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

      {/* Register Button */}
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
      </View>

      {/* Go to Login Button */}
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
          color="gray"
        />
      </View> */}
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
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 10,
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
});

export default Registration;
