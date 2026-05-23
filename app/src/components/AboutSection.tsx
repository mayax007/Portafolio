import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from './LanguageContext';
import { colors } from '../theme/colors';

export default function AboutSection() {
  const { t } = useTranslation();

  const STATS: string[] = Object.values(t('AboutSection.stats') as Record<string, string>);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.heading}>{t('AboutSection.title')}</Text>
        <Text style={styles.body}>
          {t('AboutSection.about_me')}
        </Text>

        <View style={styles.stats}>
          {STATS.map((s, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statLabel}>{s}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: 80,
    paddingHorizontal: 80,
    alignItems: 'flex-end',
  },
  inner: {
    maxWidth: 560,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 20,
  },
  body: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 26,
    marginBottom: 40,
  },
  stats: {
    flexDirection: 'row',
    gap: 40,
  },
  statItem: {},
  statValue: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
});