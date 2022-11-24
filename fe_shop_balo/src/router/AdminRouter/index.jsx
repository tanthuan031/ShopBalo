import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../../layouts/Admin';
import { CategoryPage } from '../../pages/Admin/CategoryPage';
import { DashBoardPage } from '../../pages/Admin/DashBoardPage';
import { LoginPage } from '../../pages/Admin/LoginPage';
import { ProductPage } from '../../pages/Admin/ProductPage';
import OrderPage from '../../pages/Admin/Order';
import ReviewPage from '../../pages/Admin/ReviewPage';
import { StaffPage } from '../../pages/Admin/StaffPage';
import { ProtectedRoutes } from '../ProtectedRouters';
import PromotionPage from './../../pages/Admin/PromotionPage';
import { CustomerPage } from '../../pages/Admin/CustomerPage';
// import { checkLogin, handleGetInformation } from '../../api/Auth';
import { setIsLogin, setUser } from '../../redux/reducer/auth/auth.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector, isLoginSelector } from '../../redux/selectors/auth/auth.reducer';
import { checkLogin, handleGetMe } from '../../adapter/auth';
import { deleteCookie, getCookies } from '../../api/Admin/Auth';

import SliderPage from '../../pages/Admin/SliderPage';
import { StoragePage } from '../../pages/Admin/WareHouse/StoragePage';
import NotFoundData from '../../components/commons/Layouts/NotFoundData';
import { ImportStoragePage } from '../../pages/Admin/WareHouse/ImportStoragePage';
import { ExportStoragePage } from '../../pages/Admin/WareHouse/ExportStoragePage';
import StatisticStorage from '../../pages/Admin/WareHouse/StatictisStorage';
import PermissionManagerPage from '../../pages/Admin/PermissionManagerPage';
export default function AdminRouter() {
  const dispatch = useDispatch();
  const isAuthenticate = useSelector(isLoginSelector);
  useEffect(() => {
    handleGetMe().then((result) => {
      if (result === 401) {
        const token = getCookies('token');
        dispatch(setIsLogin(false));
        if (token) {
          deleteCookie('token');
        }
      } else {
        dispatch(setIsLogin(true));
        dispatch(setUser(result));
      }
    });
  }, [dispatch]);
  const user = useSelector(getUserSelector);
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/register" element={<div>Register</div>} />
      <Route element={<ProtectedRoutes isAuthenticate={isAuthenticate} userRole={user} />}>
        {/* {user && user.role_id === 1 && ( */}
        <>
          <Route path="/admin" element={<AdminLayout slot={<DashBoardPage key={'a'} />} />} />
          <Route path="/admin/product" element={<AdminLayout slot={<ProductPage key={'1'} />} />} />
          <Route path="/admin/category" element={<AdminLayout slot={<CategoryPage key={'a'} />} />} />
          <Route path="/admin/promotion" element={<AdminLayout slot={<PromotionPage key={'a'} />} />} />
          <Route path="/admin/order" element={<AdminLayout slot={<OrderPage key={'a'} />} />} />
          <Route path="/admin/staff" element={<AdminLayout slot={<StaffPage key={'a'} />} />} />
          <Route path="/admin/customer" element={<AdminLayout slot={<CustomerPage key={'a'} />} />} />
          <Route path="/admin/review" element={<AdminLayout slot={<ReviewPage key={'a'} />} />} />
          <Route path="/admin/decentralization" element={<AdminLayout slot={<PermissionManagerPage key={'a'} />} />} />
          <Route path="/admin/slider" element={<AdminLayout slot={<SliderPage key={'a'} />} />} />
          {/* </> */}
          {/* )} */}
          {/* Storage */}
          {/* {user && user.role_id === 2 && (
          <> */}
          <Route path="/admin/warehouse/" element={<AdminLayout slot={<StatisticStorage key={'a'} />} />} />
          <Route path="/admin/warehouse/storage" element={<AdminLayout slot={<StoragePage key={'a'} />} />} />
          <Route
            path="/admin/warehouse/exportstorage"
            element={<AdminLayout slot={<ExportStoragePage key={'a'} />} />}
          />
          <Route
            path="/admin/warehouse/importstorage"
            element={<AdminLayout slot={<ImportStoragePage key={'a'} />} />}
          />
          <Route path="/admin/warehouse/provider" element={<AdminLayout slot={<SliderPage key={'a'} />} />} />
        </>
        {/* )}
        {((user && user.role_id !== 2) || user.role_id !== 1) && (
          <Route path="/admin/*" element={<NotFoundData />}></Route>
        )} */}
      </Route>
    </Routes>
  );
}
