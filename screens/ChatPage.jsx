import React, { useCallback, useRef, useState } from 'react'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {View,Text,StyleSheet,Alert,TextInput,TouchableOpacity, ScrollView,StatusBar,KeyboardAvoidingView} from 'react-native' 
import { useFocusEffect } from '@react-navigation/native';
import { handlePostApi } from '../utils/apis';
import { io } from "socket.io-client";
import { base_api_url } from '../const';


const ChatPage = ({route}) => {


    const socket = io(base_api_url);
    const inputRef = useRef();
    const [chats,setChats] = useState([])
    const {user1,user2,username} = route.params;
    const [roomId,setRoomId] = useState('');
    const [message,setMessage] = useState('');

useFocusEffect(
    useCallback(()=>{
    getRoomId()
    socket.on('sendMessages',(payload)=>{
        setChats(payload)
    })
    },[])
)

const getRoomId = async()=>{
    var response = await handlePostApi('chat/getRoomChats',{
        user1,
        user2
    })
    if(response?.status=='Error'){
        Alert.alert(response?.message)
    }else if(response?.message=='Success'){
        // success
        setChats(response?.doc?.chats);
        setRoomId(response?.doc?.roomData?.roomId)
        socket.emit('joinroom',{roomId:response?.doc?.roomData?.roomId})

    }else if(response?.message=='Failed'){
        Alert.alert(response?.doc)
    }
}

const sendMessage =()=>{

    if(message==''){
        Alert.alert('Enter Message First')
        return
    }
    socket.emit('sendMsg',{
        msg:message,
        sender:user2,
        roomId
    })
    setMessage('')
    inputRef.current.blur()

}

  return (
    <View style={styles.container}>
<StatusBar backgroundColor={'#000000'} />
<View style={styles.tileDiv}>
    <Text style={styles.username}>{username} </Text>
    <Text style={styles.useremail}> ({user1})</Text>
</View>
<KeyboardAvoidingView
 behavior={'position'}
 keyboardVerticalOffset={20}
 >

<View style={styles.msgsMainDiv}>
    <ScrollView style={styles.scrollView}>
{
    chats.map((chat,index)=>(
        <View key={index}
        style={chat.sender==user2 ? styles.ownMsg : styles.othersMsg}>
            <Text style={chat.sender==user2 ? styles.msg : styles.msg2}>{chat.msg}</Text>
            </View>
    ))
}
    </ScrollView>
</View>

<View style={styles.formView}>
    <TextInput style={styles.input} 
    placeholder='Message'
    value={message}
    ref={inputRef}
    onChangeText={txt=>setMessage(txt)}
    />

    <TouchableOpacity style={styles.sendBtn}
    onPress={sendMessage}
    >
        <Text style={styles.sendTxt}>Send</Text>
    </TouchableOpacity>
</View>
</KeyboardAvoidingView>

    </View>
    )
}


const styles = StyleSheet.create({
    container:{
        height:'100%',
    },
    msg:{
        backgroundColor:'blue',
        color:'#fff',
        paddingVertical:hp(0.7),
        paddingHorizontal:hp(1.5),
        borderRadius:50
    },
    msg2:{
        backgroundColor:'#afafaf',
        paddingVertical:hp(0.7),
        paddingHorizontal:hp(1.5),
        borderRadius:50

    },
    ownMsg:{
        display:'flex',
        height:hp(5),
        marginVertical:hp(0.5),
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:10,
        width:'auto'
    },
    othersMsg:{
        display:'flex',
        height:hp(5),
        marginVertical:hp(0.5),
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:10,
        width:'auto',
    },
    input:{
        width:'70%',
        // borderWidth:1,
        paddingLeft:wp(3),
        borderColor:'#333333',
        borderRadius:10,
        borderBottomWidth:1,
        height:'50%'
    },
    sendBtn:{
        width:'25%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000000',
        height:'50%',
        borderRadius:50
    },
    sendTxt:{
        color:'#fff'
    },
    formView:{
        height:hp(10),
        width:wp(94),
        marginLeft:wp(3),
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    scrollView:{
        height:'100%',
        width:'100%',
        borderWidth:1
    },
    msgsMainDiv:{
        height:hp(80),
        width:wp(94),
        marginLeft:wp(3)
    },
    tileDiv:{
        height:hp(7),
        width:wp(94),
        marginLeft:wp(3),
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'#333333',
        paddingLeft:wp(3)
    },
    username:{
        color:'#fff',
        fontSize:wp(5)
    },
    useremail:{
        color:'#fff',
        fontSize:wp(4),
    }

})
export default ChatPage
