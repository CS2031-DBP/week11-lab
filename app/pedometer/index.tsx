import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import {
	PermissionsAndroid,
	Platform,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function PedometerScreen() {
	const [isPedometerAvailableString, setIsPedometerAvailableString] =
		useState("checking");
	const [currentStepCount, setCurrentStepCount] = useState(0);

	async function requestPermission() {
		if (Platform.OS === "android") {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
				{
					title: "Permiso de Reconocimiento de Actividad",
					message:
						"La aplicación necesita acceso al reconocimiento de actividad para contar pasos.",
					buttonNeutral: "Preguntar Más Tarde",
					buttonNegative: "Cancelar",
					buttonPositive: "Aceptar",
				},
			);

			return granted === PermissionsAndroid.RESULTS.GRANTED;
		}

		return true;
	}

	async function subscribe() {
		const permissionGranted = await requestPermission();

		if (!permissionGranted) {
			console.log("Permiso de reconocimiento de actividad no concedido");
			return;
		}

		const isAvailable = await Pedometer.isAvailableAsync();
		setIsPedometerAvailableString(String(isAvailable));

		if (isAvailable) {
			const subscription = Pedometer.watchStepCount((result) => {
				setCurrentStepCount(result.steps);
			});

			return subscription;
		}
	}

	useEffect(() => {
		subscribe().then((subscription) => {
			return () => subscription && subscription.remove();
		});
	}, []);

	return (
		<View style={styles.container}>
			<Text>Pedometer.isAvailableAsync(): {isPedometerAvailableString}</Text>
			<Text>Walk! And watch this go up: {currentStepCount}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 15,
		alignItems: "center",
		justifyContent: "center",
	},
});
