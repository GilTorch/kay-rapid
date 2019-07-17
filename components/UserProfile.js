import React from 'react';
import { View, Image } from 'react-native';
import { Button, Text, Content, Card, CardItem } from 'native-base';
import { Mutation } from 'react-apollo';
import { WRITE_AUTH_INFO } from '../queries/queries';
import NegreMarronImage from '../images/negre-marron.jpg';

const userObject = {
    userAuthInfo: {
        __typename: 'UserAuthInfo',
        id: null,
        token: null,
        email: null,
        firstName: null,
        lastName: null,
        profilePicture: null,
    }
}

const style = {
    container: {
        flex: 1
    },
    profilePicture: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: "#aaa",
        borderRadius: 240,
        width: 120,
        height: 120,
        marginBottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infos: { justifyContent: 'center', alignItems: 'center', name: { fontWeight: 'bold' } }
}


export default UserInfo = ({ user }) => {

    return (
        <Mutation mutation={WRITE_AUTH_INFO} variables={userObject}>
            {(logout, { loading, error }) => (

                <View style={style.container}>
                    {error && ToastAndroid.show(`${error}`, ToastAndroid.SHORT)}
                    <Card>
                        <View style={style.infos}>
                            <CardItem>
                                <Image source={user.profilePicture===null ? NegreMarronImage : {uri:user.profilePicture}} style={style.profilePicture} />
                            </CardItem>
                            <CardItem>
                                <Text style={style.infos.name}>
                                    {user.firstName} {user.lastName}
                                </Text>
                            </CardItem>
                        </View>
                        <CardItem>
                            <Content>
                                <Button onPress={() => logout()} disabled={loading} light={loading} block danger>
                                    <Text>
                                        Dekonekte
                                    </Text>
                                </Button>
                            </Content>
                        </CardItem>
                    </Card>
                </View>
            )}
        </Mutation>
    )
}

