import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';

export default function MagnetometerScreeen() {
	const [{ x, y, z }, setData] = useState({
		x: 0,
		y: 0,
		z: 0,
	});

	const [subscription, setSubscription] = useState<ReturnType<typeof Magnetometer.addListener> | null>(null);

	const _slow = () => Magnetometer.setUpdateInterval(1000);
	const _fast = () => Magnetometer.setUpdateInterval(100);

	const _subscribe = () => {
		setSubscription(
			Magnetometer.addListener(result => {
				setData(result);
			})
		);
	};

	const _unsubscribe = () => {
		subscription && subscription.remove();
		setSubscription(null);
	};

	const getDirection = (x: number, y: number): number => {
		let angle = Math.atan2(y, x) * (180 / Math.PI);
		return angle >= 0 ? angle : angle + 360;
	};

	const getCompassDirection = (angle: number): string => {
		if ((angle >= 315 && angle <= 360) || (angle >= 0 && angle < 45)) {
			return "Norte";
		} else if (angle >= 45 && angle < 135) {
			return "Este";
		} else if (angle >= 135 && angle < 225) {
			return "Sur";
		} else if (angle >= 225 && angle < 315) {
			return "Oeste";
		} else {
			return "Indefinido";
		}
	};

	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Magnetometer:</Text>
			<Text style={styles.text}>x: {x.toFixed(4)}</Text>
			<Text style={styles.text}>y: {y.toFixed(4)}</Text>
			<Text style={styles.text}>z: {z.toFixed(4)}</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
					<Text>{subscription ? 'On' : 'Off'}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
					<Text>Slow</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={_fast} style={styles.button}>
					<Text>Fast</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.text}>Direction: {getDirection(x, y).toFixed(2)}°</Text>
			<Text style={styles.text}>Direction: {getCompassDirection(getDirection(x, y))}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	text: {
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'stretch',
		marginTop: 15,
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eee',
		padding: 10,
	},
	middleButton: {
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: '#ccc',
	},
});
