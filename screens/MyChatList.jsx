import React, {  useState,useCallback } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { View,Text,Alert,StyleSheet,ScrollView, TouchableOpacity } from 'react-native'
import { handleGetApi} from '../utils/apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';
import ChatCard from './../components/ChatCard/ChatCard.js';

const MyChatList = ({navigation}) => {

    const [users,setUsers] = useState([])

    useFocusEffect(
        useCallback(() => {
        getUsers()
        },[])
    )

    const getUsers = async ()=>{

        var email = await AsyncStorage.getItem('email');
        if(!email){
            return;
        }
        var response = await handleGetApi('user/getAllUsers');
        if(response?.status=='Error'){
            Alert.alert(response?.message)
        }else if(response?.message=='Success'){
            setUsers(()=>response?.doc?.users.filter((user)=>user.email!=email) );
        }else if(response?.message=='Failed'){
            Alert.alert(response?.doc)
        }
    }

    const handleStartChat =async(useremail,username)=>{
        var myEmail = await AsyncStorage.getItem('email')
        navigation.navigate("chatPage",{
            user1 : useremail,
            user2:  myEmail,
            username
        })

    }

    const handleLogout =async()=>{
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('username');
        navigation.navigate('/')
    }

    return (
        <>

<View style={styles.tileDiv}>
    <Text style={styles.username}>USERS TO CHAT</Text>
</View>
<View style={styles.logoutDiv}>
            <TouchableOpacity style={styles.logoutBtn}
            onPress={handleLogout}
            >
                <Text style={styles.logoutTxt}>Logout</Text>
            </TouchableOpacity>
        </View>
    <ScrollView style={styles.chatListParent}>
        {
            users.map((user,index)=>(
                <ChatCard index={index} user={user} handleStartChat={handleStartChat} />
            ))
        }

    </ScrollView>
    </>
    )
}

export default MyChatList

const styles = StyleSheet.create({
    chatListParent:{
        marginTop:hp(0)
    },
    logoutDiv:{
        width:wp(96),
        marginLeft:wp(2),
        height:hp(7),
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        paddingRight:wp(3),
    },
    logoutBtn:{
        backgroundColor:'red',
        borderRadius:50,
        paddingVertical:hp(1),
        paddingHorizontal:hp(2),
    },
    logoutTxt:{
        color:'#fff'
    },
    tileDiv:{
        width:wp(94),
        marginLeft:wp(3),
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:hp(7)
    },
    username:{
        color:'#000000',
        fontSize:wp(6),
        fontWeight:600,
        textDecorationLine:'underline'
    },
})