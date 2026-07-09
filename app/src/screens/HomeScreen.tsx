import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AboutSection from '../components/AboutSection';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import ProjectsSection from '../components/ProjectsSection';
import SkillsBar from '../components/SkillsBar';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const heroRef = useRef<View>(null);
  const aboutRef = useRef<View>(null);

  // Hace scroll suave hasta la sección indicada. Medimos la posición Y de la
  // sección relativa al contenido del ScrollView (measureLayout) y llamamos a
  // scrollTo; así funciona aunque la sección esté anidada en columnas.
  const scrollToSection = (target: 'home' | 'about') => {
    const scroll = scrollRef.current;
    const section = (target === 'about' ? aboutRef : heroRef).current;
    if (!scroll || !section) return;

    const innerNode = (scroll as any).getInnerViewNode?.();
    if (innerNode && (section as any).measureLayout) {
      (section as any).measureLayout(
        innerNode,
        (_x: number, y: number) => {
          scroll.scrollTo({ y: Math.max(y - 24, 0), animated: true });
        },
        () => {}
      );
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.content}>
        <Navbar onNavigate={scrollToSection} />
        <View ref={heroRef} collapsable={false}>
          <HeroSection />
        </View>
        <SkillsBar />
        {/* Fila en dos columnas: proyectos a la izquierda, "Sobre mí" a la
            derecha. AboutSection ya alinea su contenido a la derecha. */}
        <View style={styles.aboutRow}>
          <View style={styles.projectsCol}>
            <ProjectsSection />

          </View>
          <View ref={aboutRef} collapsable={false} style={styles.aboutCol}>
            <AboutSection />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    backgroundColor: colors.background,
  },
  content: {
    minWidth: 1024,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    minHeight: 400,
  },
  projectsCol: {
    margin: 30,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: colors.border,
    flex: 1.75,
  },
  aboutCol: {
    marginTop: 30,
    flex: 1,
  },
});