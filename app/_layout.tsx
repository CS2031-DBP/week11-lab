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
						drawerLabel: "Acelerómetro",
						title: "Acelerómetro",
					}}
				/>
				<Drawer.Screen
					name="magnetometer/index"
					options={{
						drawerLabel: "Magnetómetro",
						title: "Magnetómetro",
					}}
				/>
				<Drawer.Screen
					name="pedometer/index"
					options={{
						drawerLabel: "Pedómetro",
						title: "Pedómetro",
					}}
				/>
				<Drawer.Screen
					name="imagePicker/index"
					options={{
						drawerLabel: "Image Picker",
						title: "Image Picker",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
