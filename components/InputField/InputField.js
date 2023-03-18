import React from 'react'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {View,Text,TextInput,StyleSheet} from 'react-native'

const InputField = ({secureTextEntry,value,focusHandler,changeState,placeholder,keyboardType,focusState}) => {
  return (
    <View style={{...styles.inputContainer,borderColor: focusState ? 'brown' : '#AFAFAF',
    borderWidth: focusState ? 1 : 0.5}}>
    <View style={{ width: '85%' }}>
        <TextInput  
        value={value} 
        onFocus={()=>focusHandler(true)}
        onBlur={()=>focusHandler(false)}
        onChangeText={text => {
            changeState(text)
        }} 
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.inputField}
        placeholder={placeholder}
        />
    </View>
</View>
)
}

export default InputField


const styles = StyleSheet.create({
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#AFAFAF',
        marginTop: hp(3),
        width: '94%',
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 45
    },
    inputField:{
        width: '80%',
        alignSelf: 'center'
    }
})