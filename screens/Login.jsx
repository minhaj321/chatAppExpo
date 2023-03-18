import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useState } from 'react'
import { View, Text, TextInput, Pressable, ActivityIndicator,Alert,StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { handlePostApi } from '../utils/apis'
import { useNavigation } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import InputField from './../components/InputField/InputField.js';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const navigate = useNavigation();

    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    
    useFocusEffect(
        useCallback(() => {
        checkLogin()
    },[])
    )

    const checkLogin = async ()=>{
        var islogged = await AsyncStorage.getItem('email') ? true : false;
        if(islogged){
            navigation.navigate('myChatList')
        }
    }

    const handleLogin = async() => {
        setLoading(true)
        try{
            if (validateEmail(email) === false){
                Alert.alert('Invalid Email')
            }else if(password.length<8){
                Alert.alert('Password Should contain atleast 8 characters.')
            }else{
                // api calling
                var response = await handlePostApi('user/login',{
                    email,password
                })
                if(response?.status=='Error'){
                    Alert.alert(response?.message)
                }else if(response?.message=='Success'){
                    await AsyncStorage.setItem('email',response?.doc?.email)
                    await AsyncStorage.setItem('username',response?.doc?.username)
                    navigation.navigate('myChatList')
                    setLoading(false)
                }else if(response?.message=='Failed'){
                    Alert.alert(response?.doc)
                    setLoading(false)
                }
            }

        }catch(err){
            Alert.alert(err.message)
            setLoading(false)
        }

    }

    return (

        <View style={styles.loginContainer}>

            <Text style={styles.loginTitle}>LOGIN</Text>

            <View style={{ width: '100%' }}>


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
                    handleLogin()

                }}>
                    {loading === false && <Text style={styles.btnTxt}>LOGIN</Text>}
                    {loading === true && <ActivityIndicator size={'large'} />}
                </Pressable>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center',marginTop:hp(2) }}>
                <Text style={{ color: '#333333' }}>Don't have an account?</Text>
                <Pressable onPress={() => {
                        navigation.navigate('register')
                }
                }>
                    <Text style={{ color: '#97a0c7', fontWeight: '600' }}> Sign up</Text>
                </Pressable>
            </View>

        </View>

    )
}

export default Login


const styles = StyleSheet.create({
    loginContainer:{
        backgroundColor: 'white',
        height: '100%',
        display:'flex',
        justifyContent:'center'
    },
    loginTitle:{
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