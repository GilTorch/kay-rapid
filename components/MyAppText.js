import React from 'react';
import { Text } from 'react-native';

const style = {
    main: {
        fontFamily: 'EncodeSansCondensed-Regular',
    },
    header: {
        fontFamily: 'EncodeSansCondensed-Bold',
    }
}

const MainText = props => (
    <Text style={style.main}>
        {props.children}
    </Text>
)

const HeaderText = props => (
    <Text style={style.header}>
        {props.children}
    </Text>
)

export { MainText, HeaderText };