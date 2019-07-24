import React from 'react';
import { Button,Text,Icon } from 'native-base';
import { LoginManager,AccessToken } from 'react-native-fbsdk';

style={
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
    }
}

class FacebookLogin extends React.Component {

    handleLogin = async () => {
        console.log("HELLO FACEBOOK LOGIn")
        try {
            const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email'
            ]);

            if(result.isCancelled){
                throw new Error('User cancelled request');
            }

            console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

            const data = await AccessToken.getCurrentAccessToken();

            if(!data){
                throw new Error("Something went wrong obtaining he users access token");
            }

            console.log(data)

        }catch(e){
            console.error(e);
        }
    }

    render() {
        return (
            <Button style={style.facebookConnectButton} onPress={() => this.handleLogin()}>
                <Icon name="facebook" type="FontAwesome" style={style.facebookConnectButton.text} />
                <Text style={style.facebookConnectButton.text}>
                    KONEKTE PA FACEBOOK
                </Text>
            </Button >
        )
    }
}

export default FacebookLogin;