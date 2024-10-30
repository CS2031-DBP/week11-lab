import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Coordinate {
	x: number;
	y: number;
	z: number;
}

export default function AccelerometerScreen() {
	const [coordinate, setCoordinate] = useState<Coordinate>({
		x: 0,
		y: 0,
		z: 0,
	});

	const [subscription, setSubscription] = useState<ReturnType<
		typeof Accelerometer.addListener
	> | null>(null);

	function _slow() {
		Accelerometer.setUpdateInterval(1000);
	}

	function _fast() {
		Accelerometer.setUpdateInterval(100);
	}

	function _subscribe() {
		setSubscription(Accelerometer.addListener(setCoordinate));
	}

	function _unsubscribe() {
		subscription && subscription.remove();
		setSubscription(null);
	}

	function getOrientation(x: number, y: number, z: number): string {
		if (Math.abs(x) < 0.2 && Math.abs(y) < 0.2 && z > 0.8) {
			return "Boca Arriba";
		} else if (Math.abs(x) < 0.2 && Math.abs(y) < 0.2 && z < -0.8) {
			return "Boca Abajo";
		} else if (Math.abs(x) > 0.8 && Math.abs(y) < 0.2) {
			return x > 0 ? "Horizontal (Izquierda)" : "Horizontal (Derecha)";
		} else if (Math.abs(y) > 0.8 && Math.abs(x) < 0.2) {
			return y > 0 ? "Vertical (Arriba)" : "Vertical (Abajo)";
		} else {
			return "Indefinido";
		}
	}

	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Accelerometer: (in gs where 1g = 9.81 m/s^2)
			</Text>

			<Text style={styles.text}>x: {coordinate.x.toFixed(4)}</Text>

			<Text style={styles.text}>y: {coordinate.y.toFixed(4)}</Text>

			<Text style={styles.text}>z: {coordinate.z.toFixed(4)}</Text>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={subscription ? _unsubscribe : _subscribe}
					style={styles.button}
				>
					<Text>{subscription ? "On" : "Off"}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={_slow}
					style={[styles.button, styles.middleButton]}
				>
					<Text>Slow</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={_fast} style={styles.button}>
					<Text>Fast</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.text}>
				Orientation: {getOrientation(coordinate.x, coordinate.y, coordinate.z)}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	text: {
		textAlign: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "stretch",
		marginTop: 15,
	},
	button: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#eee",
		padding: 10,
	},
	middleButton: {
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: "#ccc",
	},
});
