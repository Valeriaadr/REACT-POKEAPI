import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import usePokeinfo from '@/hooks/usePokeinfo';

export function Details({ navigation, route }) {
    const { url } = route.params;
    const { info, loading, error } = usePokeinfo(url);

    if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
    if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

    function handleClick() {
        navigation.navigate('Home');
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={handleClick}>
                <Text style={styles.header}>Details</Text>
            </TouchableOpacity>
            <View style={styles.detailContainer}>
                <Text style={styles.title}>ID: {info.id}</Text>
                <Text style={styles.title}>Name: {info.name}</Text>
                <Text style={styles.title}>Type: {info.types.map(t => t.type.name).join(', ')}</Text>
                <Text style={styles.title}>Weight: {info.weight}</Text>
                <Text style={styles.title}>Abilities:</Text>
                {info.abilities.map((ability, index) => (
                    <Text key={index} style={styles.text}>{ability.ability.name}</Text>
                ))}
                <Text style={styles.title}>Moves:</Text>
                {info.moves.slice(0, 10).map((move, index) => (
                    <Text key={index} style={styles.text}>{move.move.name}</Text>
                ))}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: info.sprites.front_default }} style={styles.image} />
                    <Image source={{ uri: info.sprites.back_default }} style={styles.image} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffe4e1',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ff69b4',
        textAlign: 'center',
    },
    detailContainer: {
        padding: 20,
        backgroundColor: '#fff0f5',
        borderRadius: 10,
        shadowColor: '#ff69b4',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ff1493',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#ff69b4',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    loadingText: {
        fontSize: 18,
        color: '#ff1493',
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#ff0000',
        textAlign: 'center',
        marginTop: 20,
    },
});
