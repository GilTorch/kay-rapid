import React from 'react';
import { Card, CardItem, Body, Text } from 'native-base';

const style = {
    card: { width: 200 },
    cardItemTitle: {
        fontFamily: 'EncodeSansCondensed-Black',
        // textAlign: "center",
    },
    text: {
        fontFamily: 'EncodeSansCondensed-Light',
    }
}



const RecentlyAdded = ({ name }) => (
    <Card style={style.card}>
        <CardItem header>
            <Text style={style.cardItemTitle} >{name.toUpperCase()}</Text>
        </CardItem>
        <CardItem>
            <Body>
                <Text style={style.text}>
                    10 kay a lwe Delma 33
                    6 kay a lwe Delma 46
                    5 kay a lwe Delma 20
                    4 kay a lwe Delma 17
                </Text>
            </Body>
        </CardItem>
    </Card>
)

export default RecentlyAdded;