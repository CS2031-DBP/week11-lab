import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, PermissionsAndroid } from 'react-native';
import { Pedometer } from 'expo-sensors';

export default function PedometerScreen() {
	const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
	const [currentStepCount, setCurrentStepCount] = useState(0);

	const requestPermission = async () => {
		if (Platform.OS === 'android') {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
				{
					title: "Permiso de Reconocimiento de Actividad",
					message: "La aplicación necesita acceso al reconocimiento de actividad para contar pasos.",
					buttonNeutral: "Preguntar Más Tarde",
					buttonNegative: "Cancelar",
					buttonPositive: "Aceptar",
				}
			);
			return granted === PermissionsAndroid.RESULTS.GRANTED;
		}
		return true;
	};

	const subscribe = async () => {
		const permissionGranted = await requestPermission();
		if (!permissionGranted) {
			console.log("Permiso de reconocimiento de actividad no concedido");
			return;
		}

		const isAvailable = await Pedometer.isAvailableAsync();
		setIsPedometerAvailable(String(isAvailable));

		if (isAvailable) {
			const subscription = Pedometer.watchStepCount((result) => {
				setCurrentStepCount(result.steps);
			});
			return subscription;
		}
	};

	useEffect(() => {
		subscribe().then(subscription => {
			return () => subscription && subscription.remove();
		});
	}, []);

	return (
		<View style={styles.container}>
			<Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
			<Text>Walk! And watch this go up: {currentStepCount}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
