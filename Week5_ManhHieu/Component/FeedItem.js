import React, { Component } from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import { Linking } from 'expo';

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onPressReadMore=()=>{
    const {item:{url}} = this.props;
    Linking.openURL(url).catch(err => console.log('Erro'))
  }

  render() {
      const {item:{title, urlToImage,url}} = this.props;
    return (
      <View style = {styles.card}>
        <Image source={{uri: urlToImage}} style = {styles.image}/>
        <Text> {title} </Text>
        <TouchableOpacity style ={styles.button} onPress={this.onPressReadMore}>
          <Text style={styles.textButton}>Read More</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card:{
    flexDirection:'column',
    paddingHorizontal: 15,
    paddingVertical:10,
  },
  image:{
    width: 400,
    height:200
  },
  button:{
    backgroundColor:'blue', 
    paddingVertical:15,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  textButton:{
    color:'white',
    fontSize:20
  }
})
