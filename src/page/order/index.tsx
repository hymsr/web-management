import React from 'react';
import { renderRoutes } from 'react-router-config';

function GoodPage({
  route,
}) {
  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  );
}

export default GoodPage;
