import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { useTranslation } from './LanguageContext';
import { colors } from '../theme/colors';
import skillsdata from '../../../assets/data/skills.json';
import SkillsPanel from './SkillsPanel';

type SkillKey = 'programming' | 'db' | 'tech' | 'github';
 
const SKILL_KEYS: SkillKey[] = [
  'programming',
  'db',
  'tech',
  'github',
];

export default function SkillsBar() {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState<SkillKey | null>('programming');

  const SKILLS: string[] = Object.values(t('SkillsBar.skills') as Record<string, string>);

  const handlePress = (key: SkillKey) => {
    if (key === 'github') {
      Linking.openURL((skillsdata.github as { url: string }).url);
      return;
    }
    setActiveKey(key);
  };

  return (
    <View>
      <View style={styles.container}>
        {SKILL_KEYS.map((key, index) => {
          const isActive = activeKey === key;
          return (
            <React.Fragment key={key}>
              <TouchableOpacity
                style={styles.skillWrap}
                onPress={() => handlePress(key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.skill, isActive && styles.skillActive]}>
                  {SKILLS[index]}
                </Text>
                {isActive && <View style={styles.activeUnderline} />}
              </TouchableOpacity>
              {index < SKILL_KEYS.length - 1 && (
                <View style={styles.separator} />
              )}
            </React.Fragment>
          );
        })}
      </View>
 
      {activeKey && activeKey !== 'github' && (
        <SkillsPanel
          items={skillsdata[activeKey] as { name: string; image: string }[]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    gap: 0,
  },
  skill: {
    color: colors.textSecondary,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    paddingHorizontal: 28,
  },
  skillActive: {
    color: colors.textPrimary,
  },
  skillWrap: {
    alignItems: 'center',
    paddingHorizontal: 28,
    gap: 6,
  },
  activeUnderline: {
    height: 1.5,
    width: '100%',
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  separator: {
    width: 1,
    height: 16,
    backgroundColor: colors.border,
  },
});