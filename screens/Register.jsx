import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ActivityIndicator,Alert,StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { handlePostApi } from '../utils/apis'
import InputField from './../components/InputField/InputField.js';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Register = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [loading, setLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);


    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleRegister =async () => {
        setLoading(true)
        try{
            if (username.length == 0){
                Alert.alert('Please Enter User Name')
            }else if (validateEmail(email) === false){
                Alert.alert('Invalid Email')
            }else if(password.length<8){
                Alert.alert('Password Should contain atleast 8 characters.')
            }else{

                // api calling
                var response = await handlePostApi('user/register',{
                    username,email,password
                })
                if(response?.status=='Error'){
                    setLoading(false)
                    Alert.alert(response?.message)
                }else if(response?.message=='Success'){
                    await AsyncStorage.setItem('email',response?.doc?.email)
                    await AsyncStorage.setItem('username',response?.doc?.username)
                    navigation.navigate('myChatList')
                    setLoading(false)

                }else if(response?.message=='Failed'){
                    setLoading(false)
                    Alert.alert(response?.doc)
                }

            }

        }catch(err){
            Alert.alert(err.message)
            setLoading(false)
        }

    }

    return (

        <View style={styles.registerContainer}>
            <Text style={styles.registerTitle}>REGISTER</Text>
            <View style={{ width: '100%' }}>
            <InputField
            value={username}
            changeState={setUserName}
            focusHandler={setNameFocused}
            focusState={nameFocused}
            placeholder='User Name'
            keyboardType={'default'}
             />
            <InputField
            value={email}
            changeState={setEmail}
            focusHandler={setEmailFocused}
            focusState={emailFocused}
            placeholder='Email'
            keyboardType={'email-address'}
             />
            <InputField
            value={password}
            changeState={setPassword}
            focusHandler={setPasswordFocused}
            focusState={passwordFocused}
            placeholder='Password'
            secureTextEntry={true}
            keyboardType={'default'}
             />
            </View>

            <View style={styles.btn}>
                <Pressable disabled={loading} style={{ width: '100%' }} onPress={() => {
                    handleRegister()

                }}>
                    {loading === false && <Text style={styles.btnTxt}>SIGNUP</Text>}
                    {loading === true && <ActivityIndicator size={'large'} />}
                </Pressable>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center',marginTop:hp(2) }}>
                <Text style={{ color: '#333333' }}>Already have an account?</Text>
                <Pressable onPress={() => {
                        navigation.navigate('/')
                }
                }>
                    <Text style={{ color: '#97a0c7', fontWeight: '600' }}>Login</Text>
                </Pressable>
            </View>

        </View>

    )
}

export default Register

const styles = StyleSheet.create({
    registerContainer:{
        backgroundColor: 'white',
        height: '100%',
        display:'flex',
        justifyContent:'center'
    },
    registerTitle:{
        textAlign: 'center',
        fontWeight: '700',
        color: '#333333',
        fontSize: wp(5),
        marginTop: hp(3) 
    },
    btn:{ 
        backgroundColor: 'brown',
        width: wp(55),
        alignSelf: 'center',
        marginTop: hp(4),
        borderRadius: 50 
    },
    btnTxt:{
        color: '#fff', 
        textAlign: 'center', 
        fontSize: wp(5),
        paddingVertical: hp(1.6)
    }
})