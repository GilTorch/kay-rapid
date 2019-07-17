import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Button, Icon, Text } from 'native-base';
import SampleHouseImage from '../images/kay-ayiti.jpg';
import { successColor } from '../utils/theme';


const style = {
    cardInnerWrapper:{ flex: 1, position: "absolute", zIndex: 1 },
    ratingAndLikeContainer:{ width: 400, flexDirection: "row", justifyContent: "space-between", alignItems: 'center'}, 
    rating: { flexDirection: 'row', star:{ color: 'orange',opacity:0.8} },
    like:{
        color:'red'
    },
    housePreviewImage:{ height: 200, width: null, flex: 1 },
    ownerImage: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: "#888",
        borderRadius: 240,
        width: 50,
        height: 50,
        marginRight:10
    },
    cardBodyInnerWrapper:[{ alignItems: 'flex-start',padding:10 },{ flex: 1, padding: 10 }],
    actionButtonsInnerWrapper:{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
    getMoreDetailsButton:{ flex: 1, backgroundColor: successColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    iconContainer:{ flexDirection: 'row', alignItems: 'center',icon:{ fontSize: 20} }
}

class HouseCard extends React.Component {
    render() {
        return (
            <Card>
                <View style={style.cardInnerWrapper}>
                    <View style={style.ratingAndLikeContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="star" style={style.rating.star} />
                            <Icon name="star" style={style.rating.star} />
                            <Icon name="star" style={style.rating.star} />
                            <Icon name="star" style={style.rating.star} />
                            <Icon name="star" style={style.rating.star} />
                        </View>
                        <View>
                            <Button transparent>
                                <Icon active name="heart" style={style.like} />
                            </Button>
                        </View>
                    </View>
                </View>
                <CardItem cardBody>
                    <Image source={SampleHouseImage} style={style.housePreviewImage} />
                </CardItem>
                <CardItem cardBody>
                    <View style={style.cardBodyInnerWrapper[0]}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={SampleHouseImage} style={style.ownerImage} />
                            <Text style={{ fontWeight:'bold' }}>
                                Gilbert Torchon
                        </Text>
                        </View>
                    </View>
                </CardItem>
                <CardItem cardBody>
                    <View style={style.cardBodyInnerWrapper[1]}>
                        <Text style={{fontWeight:'bold'}}>
                            2000 US/an
                    </Text>
                        <Text>
                            Fermathe 52, rue Puzot #2
                    </Text>
                        <Text>
                            2 douch, 3 chanm a kouche, 2 sal a manje, 1 salon
                    </Text>
                    </View>
                </CardItem>
                <CardItem>
                    <View style={style.actionButtonsInnerWrapper}>
                        <TouchableOpacity>
                            <View style={style.iconContainer}>
                                <Icon name="map-marker" type="FontAwesome" style={style.iconContainer.icon} />
                                <Text>
                                    Kat
                        </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={style.iconContainer}>
                                <Icon name="camera" type="FontAwesome" style={style.iconContainer.icon} />
                                <Text>
                                    Foto
                        </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={style.iconContainer}>
                                <Icon name="video-camera" type="FontAwesome" style={style.iconContainer.icon} />
                                <Text>
                                    Video
                        </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </CardItem>
                <CardItem footer bordered>
                    <Button style={style.getMoreDetailsButton}>
                        <Text>
                            Plis Detay
                        </Text>
                    </Button>
                </CardItem>
            </Card>
        )
    }
}

export default HouseCard;