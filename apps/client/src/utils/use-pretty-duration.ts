import { parse as parseDuration } from 'tinyduration';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export function usePrettyDuration(duration?: string) {
  const { t } = useTranslation();

  return useMemo(() => {
    if (!duration) {
      return null;
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
        return prettyString;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);
}
