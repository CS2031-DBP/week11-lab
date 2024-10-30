import { Audio } from "expo-av";
import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function RecordAudio() {
	const [recording, setRecording] = useState<Audio.Recording>();
	const [permissionResponse, requestPermission] = Audio.usePermissions();

	async function startRecording() {
		if (!permissionResponse)
			throw new Error("Permission response is undefined");

		try {
			if (permissionResponse.status !== "granted") {
				console.log("Requesting permission..");
				await requestPermission();
			}
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});
			console.log("Starting recording..");
			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY,
			);
			setRecording(recording);
			console.log("Recording started");
		} catch (err) {
			console.error("Failed to start recording", err);
		}
	}

	async function stopRecording() {
		console.log("Stopping recording..");
		if (!recording) throw new Error("Recording is undefined");
		await recording.stopAndUnloadAsync();
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
		});
		const uri = recording.getURI();
		setRecording(undefined);
		console.log("Recording stopped and stored at", uri);
	}

	return (
		<View style={styles.container}>
			<Button
				title={recording ? "Stop Recording" : "Start Recording"}
				onPress={recording ? stopRecording : startRecording}
			/>
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
