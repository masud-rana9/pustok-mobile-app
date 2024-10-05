// About.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Page Header */}
      <View style={styles.header}>
        <Text style={styles.title}>About Our Project</Text>
      </View>

      {/* Team Members Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Team Members</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            Md Masud Rana (19CSE045) - Team Leader
          </Text>
          <Text style={styles.text}>
            Shahed Parvez Siam (19CSE028) - Team Member
          </Text>
          <Text style={styles.text}>Golam Rabbi (19CSE048) - Team Member</Text>
          <Text style={styles.text}>Neamul Haq (19CSE034) - Team Member</Text>
        </View>
      </View>

      {/* Mission Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Our Mission</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            Our mission is to develop a user-friendly and efficient mobile
            application that solves real-world problems. We aim to integrate
            cutting-edge technologies to provide a seamless experience for our
            users.
          </Text>
        </View>
      </View>

      {/* Vision Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Our Vision</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            We envision creating innovative solutions that improve everyday
            life, making technology accessible to everyone. Our goal is to
            continue growing as developers and contribute to the future of
            mobile computing.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Styling for the About Page
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F0F4FF", // Light background color
  },
  header: {
    backgroundColor: "#4A90E2", // Blue background for the header
    paddingVertical: 30,
    marginBottom: 30,
    borderRadius: 10,
    alignItems: "center", // Centers the title
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center", // Center the text inside the card
  },
});

export default About;
