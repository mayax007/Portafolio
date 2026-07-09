import React from 'react';
import { Linking, Platform, Pressable, PressableProps } from 'react-native';

type Props = PressableProps & {
  url: string;
  children: React.ReactNode;
};

// Enlace externo robusto.
//
// En web renderizamos un ancla real (<a href target="_blank">) en lugar de
// llamar a `Linking.openURL`. `Linking.openURL` acaba en
// `window.open(url, '_blank', 'noopener')`, que el bloqueador de pop-ups del
// navegador bloquea en dominios reales (Vercel) aunque funcione en localhost.
// Un <a> nativo navega directamente y nunca se bloquea, así que los enlaces
// vuelven a funcionar en producción (y además permiten abrir en pestaña nueva
// con el clic central, etc.).
//
// react-native-web convierte un View/Pressable con la prop `href` en un <a>,
// así que Pressable + href nos da el ancla manteniendo los estilos de press.
// En nativo no existe `href`, así que caemos en `Linking.openURL`.
export default function ExternalLink({ url, children, onPress, ...rest }: Props) {
  const webProps =
    Platform.OS === 'web'
      ? ({ href: url, hrefAttrs: { target: '_blank', rel: 'noopener noreferrer' } } as object)
      : {};

  return (
    <Pressable
      accessibilityRole="link"
      {...rest}
      {...webProps}
      onPress={(e) => {
        // En web el propio <a> se encarga de navegar; en nativo abrimos la URL.
        if (Platform.OS !== 'web') {
          Linking.openURL(url);
        }
        onPress?.(e);
      }}
    >
      {children}
    </Pressable>
  );
}
