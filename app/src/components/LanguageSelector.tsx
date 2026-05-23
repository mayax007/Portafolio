import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors } from '../theme/colors';
import { LangCode } from './i18n';

type LanguageSelectorProps = {
  selected: LangCode;
  onSelect: (code: LangCode) => void;
};

const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSelector({ selected, onSelect }: LanguageSelectorProps) {
  const underlineAnim = useRef(new Animated.Value(
    LANGUAGES.findIndex((l) => l.code === selected)
  )).current;

  const ITEM_WIDTH = 28;
  const GAP = 12;

  const handleSelect = (code: LangCode, index: number) => {
    Animated.spring(underlineAnim, {
      toValue: index,
      useNativeDriver: true,
      tension: 180,
      friction: 18,
    }).start();
    onSelect(code);
  };

  const translateX = underlineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ITEM_WIDTH + GAP],
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabs}>
        {LANGUAGES.map((lang, index) => {
          const isActive = lang.code === selected;
          return (
            <TouchableOpacity
              key={lang.code}
              onPress={() => handleSelect(lang.code, index)}
              activeOpacity={0.7}
              style={styles.tab}
            >
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {lang.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Underline animado */}
      <Animated.View
        style={[styles.underline, { transform: [{ translateX }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-start',
  },
  tabs: {
    flexDirection: 'row',
    gap: 12,
  },
  tab: {
    width: 28,
    alignItems: 'center',
    paddingBottom: 4,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    letterSpacing: 0.8,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.textPrimary,
  },
  underline: {
    width: 28,
    height: 1.5,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
});