import React from 'react';
import { renderRoutes } from 'react-router-config';

function AdPage({
  route,
}) {
  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  );
}

export default AdPage;
