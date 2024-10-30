import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer>
				<Drawer.Screen
					name="index"
					options={{
						drawerLabel: "Home",
						title: "Home",
					}}
				/>
				<Drawer.Screen
					name="accelerometer/index"
					options={{
						drawerLabel: "Accelerometer",
						title: "Expo Accelerometer",
					}}
				/>
				<Drawer.Screen
					name="magnetometer/index"
					options={{
						drawerLabel: "Magnometer",
						title: "Expo Magnometer",
					}}
				/>
				<Drawer.Screen
					name="pedometer/index"
					options={{
						drawerLabel: "Pedometer",
						title: "Expo Pedometer",
					}}
				/>
				<Drawer.Screen
					name="imagePicker/index"
					options={{
						drawerLabel: "ImagePicker",
						title: "Expo ImagePicker",
					}}
				/>
				<Drawer.Screen
					name="camera/index"
					options={{
						drawerLabel: "Camera",
						title: "Expo Camera",
					}}
				/>
				<Drawer.Screen
					name="location/index"
					options={{
						drawerLabel: "Location",
						title: "Expo Location",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
