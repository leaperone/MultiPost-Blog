import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source, {
  localeMap: {
    // Map unsupported languages to English tokenizer
    // Orama doesn't support: ms (Malay), zh-Hans, zh-Hant, ja, ko
    'ms': 'english',
    'zh-Hans': 'english',
    'zh-Hant': 'english',
    'ja': 'english',
    'ko': 'english',
    // Supported languages use their native tokenizers
    'en': 'english',
    'fr': 'french',
    'es': 'spanish',
    'pt': 'portuguese',
    'id': 'indonesian',
    'ru': 'russian',
  },
});
