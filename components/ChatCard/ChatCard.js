import React from 'react'
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'

const ChatCard = ({handleStartChat,user,index}) => {
  return (
    <View key={index} style={styles.chatCard}>
    <View style={styles.cardDataMain}>
        <Text style={styles.name}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
    </View>
    <TouchableOpacity style={styles.btn}
    onPress={()=>handleStartChat(user.email,user.username)}
    >
    <Text style={styles.chatTxt}>CHAT</Text>
    </TouchableOpacity>
</View>
  )
}

export default ChatCard


const styles = StyleSheet.create({
    chatCard:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:wp(96),
        marginLeft:wp(2),
        paddingVertical:hp(1),
        paddingHorizontal:hp(1),
        justifyContent:'space-between',
        borderColor:'#333333',
        borderWidth:0.5,
        borderRadius:20,
        marginTop:hp(2)
    },
    cardDataMain:{
        paddingVertical:hp(0.5)
    },
    email:{
    fontSize:14,
    fontWeight:500            
    },
    name:{
        fontSize:18,
        fontWeight:500            
        },    
    btn:{
        borderRadius:50,
        backgroundColor:'brown',
        paddingHorizontal:wp(4),
        paddingVertical:hp(1)
    },
    chatTxt:{
        color:'#fff'
    }
})