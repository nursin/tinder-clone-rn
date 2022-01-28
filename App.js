import { NavigationContainer } from '@react-navigation/native';
import react from 'react';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';


export default function App() {
    return (
        <NavigationContainer>
            {/* HOC - Higher Order Component */}
            <AuthProvider>
                {/* Passes down the cool auth stuff to children  */}
                <StackNavigator />
            </AuthProvider>
        </NavigationContainer>
    );
}

