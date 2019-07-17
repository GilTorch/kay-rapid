import React from 'react';
import { Container, Text, Button, Icon } from 'native-base';
import { View, Image, Alert } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

const style = {
    container: {
        flex: 1,
    },
    arrowBackContainer: {
        flex: 1
    },
    view: {
        flex: 7,
        flexDirection: 'column',
        paddingTop: 50,
        justifyContent: "space-between",
        alignItems: "center"
    },
    illustrationContainer: {
        // flex: 1,
        // backgroundColor: 'red'
    },
    allButtonsContainer: {
        // backgroundColor: 'red',
        // flex: 1,
        marginTop: 10,
        alignItems: 'center',
        padding: 10
    },
    facebookConnectButtonContainer: {
        // flex: 1,
        height: 80,
        flexDirection: 'row'
    },
    facebookConnectButton: {
        flex: 1,
        height: 70,
        backgroundColor: "#3b5998",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        text: {
            color: "white"
        }
    },
    accountCreationAndLoginContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    loginButton: {
        flex: 1,
        height: 60,
        borderColor: "#ccc",
        backgroundColor: '#fff',
        elevation: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
    },
    createAccountButton: {
        flex: 1,
        height: 60,
        backgroundColor: '#fff',
        elevation: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

class SignInMethods extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={style.container}>
                <View style={style.arrowBackContainer}>
                    <Button style={style.button} onPress={() => navigate('Home')} transparent>
                        <Icon name="arrow-back" />
                    </Button>
                </View>
                <View style={style.view}>
                    <View style={style.illustrationContainer}>
                        <Image source={require('../images/illustration.png')} />
                    </View>
                    <View style={style.allButtonsContainer}>
                        <View style={style.facebookConnectButtonContainer}>
                            <Button style={style.facebookConnectButton} onPress={() => console.log}>
                                <Icon name="facebook" type="FontAwesome" style={style.facebookConnectButton.text} />
                                <Text style={style.facebookConnectButton.text}>
                                    KONEKTE PA FACEBOOK
                           </Text>
                            </Button>
                        </View>
                        <LoginButton
                            onLoginFinished={(error, data) => {
                                Alert.alert(JSON.stringify(error || data, null, 2));
                            }}
                        />
                        <View style={style.accountCreationAndLoginContainer}>
                            <Button onPress={() => navigate('SignIn')} style={style.loginButton}>
                                <Text style={{ color: "black" }} >
                                    MWEN GEN ON KONT
                                </Text>
                            </Button>
                            <Button onPress={() => navigate('SignUp')} style={style.createAccountButton}>
                                <Text style={{ color: "black" }}>
                                    KREYE YON KONT
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}


export default SignInMethods;