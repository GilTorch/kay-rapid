import gql from "graphql-tag";

export const ALL_HOUSES_QUERY=gql`
  query {
    Houses{
      id 
      host{
        id 
        firstName
        lastName
        phone1 
      }
      numBedrooms
      numBaths 
      numDiningrooms 
      pricing{
        highestPrice 
        currency
      }
      leaseType 
      location{
        address
      }
      preview_image{
        url
      }
    }
  }
`

export const ACCOUNT_CREATION = gql`
mutation signup($email:String!,$password:String!,$firstName:String!,$lastName:String!,$phone1:String!,$profilePicture:String!){
  signup(email:$email,password:$password,firstName:$firstName,lastName:$lastName,phone1:$phone1,profilePicture:$profilePicture){
  token
  user{
    id
  }
  }
}
` 

export const REQUEST_PASSWORD_TOKEN=gql`
  mutation requestPWResetToken($email:String!){
    requestPWResetToken(email:$email){
      message
    }
  }
`

export const RESET_PASSWORD=gql`
mutation resetPassword($resetToken:String!,$password:String!,$passwordConfirm:String!){
  resetPassword(resetToken:$resetToken,password:$password,passwordConfirm:$passwordConfirm){
    token
    user{
      id
    }
  }
}
`

export const AUTH_WITHOUT_SOCIAL_MEDIA=gql`
mutation login($email:String!,$password:String!) {
  login(email:$email,password:$password) {
    token 
    user{
      id
      firstName
      lastName
      email
      profilePicture{
        url
      }
    }
  }
}
`


export const HOUSE_CREATION_2=gql`
  mutation createHouse($age:Int!,$maxGuests:Int!,$numBedrooms:Int!,$numBaths:Int!,$basePrice:Int!,$numLivingrooms:Int!,$numDiningrooms:Int!,$highestPrice:Int!,$income:Int!,$lease:Int!,$communeId:String, $currency:CURRENCY){
    createHouse(age:$age,maxGuests:$maxGuests,numBedrooms:$numBedrooms,numBaths:$numBaths,basePrice:$basePrice,numLivingrooms:$numLivingrooms,numDiningrooms:$numDiningrooms,highestPrice:$highestPrice,income:$income,lease:$lease,communeId:$communeId,currency:$currency){
      id
    }
  }
`

export const HOUSE_CREATION=gql`
  mutation createHouse(
    $area:Int,
    $age:Int!,
    $shortDescription:String,
    $description:String,
    $maxGuests:Int!,
    $numBedrooms:Int!,
    $numBaths:Int!,
    $basePrice:Int!,
    $numLivingrooms:Int!,
    $numDiningrooms:Int!,
    $highestPrice:Int!,
    $currency:CURRENCY,
    $income:Int!,
    $lat:Float,
    $lng:Float,
    $address:String,
    $communeId:String,
    $leaseType:HOUSE_LEASE_TYPE,
    $type:HOUSE_TYPES,
    $residency:House_RESIDENCY,
    $lease:Int!,
    $electricity:Boolean,
    $electricity_frequency:FREQUENCY,
    $water_pipe:Boolean,
    $water_tank:Boolean,
    $water_frequency:FREQUENCY,
    $elevator:Boolean,
    $petsAllowed:Boolean,
    $internet:Boolean,
    $kitchen:Boolean,
    $wirelessInternet:Boolean,
    $familyKidFriendly:Boolean,
    $freeParkingOnPremises:Boolean,
    $hotTub:Boolean,
    $pool:Boolean,
    $smokingAllowed:Boolean,
    $wheelchairAccessible:Boolean,
    $cableTv:Boolean,
    $suitableForEvents:Boolean,
    $dryer:Boolean,
    $washer:Boolean,
    $indoorFireHouse:Boolean,
    $tv:Boolean,
    $hangers:Boolean,
    $iron:Boolean,
    $hairDryer:Boolean,
    $doorman:Boolean,
    $paidParkingOffPremises:Boolean,
    $freeParkingOnStreet:Boolean,
    $gym:Boolean,
    $airConditioning:Boolean,
    $shampoo:Boolean,
    $essentials:Boolean,
    $laptopFriendlyWorkspace:Boolean,
    $privateEntrance:Boolean,
    $buzzerWirelessIntercom:Boolean,
    $bathtub:Boolean,
    $crib:Boolean
    $rooms:[RoomCreateWithoutHouseInput],
    $previewImage:String
    ){
    createHouse(
    area:$area,
    age:$age,
    shortDescription:$shortDescription,
    description:$description,
    maxGuests:$maxGuests,
    numBedrooms:$numBedrooms,
    numBaths:$numBaths,
    basePrice:$basePrice,
    numLivingrooms:$numLivingrooms,
    numDiningrooms:$numDiningrooms,
    highestPrice:$highestPrice,
    currency:$currency,
    income:$income,
    lat:$lat,
    lng:$lng,
    address:$address,
    communeId:$communeId,
    leaseType:$leaseType,
    type:$type,
    residency:$residency,
    lease:$lease,electricity:$electricity,
    electricity_frequency:$electricity_frequency,
    water_pipe:$water_pipe,
    water_tank:$water_tank,
    water_frequency:$water_frequency,
    elevator:$elevator,
    petsAllowed:$petsAllowed,
    internet:$internet,
    kitchen:$kitchen,
    wirelessInternet:$wirelessInternet,
    familyKidFriendly:$familyKidFriendly,
    freeParkingOnPremises:$freeParkingOnPremises,
    freeParkingOnStreet:$freeParkingOnStreet,
    hotTub:$hotTub,
    pool:$pool,
    smokingAllowed:$smokingAllowed,
    wheelchairAccessible:$wheelchairAccessible,
    cableTv:$cableTv,
    suitableForEvents:$suitableForEvents,
    dryer:$dryer,
    washer:$washer,
    indoorFireHouse:$indoorFireHouse,
    tv:$tv,
    hangers:$hangers,
    iron:$iron,
    hairDryer:$hairDryer,
    doorman:$doorman,
    paidParkingOffPremises:$paidParkingOffPremises,
    gym:$gym,
    airConditioning:$airConditioning,
    shampoo:$shampoo,
    essentials:$essentials,
    laptopFriendlyWorkspace:$laptopFriendlyWorkspace,
    privateEntrance:$privateEntrance,
    buzzerWirelessIntercom:$buzzerWirelessIntercom,
    bathtub:$bathtub,
    rooms:$rooms
    crib:$crib,
    previewImage:$previewImage){
      id,
      rooms {
      id,
      label,
      picture_previews{
      	url
      }
    }
      
    }
  }
`

export const FB_AUTH = gql`
mutation authenticateFBUser($facebookToken:String!) {
authenticateFBUser(facebookToken:$facebookToken){
  token
  user{
    id
    firstName
    lastName
    email
    profilePicture{
      url
    }
  }
}
}
`

export const WRITE_AUTH_INFO= gql`
mutation updateAuthInfo($userAuthInfo:Object!){
  updateAuthInfo(userAuthInfo:$userAuthInfo) @client{
    id
    token
    email
    firstName
    lastName
    # profilePicture
  }
}
`

export const READ_AUTH_INFO = gql`
  query{
    userAuthInfo @client{
      id
      token
      email
      firstName
      lastName
      profilePicture
    }
  }
`
