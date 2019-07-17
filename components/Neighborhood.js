import React from 'react';
import { Card, CardItem, Body, Text } from 'native-base';

const style = {
    card: { width: 200 },
}



const Neighborhood = ({ name }) => (
    <Card style={style.card}>
        <CardItem header>
            <Text style={{fontWeight:'bold'}}>{name.toUpperCase()}</Text>
        </CardItem>
        <CardItem>
            <Body>
                <Text>
                    10 kay a lwe Delma 33
                    6 kay a lwe Delma 46
                    5 kay a lwe Delma 20
                    4 kay a lwe Delma 17
                </Text>
            </Body>
        </CardItem>
    </Card>
)

export default Neighborhood;