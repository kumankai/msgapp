import { Pressable, View, Image, Text, StyleSheet } from "react-native"

export default function TabNav({setActive, pageList, icons }){
   
    return (
        <View style={styles.nav}>
            {pageList.map((page, index) => (
                <Pressable key={index} onPress={() => setActive(index)} style={styles.iconContainer}>
                    {icons ? icons[index]: <Text>{page}</Text>}
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderTopColor: "#858585",
        borderTopWidth: 1
    },
    iconContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20
    }
})