
import { StyleSheet, View } from 'react-native';
import LoginPage from '@pages/LoginPage';

export default function App() {
  return (
    <View style={styles.root}>
      <LoginPage />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});
