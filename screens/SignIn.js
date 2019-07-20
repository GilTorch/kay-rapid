import React from 'react';
import {
    Container,
    Button,
    Icon,
    Text,
    Content,
    Card,
    CardItem,
    Form,
    Item,
    Input,
    Label,
    Spinner
} from 'native-base';
import { Mutation, compose, graphql } from 'react-apollo';
import { View, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { ToastAndroid } from 'react-native';
import { successColor, mainColor } from '../utils/theme';
import { AUTH_WITHOUT_SOCIAL_MEDIA, WRITE_AUTH_INFO } from '../queries/queries';

const style = {
    label: {
        color: 'rgba(102, 45, 145,1)',
        fontFamily: 'EncodeSansCondensed-Regular'
    },
    icon: {
        color: 'rgba(102, 45, 145, 1)',
        fontSize: 18
    },
    submitButtonContainer: {
        flex: 1,
    },
    view: {
        flex: 1,
    },
    forgetPasswordButton: {
        backgroundColor: successColor,
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        // backgroundColor: successColor,
    },
    card: {
        flex: 1
    },
    form: {
        flex: 1,
        height: 100
    },
    cardFooter: {
        // marginTop: 40
    },
    failureIcon: {
        color: 'red'
    },
    successIcon: {
        color: 'green'
    }
}

const schema = yup.object().shape({
    email: yup.string().email("Ou dwe rantre yon Imèl ").required("Imel se yon chan obligatwa"),
    password: yup.string().required("Modpas se yon chan obligatwa"),
})



class SignIn extends React.Component {
    static navigationOptions = {
        title: 'Konekte Ak Kont Ou',
        headerRight: <View />
    };

    state = {
        password: {
            hidden: true,
            icon: "eye"
        }
    }

    failureSuccessIcon = (fieldName, touched, errors) => {
        if (errors[fieldName] && touched[fieldName]) {
            return <Icon name='close-circle' style={style.failureIcon} />;
        }
        if (!errors[fieldName] && touched[fieldName]) {
            return <Icon name="checkmark-circle" style={style.successIcon} />;
        }
        return <Text></Text>;
    }

    handlePasswordVisible = (fieldName) => {

        if (fieldName !== 'password' && fieldName !== 'passwordConfirm') return console.error("fiedlName must be 'password' or 'passwordConfirm' ")
        const hidden = !this.state[fieldName].hidden;
        this.setState({
            [fieldName]: {
                hidden: hidden,
                icon: hidden ? 'eye' : 'eye-slash'
            }
        })
    }

    render() {
        const { writeUserAuthInfoToCache, navigation: { navigate } } = this.props;
        const { password } = this.state;

        return (
            <Mutation mutation={AUTH_WITHOUT_SOCIAL_MEDIA}>
                {(login, { loading, error }) => (

                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            // Alert.alert(JSON.stringify(values));
                            setSubmitting(true);
                            login({
                                variables: { email: values.email, password: values.password },
                                update: (store, { data: { login } }) => {
                                    let userObject = {
                                        __typename: "UserAuthInfo",
                                        id: login.user.id,
                                        token: login.token,
                                        firstName: login.user.firstName,
                                        lastName: login.user.lastName,
                                        email: login.user.email,
                                        profilePicture: login.user.profilePicture.url
                                    };
                                    setSubmitting(false)
                                    writeUserAuthInfoToCache({ variables: { userAuthInfo: userObject } });
                                }
                            }).then(() => {
                                navigate("Profile")
                            })
                                .catch((err) => console.log(err))

                            setSubmitting(false);
                        }}
                    >
                        {({
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            errors,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                                <Container>
                                    {error && ToastAndroid.show(`${error}`, ToastAndroid.SHORT)}
                                    <Card style={style.card}>
                                        <Form style={style.form}>
                                            <CardItem>
                                                <Label style={style.label}><Icon name="mail" style={style.icon} /> Rantre imel ou</Label>
                                                <Item
                                                    success={!errors.email && touched.email}
                                                    // floatingLabel={true}
                                                    error={errors.email !== undefined && touched.email}
                                                >
                                                    <Input
                                                        onChangeText={handleChange('email')}
                                                        onBlur={handleBlur('email')}
                                                        value={values.email}
                                                    />
                                                    {this.failureSuccessIcon("email", touched, errors)}
                                                </Item>
                                            </CardItem>
                                            <CardItem>
                                                {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                                            </CardItem>
                                            <CardItem>
                                                <View>
                                                    <Label style={style.label}><Icon name="lock" style={style.icon} /> Rantre modpas ou</Label>
                                                    <Item
                                                        regular
                                                        // floatingLabel
                                                        success={!errors.password && touched.password}
                                                        error={errors.password !== undefined && touched.password}
                                                    >
                                                        <Input
                                                            secureTextEntry={password.hidden}
                                                            onChangeText={handleChange('password')}
                                                            onBlur={handleBlur('password')}
                                                            value={values.password}
                                                        />
                                                        <Icon name={password.icon} type="FontAwesome" style={style.icon} onPress={() => this.handlePasswordVisible("password")} />
                                                        {this.failureSuccessIcon("password", touched, errors)}
                                                    </Item>
                                                </View>
                                            </CardItem>
                                            <CardItem>
                                                {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                                            </CardItem>
                                            <CardItem footer style={style.cardFooter}>
                                                <Content>
                                                    <Button disabled={loading} style={style.button} color="#eee" onPress={handleSubmit} success={loading === false} light={loading} block>
                                                        <Text>
                                                            Soumèt
                                                        </Text>
                                                        {loading && <Spinner color="white" />}
                                                    </Button>
                                                </Content>
                                            </CardItem>
                                            <CardItem style={{ justifyContent: 'center', marginTop: 10, marginBottom: 0 }}>
                                                <TouchableOpacity>
                                                    <Text style={{ color: 'red', textDecorationLine: 'underline' }}>
                                                        Mwen bliye modpas mwen 😞
                                            </Text>
                                                </TouchableOpacity>
                                            </CardItem>
                                        </Form>
                                    </Card>
                                </Container>
                            )}
                    </Formik>
                )}</Mutation>
        )
    }
}

export default compose(
    graphql(WRITE_AUTH_INFO, { name: "writeUserAuthInfoToCache" })
)(SignIn);
