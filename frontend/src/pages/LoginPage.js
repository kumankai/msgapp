import { StyleSheet, View, Text, TextInput, Pressable, Keyboard } from "react-native";

export default function LoginPage({ navigation }){
  return (
    <Pressable style={styles.loginContainer} onPress={() => Keyboard.dismiss()}>
        <Text style={{color: "white", fontSize: 40, fontWeight:"bold", position: "absolute", top: 150}}>{"<"}Logo{">"}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.titleText}>Login</Text>
          <TextInput placeholder='Username' placeholderTextColor='#D9D9D9' style={styles.input}/>
          <TextInput placeholder='Password' placeholderTextColor='#D9D9D9' style={styles.input}/>
          <View style={styles.loginBtnCtn}>
            <Pressable style={styles.loginBtn}>
              <Text style={styles.loginBtnTxt}>Login</Text>
            </Pressable>
            <View style={{alignItems: "flex-end"}}>
              <Text style={{fontWeight: "bold", color: "#d9d9d9" }}>
                Don't have an account?
              </Text>
              <Pressable style={styles.signupBtn} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupBtnTxt}>
                  sign up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
    </Pressable>
    )
}

const styles = StyleSheet.create({
  signupBtnTxt: { 
    textDecorationLine: "underline",
    color: "#94D8FF"
  },
  loginBtnTxt: {
    color: "#141516",
    fontWeight: "bold",
    fontSize: 14
  },
  loginBtn: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#d9d9d9",
  },
  loginBtnCtn: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "10%"
  },
  loginContainer: {
    backgroundColor: '#141516',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    position: "relative",
    width: '100%',
    height: 250,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    color: "white",
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