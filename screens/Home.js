import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CoursesAvailable from './CoursesAvailable';
import Dashboard from './CoursesEnrolled';
import Profile from './Profile';
import JoinClass from './JoinClass';
import CreateClass from './CreateClass';
import LoginPage from './Login/login';
import Logout from './logout';

// Main App component
export default function App() {
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  // Tab navigator component
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3C0A6B' }, // Style for the header
          headerTintColor: 'white', // Color for the header text
          tabBarActiveTintColor: 'white', // Color for the active tab
          tabBarActiveBackgroundColor: '#3C0A6B', // Background color for the active tab
        }}
      >
        <Tab.Screen
          name="Courses Enrolled"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" color={color} size={size} /> // Icon for the tab
            ),
            headerShown: false, // Hide the header
          }}
        />
        <Tab.Screen
          name="Courses Available"
          component={CoursesAvailable}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="reader-outline" color={color} size={size} /> // Icon for the tab
            ),
            headerShown: false, // Hide the header
          }}
        />
      </Tab.Navigator>
    );
  };

  // Drawer navigator component
  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3C0A6B' }, // Style for the header
          headerTintColor: 'white', // Color for the header text
          drawerActiveTintColor: "white", // Color for the active drawer item
          drawerInactiveTintColor: "Black", // Color for the inactive drawer items
          drawerActiveBackgroundColor: '#3C0A6B', // Background color for the active drawer item
          drawerStyle: {
            backgroundColor: '#D4BEE4', // Background color for the drawer
            width: 300, // Width of the drawer
          },
          drawerHideStatusBarOnOpen: true, // Hide the status bar when the drawer is open
          drawerLabelStyle: {
            fontSize: 15, // Font size for the drawer labels
          },
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={TabNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={25} color={color} /> // Icon for the drawer item
            ),
          }}
        />
        <Drawer.Screen
          name="Create Class"
          component={CreateClass}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="add-outline" size={25} color={color} /> // Icon for the drawer item
            ),
          }}
        />
        <Drawer.Screen
          name="Join Class"
          component={JoinClass}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="return-down-forward-outline" size={25} color={color} /> // Icon for the drawer item
            ),
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="log-out-outline" size={25} color={color} /> // Icon for the drawer item
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };

  // Logout component to clear AsyncStorage and navigate to login screen
  const Logout = ({ navigation }) => {
    useEffect(() => {
      const clearStorageAndLogout = async () => {
        try {
          await AsyncStorage.clear(); // Clear AsyncStorage
          Alert.alert("Logged out", "You have been logged out successfully."); // Show alert
          navigation.navigate("Login"); // Navigate to the login screen
        } catch (error) {
          console.error('Error clearing AsyncStorage:', error); // Log error
        }
      };

      clearStorageAndLogout();
    }, []);

    return null;
  };

  return (
    <>
      <StatusBar style="light" /> {/* Set the status bar style */}
      <NavigationContainer>
        <DrawerNavigator /> {/* Render the drawer navigator */}
      </NavigationContainer>
    </>
  );
}