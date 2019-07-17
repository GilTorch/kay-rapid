import React from 'react';
import { View } from 'react-native';
import { Text, Card, CardItem, Body, Button, Content } from 'native-base';
import { Container } from 'native-base';
import { Query } from 'react-apollo';
import NavBar from '../components/NavBar';
import UserProfile from '../components/UserProfile';
import PleaseSignIn from '../components/PleaseSignIn';


class Profile extends React.Component {

  static navigationOptions = {
    title: 'Pwofil',
    headerRight: <View />
  };

  render() {
    const { navigate } =this.props.navigation;
    return (
      <>
        <PleaseSignIn navigate={navigate}>
          {userInfo => (
            <UserProfile user={userInfo} />
          )}
        </PleaseSignIn>
        <NavBar navigate={navigate} currentPage="Profile" />
      </>
    )
  }
}
 export default Profile;