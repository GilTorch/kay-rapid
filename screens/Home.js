import React from 'react';
import { View, ImageBackground, ScrollView, Image, Alert } from 'react-native';
import {
    Input,
    Item,
    Icon,
    Button,
    Container,
    Fab,
} from 'native-base';

import NavBar from '../components/NavBar';
import Neighborhood from '../components/Neighborhood';
import Logo from '../images/logo.png';
import NegreMarronImage from '../images/negre-marron.jpg';
import { mainColor } from '../utils/theme';


const style = {
    logo: {
        width: 150, height: 150
    },
    container: {
        flex: 1
    },
    view: {
        flex: 1,
        padding: 20,
        backgroundColor: `rgba(102, 45, 145,0.95)`,
        justifyContent: "center",
        alignItems: "center"
    },
    scrollView: {
        container: {
            flex: 1,
            backgroundColor: "#eee",
        },
        view: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    },
    item: {
        backgroundColor: 'white',
        width: 380,
        elevation: 7,
    },
    fab: {
        backgroundColor: "#ff9900"
    }
}

class Home extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={style.container}>
                <ImageBackground style={style.view} source={NegreMarronImage} style={{ width: '100%', height: '100%' }}>
                    <View style={style.view}>
                        <Image source={Logo} style={style.logo} />
                        <Item style={style.item} >
                            <Button onPress={() => Alert.alert('Searching...')} transparent>
                                <Icon name="search" style={{ color: '#662d91' }} />
                            </Button>
                            <Input style={{fontFamily:'EncodeSansCondensed-Light',color:mainColor}} placeholder="Tape non yon vil, komin oswa katye.." />
                        </Item>
                    </View>
                    <ScrollView style={style.scrollView.container} scrollEnabled>
                        <View style={style.scrollView.view}>
                            <Neighborhood name="Delmas" />
                            <Neighborhood name="Port-au-Prince" />
                            <Neighborhood name="Saint Marc" />
                            <Neighborhood name="Gonaives" />
                            <Neighborhood name="Jeremie" />
                            <Neighborhood name="Fort-Liberte" />
                        </View>
                    </ScrollView>
                    <View style={{ position: "absolute", bottom: 50, right: 1, background: "transparent", width: 100, height: 100 }}>
                        <Fab
                            active={false}
                            direction="up"
                            containerStyle={{}}
                            style={style.fab}
                            onPress={() => Alert.alert("You can now add an house")}>
                            <Icon name="add" />
                        </Fab>
                    </View>
                    <NavBar navigate={navigate} currentPage="Home" />
                </ImageBackground>
            </Container>
        );
    }
}

export default Home;