import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import FeedItem from './Component/FeedItem';

export default class App extends React.Component {
  state = {
    isLoading: false,
    listArticles: [],
    totalResults: 0,
    page: 1,
    isLoadMore: false
  }

  componentDidMount = async () => {
    const {page} = this.state;
    this.setState({
      isLoading:true
    });
    this.callAPI(page);
  }
  callAPI = async page => {
    const {listArticles} = this.state;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${page}`);
    await setTimeout(()=>{},2000);
    const jsonResponse = await response.json();
    this.setState({
      page: page,
      isLoading:false,
      listArticles: listArticles.concat(jsonResponse.articles),
      totalResults: response.totalResults
    });
  };
  renderItem = ({ item }) => {
    return <FeedItem item={item} />
  }
  renderFooter = ()=>{
    return(
      <ActivityIndicator size='large' color='red' animating={true} />
    )
  }
  onEndReached = async () => {
    const { page } = this.state;
    const newPage = page + 1;
    this.callAPI(newPage);
  }
  onRefresh = async () =>{
    const newPage = 1;
    await this.setState({
      isLoading:true,
      listArticles:[],
       page: newPage
    });
    await setTimeout(()=>{
      this.callAPI(newPage);
    },2000); 
  }
  render() {
    const { isLoading, listArticles } = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color='red' animating={isLoading} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={listArticles}
          renderItem={this.renderItem}
          style={styles.flatlist}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1} 
          ListFooterComponent={this.renderFooter()}
          onRefresh ={this.onRefresh}
          refreshing={false}
          />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    marginHorizontal: 15
  }
});
