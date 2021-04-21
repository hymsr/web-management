import React from 'react';
import { renderRoutes } from 'react-router-config';

export default function SubmenuPage({
  route,
}) {
  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  );
}
