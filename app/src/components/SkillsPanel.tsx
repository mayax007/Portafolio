import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import { colors } from '../theme/colors';
import { useTranslation } from './LanguageContext';

type Skill = {
  name: string;
  image: string;
};

type Props = {
  items: Skill[];
};

export default function SkillsPanel({ items }: Props) {
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;

  // Nombre de la skill sobre la que está el ratón (para mostrar su tooltip).
  const [hovered, setHovered] = useState<string | null>(null);

  // Descripciones traducidas (viven en en.json / es.json -> SkillsBar.descriptions),
  // indexadas por el nombre de la skill.
  const descriptions = (t('SkillsBar.descriptions') as Record<string, string>) ?? {};

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(-10);
    setHovered(null);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [items]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {items.map((skill) => {
        const description = descriptions[skill.name];
        const isHovered = hovered === skill.name;
        return (
          <Pressable
            key={skill.name}
            style={styles.item}
            onHoverIn={() => setHovered(skill.name)}
            onHoverOut={() => setHovered((h) => (h === skill.name ? null : h))}
          >
            {/* Tooltip: aparece encima del icono al pasar el ratón. */}
            {isHovered && !!description && (
              <View style={styles.tooltip} pointerEvents="none">
                <Text style={styles.tooltipTitle}>{skill.name}</Text>
                <Text style={styles.tooltipText}>{description}</Text>
                <View style={styles.tooltipArrow} />
              </View>
            )}
            <Image
              source={{ uri: skill.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.name}>{skill.name}</Text>
          </Pressable>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 32,
    paddingHorizontal: 60,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  item: {
    alignItems: 'center',
    gap: 10,
    width: 72,
    // relative -> el tooltip absoluto se posiciona respecto a cada item.
    position: 'relative',
  },
  image: {
    width: 48,
    height: 48,
  },
  name: {
    fontSize: 11,
    color: colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  tooltip: {
    position: 'absolute',
    // Encima del icono, centrado sobre el item (item mide 72 de ancho).
    bottom: '100%',
    marginBottom: 12,
    width: 220,
    left: 36,
    marginLeft: -110,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 4,
    zIndex: 10,
    // Sombra sutil para separarlo del fondo.
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  tooltipTitle: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tooltipText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -6,
    width: 12,
    height: 12,
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    transform: [{ rotate: '45deg' }],
  },
});
