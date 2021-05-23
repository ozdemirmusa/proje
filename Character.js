import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView, Dimensions, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default Character = ({ route, navigation }) => {
    const { characterId } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/' + characterId)
            .then(response => response.json())
            .then(data => setData(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    return (
        <View>
            {isLoading ? <ActivityIndicator /> : (
                <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: data.image, width: 100, height: 100, }} />
                    </View>
                    <ScrollView style={{ height: 150 }}>
                        <View style={styles.Views}>
                            <Text style={styles.Text}>{data.name}</Text>
                            <Text style={styles.Text}>{data.status}</Text>
                            <Text style={styles.Text}>{data.species}</Text>
                            <Text style={styles.Text}>{data.type}</Text>
                            <Text style={styles.Text}>{data.gender}</Text>
                            <Text style={styles.Text}>{data.origin.name}</Text>
                            <Text style={styles.Text}>{data.origin.url}</Text>
                            <Text style={styles.Text}>{data.location.name}</Text>
                            <Text style={styles.Text}>{data.location.url}</Text>
                        </View>
                    </ScrollView>
                    <FlatList
                        data={data.episode}
                        style={{ height: Dimensions.get('window').height - 330 }}
                        keyExtractor={({ id }, index) => index}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.Click}
                                onPress={() => navigation.navigate('Detail', {
                                    itemId: item.split('/').reverse()[0]
                                })
                                }>
                                <View>
                                    <Text style={styles.Text}>{item.split('/').reverse()[0]}</Text>
                                </View>
                            </TouchableOpacity>

                        )}
                    /></View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    Views:{
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'grey', 
        marginTop: 5,
    },
    Click:{
        flexDirection: 'row', 
        backgroundColor: 'grey', 
        height: 100, margin: 20, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10,
    },
    Text: {
        fontFamily: "Cochin",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 5,
    }
});