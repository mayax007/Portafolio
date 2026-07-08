import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AboutSection from '../components/AboutSection';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import ProjectsSection from '../components/ProjectsSection';
import SkillsBar from '../components/SkillsBar';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Navbar />
        <HeroSection />
        <SkillsBar />
        {/* Fila en dos columnas: proyectos a la izquierda, "Sobre mí" a la
            derecha. AboutSection ya alinea su contenido a la derecha. */}
        <View style={styles.aboutRow}>
          <View style={styles.projectsCol}>
            <ProjectsSection />
            
          </View>
          <View style={styles.aboutCol}>
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