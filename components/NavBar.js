import React from 'react';
import { StyleSheet,View,TouchableNativeFeedback } from 'react-native';
import { Footer, Text, Icon, Fab,Button } from 'native-base';
import NavButton from './NavButton';

const style = StyleSheet.create({
    nav: {
        backgroundColor: "#333",
    },
    icon:{color:'#eee',},
    iconHighLighted:{color:"#ff9900"}
})

const NavBar = ({ navigate,currentPage  }) => (
    <Footer style={style.nav}>
        <NavButton name="Akèy" navigate={()=>navigate('Home')} iconName="home" highLighted={currentPage === 'Home'}/>
        <NavButton name="Favori" navigate={()=>navigate('Favorites')} iconName="heart" highLighted={currentPage === 'Favorites'}/>
        <NavButton name="Pwofil" navigate={()=>navigate('Profile')} iconName="person" highLighted={currentPage === 'Profile'}/>
    </Footer>
)

export default NavBar;