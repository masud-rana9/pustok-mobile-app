import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Simple form validation
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Email is required");
      return;
    }

    if (!message.trim()) {
      Alert.alert("Error", "Message is required");
      return;
    }

    // Log the contact form data (this could be replaced with actual submission logic)
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    Alert.alert("Thank you!", "Your message has been sent.");

    // Clear the form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ImageBackground
      source={{ uri: "https://your-background-image-url.com" }} // Replace with your image URL
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Contact Us</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.textArea}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline={true}
          numberOfLines={4}
        />

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#841584" />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    resizeMode: "cover", // Cover the entire area
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with transparency
    borderRadius: 10,
  },
  header: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Dark text color for better contrast
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    textAlignVertical: "top", // To make multiline start from top
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden", // Make sure the button is within rounded corners
  },
});

export default Contact;
