import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from './LanguageContext';
import { colors } from '../theme/colors';
import HeroCarousel from './HeroCarousel';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.helloRow}>
          <Text style={styles.hello}>{t('HeroSection.welcome')}</Text>
          <View style={styles.dot} />
        </View>
        <Text style={styles.intro}>{t('HeroSection.intro')}Héctor</Text>
        <Text style={styles.title}>{t('HeroSection.position')}</Text>
      </View>

      {/* Pasarela editable desde en.json / es.json (HeroSection.carousel). */}
      <HeroCarousel />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    paddingVertical: 80,
    backgroundColor: colors.background,
    minHeight: 520,
    zIndex: 1,
  },
  content: {
    flex: 1,
    maxWidth: 480,
  },
  helloRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  hello: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
    marginLeft: 6,
    marginTop: 8,
  },
  intro: {
    color: colors.textSecondary,
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 40,
  },
});