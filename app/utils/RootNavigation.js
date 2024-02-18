import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
    console.log("READY CHECK");
    if (navigationRef.isReady()) {
        console.log("NAVIGATING TO", name);
        navigationRef.navigate(name, params);
    }
}