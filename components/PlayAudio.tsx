import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function PlaySound() {
	const [sound, setSound] = useState<Audio.Sound>();

	async function playSound() {
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(
			require("@/assets/audio/audio.mp3"),
		);
		setSound(sound);
		console.log("Playing Sound");
		await sound.playAsync();
	}

	useEffect(() => {
		return sound
			? () => {
					console.log("Unloading Sound");
					sound.unloadAsync();
				}
			: undefined;
	}, [sound]);

	return (
		<View style={styles.container}>
			<Button title="Play Sound" onPress={playSound} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#ecf0f1",
		padding: 10,
	},
});
