import {
  QueryClient,
} from '@tanstack/react-query';

export const queryClient = new QueryClient({

  defaultOptions: {

    queries: {

      /**
       * Tiempo que los datos se consideran frescos.
       * 5 minutos.
       */
      staleTime: 1000 * 60 * 5,



      /**
       * Tiempo en caché.
       * 10 minutos.
       */
      gcTime: 1000 * 60 * 10,



      /**
       * Reintentos automáticos.
       */
      retry: 2,



      /**
       * Evita refetch excesivo al cambiar pestaña.
       */
      refetchOnWindowFocus: false,



      /**
       * Refetch automático al reconectar internet.
       */
      refetchOnReconnect: true,
    },



    mutations: {

      retry: 1,
    },
  },
});