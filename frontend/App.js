
import { StyleSheet, View } from 'react-native';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import ActionPage from '@pages/ActionPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name='Login'
          component={LoginPage}/>
        <Stack.Screen 
          name='SignUp'
          component={SignupPage}/>
        <Stack.Screen 
          name='Actions'
          component={ActionPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});
