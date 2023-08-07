import { StyleSheet, View, Text, TextInput } from "react-native";

export default function LoginPage(){
    return (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>Login</Text>
        <TextInput placeholder='Username' placeholderTextColor='#D9D9D9' style={styles.input}/>
        <TextInput placeholder='Password' placeholderTextColor='#D9D9D9' style={styles.input}/>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
      backgroundColor: '#141516',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputContainer: {
      width: '100%',
      height: 250,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    input: {
      borderColor: '#D9D9D9',
      borderWidth: 1,
      padding: 8,
      borderRadius: 8,
      marginVertical: 5,
      marginHorizontal: '10%',
      fontSize: 20,
    },
    titleText: {
      color: 'white',
      fontSize: 35,
      fontWeight: 'bold',
      marginHorizontal: '10%',
      marginBottom: 15
    }
  });