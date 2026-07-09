import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from './LanguageContext';
import { colors } from '../theme/colors';
import LanguageSelector from './LanguageSelector';
import { LangCode } from './i18n';

// Los enlaces del navbar hacen scroll a una sección. El orden coincide con
// NavBar.links en las traducciones: 0 -> Inicio (hero), 1 -> Sobre mí (about).
type Props = {
  onNavigate?: (target: 'home' | 'about') => void;
};

const LINK_TARGETS: ('home' | 'about')[] = ['home', 'about'];

export default function Navbar({ onNavigate }: Props) {
  const { t, lang, setLanguage } = useTranslation();

  const NAV_LINKS: string[] = Object.values(t('NavBar.links') as Record<string, string>);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Héctor Mayayo</Text>

      <View style={styles.links}>
        {NAV_LINKS.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onNavigate?.(LINK_TARGETS[index] ?? 'home')}
          >
            <Text style={styles.link}>{link}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.link}>{t('language')}:</Text>
          <LanguageSelector
            selected={lang}
            onSelect={(code) => setLanguage(code as LangCode)}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 24,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  links: {
    flexDirection: 'row',
    gap: 30,
  },
  link: {
    color: colors.textSecondary,
    fontSize: 14,
    letterSpacing: 0.5,
  },
});