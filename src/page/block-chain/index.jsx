import React from 'react';
import { renderRoutes } from 'react-router-config';

function BlockChainPage({
  route,
}) {
  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  );
}

export default BlockChainPage;
