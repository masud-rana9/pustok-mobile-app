import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/home/Home"; // Ensure correct path
import Login from "./components/login/Login"; // Ensure correct path
import Registration from "./components/registration/Registration"; // Ensure correct path
import Contact from "./components/contact/Contact"; // Ensure correct path
import AuthProvider from "./components/firebase/Authprovider/AuthProvider";
import About from "./components/about/About";
import ProductDetails from "./components/details/ProductDetails";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ title: "Book Details" }}
          />
          <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
