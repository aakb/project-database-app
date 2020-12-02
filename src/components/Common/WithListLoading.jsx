import React from 'react';
import { useTranslate } from 'react-translate'

function WithListLoading(Component) {
  const t = useTranslate('common')

  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{ textAlign: 'center', fontSize: '30px' }}>
        {t('Hold on, fetching data may take some time :)')}
      </p>
    );
  };
}
export default WithListLoading;
