// app/_layout.js
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AuthProvider from './src/context/AuthProvider';
import AppBar from './src/Components/shared/appBar';
import { useContext } from 'react';
import { AuthContext } from './src/context/AuthContext';

// ---------------- Custom Drawer ----------------
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




      {/* ✅ Admin Drawer */}
      {user && user.userRole === 'Admin' && (
        <>
          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/admin/adminOverview')}>
            <Text style={styles.drawerText}>Admin Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/admin/manageUsers')}>
            <Text style={styles.drawerText}>Manage Users</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/admin/manageSession')}>
            <Text style={styles.drawerText}>Manage Sessions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/admin/manageMaterial')}>
            <Text style={styles.drawerText}>Manage Materials</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/admin/updateProfile')}>
            <Text style={styles.drawerText}>Update Profile</Text>
          </TouchableOpacity> */}
        </>
      )}

      {/* ✅ Tutor Drawer */}
      {user && user.userRole === 'Tutor' && (
        <>
          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/tutor/tutorOverview')}>
            <Text style={styles.drawerText}>Tutor Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/tutor/createSession')}>
            <Text style={styles.drawerText}>Create Session</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/tutor/mySession')}>
            <Text style={styles.drawerText}>My Sessions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/tutor/uploadMaterials')}>
            <Text style={styles.drawerText}>Upload Materials</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/tutor/viewMaterials')}>
            <Text style={styles.drawerText}>View Materials</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/tutorDashboard/updateProfile')}>
            <Text style={styles.drawerText}>Update Profile</Text>
          </TouchableOpacity> */}
        </>
      )}

      {/* ✅ Student Drawer */}
      {user && user.userRole === 'Student' && (
        <>
          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/student/studentOverview')}>
            <Text style={styles.drawerText}>Student Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/student/bookedSession')}>
            <Text style={styles.drawerText}>Booked Sessions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/student/createNote')}>
            <Text style={styles.drawerText}>Create Note</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/student/manageNotes')}>
            <Text style={styles.drawerText}>Manage Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/dashboard/student/studyMaterials')}>
            <Text style={styles.drawerText}>Study Materials</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/pages/studentDashboard/updateProfile')}>
            <Text style={styles.drawerText}>Update Profile</Text>
          </TouchableOpacity> */}
        </>
      )}

      {/* ✅ Common Logout Button */}
      {user && (
        <TouchableOpacity style={styles.drawerItem} onPress={signOutUser}>
          <Text style={[styles.drawerText, { color: 'red' }]}>Logout</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

// ---------------- Root Layout ----------------
export default function RootLayout() {
  // Force app to use light (white) theme
  const whiteTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF',
      card: '#FFFFFF',
      text: '#000000',
      border: '#E5E5E5',
      primary: '#1E40AF', // optional accent color
    },
  };

  return (
    <AuthProvider>
      <ThemeProvider value={whiteTheme}>
        <Drawer
          drawerContent={() => <CustomDrawer />}
          screenOptions={{
            header: () => <AppBar />,
            drawerStyle: {
              backgroundColor: '#FFFFFF',
            },
            drawerLabelStyle: {
              color: '#000000',
            },
          }}
        >
          <Drawer.Screen name="(tabs)" />
          <Drawer.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Drawer>
        <StatusBar style="dark" /> {/* Dark text on white background */}
      </ThemeProvider>
    </AuthProvider>
  );
}

// ---------------- Styles ----------------
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
