import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { LanguageProvider } from './src/components/LanguageContext';

export default function App() {
  return (
    <LanguageProvider initialLang="es">
      <HomeScreen />
    </LanguageProvider>
  );
}