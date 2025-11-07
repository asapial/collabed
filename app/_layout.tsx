// app/_layout.js
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AuthProvider from './src/context/AuthProvider';
import AppBar from './src/Components/shared/appBar';
import { useContext } from 'react';
import { AuthContext } from './src/context/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Custom Drawer component that consumes context safely
function CustomDrawer() {
  const { user, signOutUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CollabEd</Text>

      <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/')}>
        <Text style={styles.drawerText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/unauthorized/sessionList')}>
        <Text style={styles.drawerText}>Session List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/unauthorized/tutorlist')}>
        <Text style={styles.drawerText}>Tutor List</Text>
      </TouchableOpacity>

      {user && (
        <TouchableOpacity style={styles.drawerItem} onPress={signOutUser}>
          <Text style={styles.drawerText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ✅ Wrap the whole navigation tree inside AuthProvider
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
        <Drawer
          drawerContent={() => <CustomDrawer />}
          screenOptions={{
            header: () => <AppBar />,
          }}
        >
          <Drawer.Screen name="(tabs)" />
          <Drawer.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000000',
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
  },
  drawerText: {
    fontSize: 18,
    color: '#000000',
  },
});
