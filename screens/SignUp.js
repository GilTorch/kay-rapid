import React from 'react';
import {
    Spinner,
    Button,
    Icon,
    Text,
    Content,
    Card,
    CardItem,
    Form,
    Item,
    Input,
    Label
} from 'native-base';
import { View, TouchableOpacity, Alert, ToastAndroid, ScrollView, StyleSheet, Image } from 'react-native';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import { Formik } from 'formik';
import { Mutation, compose, graphql } from 'react-apollo';
import { mainColor } from '../utils/theme';
import { ACCOUNT_CREATION, AUTH_WITHOUT_SOCIAL_MEDIA, WRITE_AUTH_INFO } from '../queries/queries';
import uploadImage from '../utils/uploadImageToFileServer';

const style = StyleSheet.create({
    label: {
        color: mainColor,
        fontFamily: 'EncodeSansCondensed-Regular'
    },
    icon: {
        color: mainColor,
        fontSize: 18
    },
    submitButtonContainer: {
        flex: 1,
    },
    view: {
        flex: 1,
    },
    forgetPasswordButton: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        // flex: 1
    },
    form: {
        // flex: 1,
        // height: 100
    },
    cardFooter: {
    },
    failureIcon: {
        color: 'red'
    },
    successIcon: {
        color: 'green'
    },
    selectPictureButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: mainColor,
        borderRadius: 240,
        width: 120,
        height: 120,
        marginBottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formGroup: {
        flex: 1
    }
})

const schema = yup.object().shape({
    firstName: yup.string("Prenon se yon tèks").required("Prenon se yon chan obligatwa"),
    lastName: yup.string("Non se yon tèks").required("Non se yon chan obligatwa"),
    email: yup.string("Imèl se yon tèks").email("Sa w mete a pa yon imel").required("Imel se yon chan obligatwa"),
    phone1: yup.string().min(8, "Telefon ou dwe gen 8 karaktè pou pi piti"),
    password: yup.string().min(8, "Modpas ou dwe o mwen 8 karaktè").required("Modpas se yon chan obligatwa"),
    passwordConfirm: yup.string().required("Konfime Modpas la")
        .oneOf([yup.ref('password'), null], "Paswod yo pa menm")
})

class SignUp extends React.Component {
    static navigationOptions = {
        title: 'Kreye Yon Kont',
        headerRight: <View />
    };

    state = {
        profilePicture: null,
        password: {
            hidden: true,
            icon: "eye"
        },
        passwordConfirm: {
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

    handleChoosingPhoto = () => {
        const options = {
            title: 'Chwazi Yon Foto Pwofil',
            takePhotoButtonTitle: "Pran Yon Foto Ak Kamera'w",
            chooseFromLibraryButtonTitle: 'Chache Nan Galri Foto a',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    profilePicture: response,
                });
            }
        });
    }

    setPhotoToNull = () => {
        this.setState({
            profilePicture: null
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        let { password, passwordConfirm, profilePicture } = this.state;
        const { writeUserAuthInfoToCache } = this.props;

        return (
            <Mutation mutation={ACCOUNT_CREATION}>
                {(signup, { error }) => (
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone1: "",
                            password: "",
                            passwordConfirm: ""
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true)
                            if (profilePicture !== null) {
                                await uploadImage([profilePicture], "profilePicture", (label, response) => {
                                    profilePicture = response.secure_url;
                                })
                            } 

                            signup({
                                variables: {
                                    email: values.email,
                                    password: values.password,
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    phone1: values.phone1,
                                    profilePicture
                                },
                                update: (store, { data: { signup } }) => {

                                    const profilePicture = !signup.user.profilePicture ? null : signup.user.profilePicture.url; 

                                    let userObject = {
                                        __typename: "UserAuthInfo",
                                        id: signup.user.id,
                                        token: signup.token,
                                        firstName: signup.user.firstName,
                                        lastName: signup.user.lastName,
                                        email: signup.user.email,
                                        profilePicture
                                    };
                                    setSubmitting(false)
                                    writeUserAuthInfoToCache({ variables: { userAuthInfo: userObject } })
                                    .then(() => {
                                        navigate("Profile")
                                    }).catch((err) => console.log(err))
                                }
                            }).then(
                                setSubmitting(false)
                            )
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
                                <ScrollView>
                                    {error && ToastAndroid.show(`${error}`, ToastAndroid.SHORT)}
                                    <Card style={style.card}>
                                        <Form style={style.form}>
                                            <CardItem style={{ flexDirection: 'column', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ marginBottom: 10 }}>
                                                </Text>
                                                {profilePicture && (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Image
                                                            style={style.selectPictureButton}
                                                            source={this.state.profilePicture}
                                                        />
                                                        <Icon name="close-circle" onPress={() => this.setPhotoToNull()} />
                                                    </View>
                                                )}
                                                {!profilePicture && (
                                                    <TouchableOpacity
                                                        onPress={() => this.handleChoosingPhoto()}
                                                        style={style.selectPictureButton}
                                                        transparent
                                                    >
                                                        <Icon name="camera" style={{ color: mainColor }} type="FontAwesome" />
                                                    </TouchableOpacity>
                                                )}
                                            </CardItem>
                                            <CardItem>
                                                <View style={style.formGroup}>
                                                    <Label style={style.label}><Icon name="person" style={style.icon} /> Rantre Siyati'w</Label>
                                                    <Item
                                                        success={!errors.lastName && touched.lastName}

                                                        error={errors.lastName !== undefined && touched.lastName}
                                                    >
                                                        <Input
                                                            onChangeText={handleChange('lastName')}
                                                            onBlur={handleBlur('lastName')}
                                                            value={values.lastName}
                                                        />
                                                        {this.failureSuccessIcon("lastName", touched, errors)}
                                                    </Item>
                                                </View>
                                            </CardItem>
                                            <CardItem>
                                                {errors.lastName && touched.lastName && <Text style={{ color: 'red' }}>{errors.lastName}</Text>}
                                            </CardItem>
                                            <CardItem>
                                                <View style={style.formGroup}>
                                                    <Label style={style.label}><Icon name="person" style={style.icon} /> Rantre Non'w</Label>
                                                    <Item
                                                        success={!errors.firstName && touched.firstName}

                                                        error={errors.firstName !== undefined && touched.firstName}
                                                    >
                                                        <Input
                                                            onChangeText={handleChange('firstName')}
                                                            onBlur={handleBlur('firstName')}
                                                            value={values.firstName}
                                                        />
                                                        {this.failureSuccessIcon("firstName", touched, errors)}
                                                    </Item>
                                                </View>
                                            </CardItem>
                                            <CardItem>
                                                {errors.firstName && touched.firstName && <Text style={{ color: 'red' }}>{errors.firstName}</Text>}
                                            </CardItem>
                                            <CardItem>
                                                <View style={style.formGroup}>
                                                    <Label style={style.label}><Icon name="phone" type="FontAwesome" style={style.icon} /> Rantre Nimewo Telefòn ou</Label>
                                                    <Item
                                                        success={!errors.phone1 && touched.phone1}

                                                        error={errors.phone1 !== undefined && touched.phone1}
                                                    >
                                                        <Input
                                                            onChangeText={handleChange('phone1')}
                                                            onBlur={handleBlur('phone1')}
                                                            value={values.phone1}
                                                        />
                                                        {this.failureSuccessIcon("phone1", touched, errors)}
                                                    </Item>
                                                </View>
                                            </CardItem>
                                            <CardItem>
                                                {errors.phone1 && touched.phone1 && <Text style={{ color: 'red' }}>{errors.phone1}</Text>}
                                            </CardItem>
                                            <CardItem>
                                                <View style={style.formGroup}>
                                                    <Label style={style.label}><Icon name="mail" style={style.icon} /> Rantre Imel ou</Label>
                                                    <Item
                                                        style={{ flexDirection: 'row' }}
                                                        success={!errors.email && touched.email}

                                                        error={errors.email !== undefined && touched.email}
                                                    >
                                                        <Input
                                                            onChangeText={handleChange('email')}
                                                            onBlur={handleBlur('email')}
                                                            value={values.email}
                                                        />
                                                        {this.failureSuccessIcon("email", touched, errors)}
                                                    </Item>
                                                </View>
                                            </CardItem>
                                            <CardItem>
                                                {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                                            </CardItem>
                                            <CardItem>
                                                <View style={style.formGroup}>
                                                    <Label style={style.label}><Icon name="lock" style={style.icon} /> Rantre modpas ou</Label>
                                                    <Item
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
                                                {errors.password && touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                                            </CardItem>
                                            <CardItem>
                                                <View style={style.formGroup}>
                                                    <Label style={style.label}><Icon name="lock" style={style.icon} /> Konfime Modpas ou chwazi a</Label>
                                                    <Item

                                                        success={!errors.passwordConfirm && touched.passwordConfirm}
                                                        error={errors.passwordConfirm !== undefined && touched.passwordConfirm}
                                                    >
                                                        <Input
                                                            secureTextEntry={passwordConfirm.hidden}
                                                            onChangeText={handleChange('passwordConfirm')}
                                                            onBlur={handleBlur('passwordConfirm')}
                                                            value={values.passwordConfirm}
                                                        />
                                                        <Icon name={passwordConfirm.icon} type="FontAwesome" style={style.icon} onPress={() => this.handlePasswordVisible("passwordConfirm")} />
                                                        {this.failureSuccessIcon("passwordConfirm", touched, errors)}
                                                    </Item>
                                                </View>
                                            </CardItem>
                                            <CardItem>
                                                {errors.passwordConfirm && touched.passwordConfirm && <Text style={{ color: 'red' }}>{errors.passwordConfirm}</Text>}
                                            </CardItem>
                                            <CardItem footer style={style.cardFooter}>
                                                <Content>
                                                    <Button disabled={isSubmitting} onPress={handleSubmit} success={isSubmitting === false} light={isSubmitting} block>
                                                        <Text>
                                                            Kreye
                                                        </Text>
                                                        {isSubmitting && <Spinner color="white" />}
                                                    </Button>
                                                </Content>
                                            </CardItem>
                                            <CardItem style={{ justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
                                                <TouchableOpacity onPress={() => navigate("SignIn")}>
                                                    <Text style={{ color: 'black', textDecorationLine: 'underline' }}>
                                                        Ou Gen Yon Kont Deja 😍 ? <Text style={{ color: 'blue' }}> Konekte</Text>
                                                    </Text>
                                                </TouchableOpacity>
                                            </CardItem>
                                        </Form>
                                    </Card>
                                </ScrollView>
                            )}
                    </Formik>
                )}</Mutation>
        )
    }
}


export default compose(
    graphql(WRITE_AUTH_INFO, { name: "writeUserAuthInfoToCache" })
)(SignUp);


