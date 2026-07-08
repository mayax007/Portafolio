import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export type Proyecto = {
  id: string;
  nombre: string;
  descripcion: string;
  url: string;
};

type Props = {
  proyecto: Proyecto;
};

export default function ProjectCard({ proyecto }: Props) {
  const [expanded, setExpanded] = useState(false);

  const abrirEnlace = () => {
    // Linking.openURL funciona tanto en web como en nativo.
    Linking.openURL(proyecto.url);
  };

  return (
    <View style={styles.card}>
      {/* Pulsar el encabezado expande/colapsa la tarjeta. */}
      <Pressable onPress={() => setExpanded((prev) => !prev)} style={styles.header}>
        <Text
          style={styles.nombre}
          // flex: 1 -> el texto ocupa todo el ancho disponible y empuja el
          // botón hacia la derecha. Al expandir quitamos numberOfLines para
          // que el nombre completo se muestre en varias líneas; el ancho del
          // encabezado NO cambia, solo crece en altura.
          numberOfLines={expanded ? undefined : 1}
          ellipsizeMode="tail"
        >
          {proyecto.nombre}
        </Text>

        {/* Botón-icono: abre la url. Es un Pressable anidado, así que al
            pulsarlo se abre el enlace sin disparar el toggle del encabezado. */}
        <Pressable
          onPress={abrirEnlace}
          // flexShrink: 0 + ancho fijo -> el botón nunca se comprime ni se
          // deforma aunque el nombre crezca. alignSelf: 'flex-start' (vía el
          // alignItems del header) lo mantiene arriba a la derecha sin saltar.
          style={styles.iconButton}
          hitSlop={8}
          accessibilityRole="link"
          accessibilityLabel={`Abrir ${proyecto.nombre}`}
        >
          <Ionicons name="open-outline" size={20} color={colors.accent} />
        </Pressable>
      </Pressable>
      {expanded && (
        <>
          {/* Línea fina que separa el nombre de la descripción, en el mismo
              gris de los bordes para mantener el estilo de la página. */}
          <View style={styles.separator} />
          <Text style={styles.descripcion}>{proyecto.descripcion}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  nombre: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  iconButton: {
    width: 28,
    height: 28,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginTop: 12,
  },
  descripcion: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
});
