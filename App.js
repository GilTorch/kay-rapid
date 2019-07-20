import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
import { StyleProvider } from 'native-base';
import Favorites from './screens/Favorites';
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignInMethods from './screens/SignInMethods';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { Spinner } from 'native-base';
import { mainColor } from './utils/theme';
import commonColor from './native-base-theme/variables/platform';
import getTheme from './native-base-theme/components';
import client,{ persistor } from './apolloClient';

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Favorites: { screen: Favorites },
  Profile: { screen: Profile },
  SignInMethods: { screen: SignInMethods },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp }
}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: mainColor,
      },
      headerTintColor: "white",
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1
      }
    }
  });

const AppContainer = createAppContainer(MainNavigator);


export default class App extends React.Component {

  state = {
    restored: false
  }

  componentDidMount() {
    persistor.restore()
      .then(() => this.setState({ restored: true }))
  }

  render() {
    if(!this.state.restored){
      return <Spinner color={mainColor} />
    }

    return (
      (
        <ApolloProvider client={client}>
          <StyleProvider style={getTheme(commonColor)}>
            <AppContainer />
          </StyleProvider>
        </ApolloProvider>
      )
    )
  }
} 
