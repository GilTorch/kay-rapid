import React from 'react';
import { TouchableNativeFeedback,View } from 'react-native';
import { Icon, Text } from 'native-base';

const style={
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{color:'#777',fontFamily:'EncodeSansCondensed-Regular'},
    iconHighLighted:{color:"#ff9900",fontFamily:'EncodeSansCondensed-Regular'}
}

const NavButtons = ({ navigate,name,iconName,highLighted }) => {

    const iconStyle = highLighted ? style.iconHighLighted : style.icon;

    return <TouchableNativeFeedback onPress={navigate}>
        <View style={style.container}>
            <Icon name={iconName} style={iconStyle} />
            <Text style={iconStyle}>{name}</Text>
        </View>
    </TouchableNativeFeedback>
}


export default NavButtons;