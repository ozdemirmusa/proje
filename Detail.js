import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Dimensions, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native';

export default Detail = ({ route, navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { itemId} = route.params;
    
    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/episode/' + itemId)
            .then(response => response.json())
            .then(data => setData(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [itemId]);
    return (
        <View>
             {isLoading ? <ActivityIndicator /> : (
            <View>
                <View style={styles.Main}>
                    <Text style={styles.Text}>{data.name}</Text>
                    <Text style={styles.Text}>{data.air_date}</Text>
                    <Text style={styles.Text}>{data.episode}</Text>
                </View>
                <FlatList
                    data={data.characters}
                    keyExtractor={({ id }, index) => index}
                    style={{ height: Dimensions.get('window').height - 200 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.Click} onPress={() => {
                            navigation.navigate('Character', {
                                characterId: item.split('/').reverse()[0]
                            })
                        }
                        }>
                            <View >
                                <Text style={styles.Text}>{item.split('/').reverse()[0]}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
             )}
        </View>
    );
};


const styles = StyleSheet.create({
    Main:{ 
        backgroundColor: 'green', 
        width: '100%', justifyContent: 'center', 
        alignItems: 'center'},
    Click:{
        flexDirection: 'row',
        backgroundColor: 'grey', 
        height: 100, margin: 20, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10 
    },
    Text: {
        fontFamily: "Cochin",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 5,
    }
});