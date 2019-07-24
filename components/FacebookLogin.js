import React from 'react';
import { Button, Text, Icon, Spinner } from 'native-base';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Mutation } from 'react-apollo';
import { graphql, compose } from 'react-apollo';
import { FB_LOGIN, WRITE_AUTH_INFO } from '../queries/queries';

style = {
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

    state = {
        disabled: false
    }

    handleLogin = async (fbLogin) => {
        const { saveToCache,navigate } = this.props;

        this.setState({
            disabled: true
        })

        try {
            const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email'
            ]);

            if (result.isCancelled) {
                throw new Error('User cancelled request');
            }

            console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

            const data = await AccessToken.getCurrentAccessToken();
            console.log(data);
            if (!data) {
                throw new Error("Something went wrong obtaining he users access token");
            }

            fbLogin({
                variables: { facebookToken: data.accessToken },
                update: (store, { data: { authenticateFBUser } }) => {
                    let id = authenticateFBUser.user.id;
                    let token = authenticateFBUser.token;
                    let firstName = authenticateFBUser.user.firstName;
                    let lastName = authenticateFBUser.user.lastName;
                    let email = authenticateFBUser.user.email;
                    let profilePicture = authenticateFBUser.user.profilePicture.url;
                    let userObject = { __typename: "UserAuthInfo", id, token, firstName, lastName, email, profilePicture };

                    saveToCache({ variables: { userAuthInfo: userObject } })
                        .then(() => {
                            this.setState({
                                disabled: false
                            })
                            navigate('Profile')
                        })
                        .catch((e) => console.error(e));
                }
            })

        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <Mutation mutation={FB_LOGIN}>{(fbLogin, { loading, error }) => (
                <Button disabled={loading} light={loading} style={style.facebookConnectButton} onPress={() => this.handleLogin(fbLogin)}>
                    {error && ToastAndroid.show(`${error}`, ToastAndroid.SHORT)}
                    <Icon name="facebook" type="FontAwesome" style={style.facebookConnectButton.text} />
                    <Text style={style.facebookConnectButton.text}>
                       { loading ? "Pran on ti pasyans..." : "KONEKTE PA FACEBOOK" }
                    </Text>
                    {loading && <Spinner color="white" />}
                </Button >
            )}</Mutation>
        )
    }
}

export default compose(
    graphql(WRITE_AUTH_INFO, { name: "saveToCache" }),
)(FacebookLogin);