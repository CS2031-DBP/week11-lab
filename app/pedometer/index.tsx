import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, PermissionsAndroid } from 'react-native';

export default function PedometerScreen() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>Pedometer Screen</Text>
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
