import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation, setIsOnboarded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const loadProfileData = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPhone = await AsyncStorage.getItem('phone');
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
    };
    loadProfileData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('phone', phone);
      alert('Changes saved successfully!');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.clear();
      setIsOnboarded(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Image source={{ uri: 'https://githubusercontent.com' }} style={styles.logo} resizeMode="contain" />
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Personal Information</Text>
        <Image source={{ uri: 'https://unsplash.com' }} style={styles.avatarBig} />

        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="(XXX) XXX-XXXX" keyboardType="phone-pad" />

        <Pressable style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={handleLogOut}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 60, borderBottomWidth: 1, borderColor: '#EDEFEE' },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  backText: { fontSize: 24, fontWeight: 'bold', color: '#495E57' },
  logo: { width: 150, height: 40 },
  scrollContainer: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#495E57' },
  avatarBig: { width: 100, height: 100, borderRadius: 50, marginBottom: 20, alignSelf: 'center' },
  label: { fontSize: 14, color: '#495E57', fontWeight: 'bold', marginBottom: 5 },
  input: { backgroundColor: '#FFFFFF', borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 20 },
  saveButton: { backgroundColor: '#495E57', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  logoutButton: { backgroundColor: '#F4CE14', padding: 15, borderRadius: 8, alignItems: 'center' },
  logoutButtonText: { color: '#495E57', fontSize: 16, fontWeight: 'bold' },
});
