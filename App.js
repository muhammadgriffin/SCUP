import * as React from 'react';
import { AuthProvider } from './components/AuthContext'; // or wherever the file is located
import MainNavigation from './MainNavigation'; // This is the new child component 

export default function App() {

    return (
        <AuthProvider>
          <MainNavigation />
        </AuthProvider>
    );
}
