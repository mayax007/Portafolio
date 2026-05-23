import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AboutSection from '../components/AboutSection';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import SkillsBar from '../components/SkillsBar';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Navbar />
        <HeroSection />
        <SkillsBar />
        <View style={styles.aboutRow}>
          <AboutSection />
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
    position: 'relative',
    backgroundColor: colors.background,
    minHeight: 400,
  },
});