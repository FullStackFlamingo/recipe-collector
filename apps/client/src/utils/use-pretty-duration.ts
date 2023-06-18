import { parse as parseDuration } from 'tinyduration';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export function usePrettyDuration(duration?: string) {
  const { t } = useTranslation();

  const [prettyDuration, setPrettyDuration] = useState<string | null>(null);

  if (!duration) {
    setPrettyDuration(null);
  } else {
    try {
      const parsed = parseDuration(duration);
      type keyType = keyof typeof parsed;
      const allowedKeys: keyType[] = ['hours', 'minutes', 'seconds'];
      const prettyString = allowedKeys
        .reduce((out: string[], key) => {
          const parsedValue = parsed[key];
          if (typeof parsedValue === 'number') {
            out.push(`${parsedValue} ${t('global.duration', { count: parsedValue, context: key })}`);
          }
          return out;
        }, [])
        .join(', ');
      setPrettyDuration(prettyString);
    } catch (e) {
      console.error(e);
      setPrettyDuration(null);
    }
  }

  return prettyDuration;
}
