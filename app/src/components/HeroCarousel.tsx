import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { useTranslation } from './LanguageContext';

// Una diapositiva de la pasarela. `image` es opcional: si está vacío se muestra
// solo el texto. Todo esto vive en en.json / es.json (HeroSection.carousel)
// para que se pueda editar sin tocar el código.
type Slide = {
  title: string;
  text: string;
  image?: string;
};

const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  const { t } = useTranslation();

  // Las diapositivas se leen de las traducciones; si no hubiera ninguna,
  // devolvemos un array vacío y no renderizamos nada.
  const slidesRaw = t('HeroSection.carousel');
  const slides: Slide[] = Array.isArray(slidesRaw) ? slidesRaw : [];

  const [index, setIndex] = useState(0);
  const fade = useRef(new Animated.Value(1)).current;

  // Si cambia el idioma (y con él el número de slides) reseteamos el índice
  // para no quedarnos fuera de rango.
  useEffect(() => {
    setIndex((i) => (i < slides.length ? i : 0));
  }, [slides.length]);

  // Anima un cambio de diapositiva: funde a 0, cambia el índice y funde a 1.
  const goTo = (next: number) => {
    if (slides.length === 0) return;
    Animated.timing(fade, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      setIndex(((next % slides.length) + slides.length) % slides.length);
      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }).start();
    });
  };

  // Autoplay: avanza sola cada AUTOPLAY_MS. Se reinicia el temporizador cada
  // vez que cambia el índice para no acortar el tiempo tras un clic manual.
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[Math.min(index, slides.length - 1)];

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        {/* Etiqueta superior con el acento de la página. */}
        <View style={styles.tagRow}>
          <View style={styles.dot} />
          <Text style={styles.tag}>{t('HeroSection.carousel_label')}</Text>
        </View>

        <Animated.View style={[styles.slide, { opacity: fade }]}>
          {!!slide.image && (
            <Image source={{ uri: slide.image }} style={styles.image} resizeMode="contain" />
          )}
          <Text style={styles.slideTitle}>{slide.title}</Text>
          <Text style={styles.slideText}>{slide.text}</Text>
        </Animated.View>

        {/* Puntos de navegación: indican la diapositiva activa y permiten saltar. */}
        <View style={styles.dotsRow}>
          {slides.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => goTo(i)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Ir a la diapositiva ${i + 1}`}
            >
              <View style={[styles.pageDot, i === index && styles.pageDotActive]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 860,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    minHeight: 320,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 34,
    justifyContent: 'space-between',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  tag: {
    color: colors.textSecondary,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  image: {
    width: 56,
    height: 56,
    marginBottom: 4,
  },
  slideTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  slideText: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  pageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  pageDotActive: {
    backgroundColor: colors.accent,
    width: 22,
  },
});
