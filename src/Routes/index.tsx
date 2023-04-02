import { Route, Routes, Navigate } from 'react-router-dom';

import ToDoMain from '../Components/core';

const MainRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<ToDoMain />} />
        <Route
          path={"/todo"}
          element={<ToDoMain />}
        />
      </Routes>
    </div>
  );
}

export default MainRoutes;


