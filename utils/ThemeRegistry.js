'use client'
import { useEffect, useState } from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';
import { appWithTranslation } from 'next-i18next';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

function TranslationWrapper({children,dir}) {
  const  [{ cache, flush }] = useState(() => {
   const cache = createCache({key:"muitheme"});
   cache.compat = true;
   const prevInsert = cache.insert;
   let inserted = [];
   cache.insert = (...args) => {
     const serialized = args[1];
     if (cache.inserted[serialized.name] === undefined) {
       inserted.push(serialized.name);
     }
     return prevInsert(...args);
   };

   const flush = () => {
     const prevInserted = inserted;
     inserted = [];
     return prevInserted;
   };
   return { cache, flush };
 });
 const cacheRtl = createCache({
  key: "mui-style-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
  prepend: true,

});

const cacheLtr = createCache({
  key: "mui-style-ltr",
  prepend: true,

});

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });
  useEffect(() => {
    document.body.dir = dir;
    console.log('refresh')
  }, [dir]);
const choosenCache=dir=='ltr'?cacheLtr:cacheRtl;
  return (
    <>
      <CacheProvider value={{...cache,...choosenCache}}>
        <ThemeProvider theme={theme(dir)}>
          {children}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default appWithTranslation(TranslationWrapper);