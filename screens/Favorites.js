import React from 'react';
import { Container } from 'native-base';
import { View, Text } from 'react-native';
import NavBar from '../components/NavBar';
import HouseCard from '../components/HouseCard';
import { ScrollView } from 'react-native-gesture-handler';


const style = {
    container: {
        flex: 1,
        padding:5,
    },
    view: {
        flex: 1,
    },
}

class Favorites extends React.Component {
    static navigationOptions = {
        title: 'Favori',
        headerRight: <View />
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={style.view}>
                <ScrollView style={style.container}>
                    <View style={style.view}>
                        <HouseCard />
                        <HouseCard />
                        <HouseCard />
                        <HouseCard />
                    </View>
                </ScrollView>
                    <NavBar navigate={navigate} currentPage="Favorites" />
            </View>
        )
    }
}


export default Favorites;