import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

export default App = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {

    fetch('https://rickandmortyapi.com/api/episode')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <FlatList
      data={data.results}
      keyExtractor={({ id }, index) => index}
      renderItem={({ item }) => (
        <View>
          <View style={{ marginBottom: 10, padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { itemId: item.id })}>
              <View style={styles.Views}>
                <Text style={styles.Text}>{item.name}</Text>
                <Text style={styles.Text}>{item.air_date}</Text>
                <Text style={styles.Text}>{item.episode}</Text>
                <Text style={styles.Text}>{item.url}</Text>
                <Text style={styles.Text}>{item.created}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  Views: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  Text: {
    fontFamily: "Cochin",
    fontSize: 14,
    fontWeight: "bold",
    margin: 5,
    borderRadius: 5
  }
});