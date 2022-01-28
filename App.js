import { NavigationContainer } from '@react-navigation/native';
import react from 'react';
import StackNavigator from './StackNavigator';


export default function App() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
}

