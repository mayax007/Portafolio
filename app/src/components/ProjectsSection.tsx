import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors } from '../theme/colors';
import ProjectCard, { Proyecto } from './ProjectCard';
import { useTranslation } from './LanguageContext';

// Proporción respecto al ancho de la ventana. Antes el ancho era fijo (1000)
// en una pantalla de 1920, así que mantenemos esa misma relación (~0.52).
const LIST_WIDTH_RATIO = 1000 / 1920;

export default function ProjectsSection() {
  const { t } = useTranslation();

  // El ancho de la lista escala con el ancho de la ventana en vez de ser
  // constante: reactivo al máximo de la pantalla, manteniendo la proporción.
  // Durante el export estático (Vercel) no existe `window`, así que
  // useWindowDimensions devuelve 0; en ese caso dejamos la lista sin tope
  // (undefined) para que ocupe el ancho de su columna en vez de colapsar a 0
  // y ocultar el texto de las tarjetas.
  const { width: windowWidth } = useWindowDimensions();
  const listWidth = windowWidth > 0 ? windowWidth * LIST_WIDTH_RATIO : undefined;

  // Los proyectos viven en en.json / es.json (ProjectsSection.projects),
  // así se traducen junto al resto de la página.
  const data = t('ProjectsSection.projects') as Proyecto[];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('ProjectsSection.title')}</Text>

      <View style={[styles.list, listWidth ? { maxWidth: listWidth } : null]}>
        {data.map((proyecto) => (
          <ProjectCard key={proyecto.id} proyecto={proyecto} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingLeft: 80,
    paddingRight: 56,
    borderRightColor: colors.border,
    minHeight: 400,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 28,
  },
  list: {
    gap: 16,
  },
});
