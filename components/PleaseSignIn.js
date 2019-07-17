import React from 'react';
import { View } from 'react-native';
import { Text, Card, CardItem, Body, Button, Content } from 'native-base';
import { Container } from 'native-base';
import { Query } from 'react-apollo';
import NavBar from '../components/NavBar';
import UserProfile from '../components/UserProfile';
import Spinner from '../native-base-theme/components/Spinner';
import { mainColor } from '../utils/theme';
import { READ_AUTH_INFO } from '../queries/queries';

const style = {
  container: {
    flex: 1,
  },
  view: {
    flex: 1
  },
  card: {
    margin: 15,
    padding: 0,
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  cardFooter: {
    textAlign: 'center'
  }
}



class PleaseSignIn extends React.Component {

  render() {
    const { navigate } = this.props;
    return (
      <Query query={READ_AUTH_INFO}>{({ loading, error, data: { userAuthInfo } }) => (
        <Container style={style.container}>
          {loading && <Spinner color={mainColor} />}
          {error && ToastAndroid.show(`${error}`, ToastAndroid.SHORT)}
          {!userAuthInfo.email && (
            <View style={style.view}>
              <Card style={style.card}>
                <CardItem>
                  <Body>
                    <Text>
                      Konekte kounya pou ou ka genyen yon pi bon eksperyans.
                </Text>
                  </Body>
                </CardItem>
                <CardItem footer style={style.cardFooter}>
                  <Content>
                    <Button onPress={() => navigate('SignInMethods')} full success>
                      <Text>
                        Konekte
                </Text>
                    </Button>
                  </Content>
                </CardItem>
              </Card>
            </View>
          )}
          {userAuthInfo.email && this.props.children(userAuthInfo)}
        </Container>
      )}</Query>
    )
  }
}

export default PleaseSignIn;