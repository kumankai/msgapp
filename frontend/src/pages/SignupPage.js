import { StyleSheet, View, Text, TextInput, Pressable, Keyboard } from "react-native";
import { useState } from "react";

export default function LoginPage({ navigation }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [vpass, setVPass] = useState("");
    
    return (
        <Pressable style={styles.signupContainer} onPress={() => Keyboard.dismiss()}>
            <View style={styles.inputContainer}>
                <View>
                    <Text style={[styles.subtitle, styles.whiteText]}>Create username</Text>
                    <TextInput 
                        placeholder='Username' 
                        placeholderTextColor='#D9D9D9' 
                        style={styles.input}
                        value={username} onChangeText={text => setUsername(text)}/>
                    <Text style={[styles.inputInfoText, styles.whiteText]}>{"\u2022"} Must be less than 25 characters</Text>
                </View>
                <View style={{rowGap: 20}}>
                    <View>
                        <Text style={[styles.subtitle, styles.whiteText]}>Create password</Text>
                        <TextInput 
                            placeholder='Password' 
                            placeholderTextColor='#D9D9D9' 
                            style={styles.input}
                            value={password} onChangeText={text => setPassword(text)}/>
                    </View>
                    <View>
                        <Text style={[styles.subtitle, styles.whiteText]}>Verify password</Text>
                        <TextInput 
                            placeholder='Verify Password' 
                            placeholderTextColor='#D9D9D9' 
                            style={styles.input}
                            value={vpass} onChangeText={text => setVPass(text)}/>
                        {password != vpass  && <Text style={[styles.inputInfoText, {color: "red", opacity: 1}]}>{"\u2022"} mis-matched passwords</Text>}
                    </View>
                    <Pressable style={styles.signupBtn} onPress={() => navigation.navigate('Actions')}>
                        <Text style={styles.signupBtnTxt}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
        )
}

const styles = StyleSheet.create({
    signupBtnTxt: {
        color: "#141516",
        fontWeight: "bold",
        fontSize: 14
    },
    signupBtn: {
        marginTop: 20,
        alignSelf: "flex-start",
        borderRadius: 12,
        padding: 10,
        backgroundColor: "#d9d9d9"
    },
    inputContainer: {
        flexDirection: "column",
        marginHorizontal: '10%',
        rowGap: 30
    },
    input: {
        color: "white",
        borderColor: '#D9D9D9',
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        marginVertical: 5,
        fontSize: 20
    },
    inputInfoText: {
        fontSize: 15,
        opacity: 0.5,
        margin: 5
    },
    whiteText: {
        color: "white",
    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 25
    },
    signupContainer: {
        backgroundColor: '#141516',
        flex: 1,
        justifyContent: 'center',
    }
});