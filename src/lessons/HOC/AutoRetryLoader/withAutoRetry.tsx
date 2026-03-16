import React, { useEffect, useState } from "react";

// Улучшенная типизация: разделяем "внешние" пропсы (P) и инжектируемые ({ data: D })
export function withAutoRetry<P extends object, D>(
  Component: React.ComponentType<P & { data: D }>,
  fetchFn: () => Promise<D>,
  maxRetries = 3,
  Loader?: React.ComponentType,
  ErrorFallback?: React.ComponentType<{ error: Error }>,
) {
  // Возвращаем компонент, который принимает только внешние пропсы P
  const WrapperComponent: React.FC<P> = (props) => {
    const [retry, setRetry] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<D | null>(null);

    useEffect(() => {
      let isMounted = true;
      let timeoutId: NodeJS.Timeout; // Переменная для таймера
      setLoading(true);

      fetchFn()
        .then((fetchedData) => {
          if (!isMounted) return;
          setLoading(false);
          setError(null);
          setData(fetchedData);
        })
        .catch((err) => {
          if (!isMounted) return;

          if (retry < maxRetries) {
            timeoutId = setTimeout(() => {
              if (isMounted) setRetry((count) => count + 1);
            }, 1000);
          } else {
            setLoading(false);
            setError(err);
          }
        });

      return () => {
        isMounted = false;
        if (timeoutId) clearTimeout(timeoutId); // Отменяем таймер при размонтировании
      };
    }, [retry, fetchFn, maxRetries]); // Теперь eslint доволен, а зависимости безопасны

    if (loading) return Loader ? <Loader /> : <div>Загрузка...</div>;

    if (error) return ErrorFallback ? <ErrorFallback error={error} /> : <div>Произошла ошибка</div>;

    // TypeScript больше не ругается! Мы просто объединяем P и { data: D }
    return data ? <Component {...props} data={data} /> : null;
  };

  WrapperComponent.displayName = `withAutoRetry(${Component.displayName || Component.name || "Component"})`;

  return WrapperComponent;
}
