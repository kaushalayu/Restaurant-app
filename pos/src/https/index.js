import { axiosWrapper } from "./axiosWrapper";

// Auth Endpoints
export const login = (data) =>
  axiosWrapper.post("/api/user/login", data, { withCredentials: true });

export const register = (data) =>
  axiosWrapper.post("/api/user/register", data);

// ⭐ MUST SEND COOKIES HERE
export const getUserData = () =>
  axiosWrapper.get("/api/user", { withCredentials: true });

export const logout = () =>
  axiosWrapper.post("/api/user/logout", {}, { withCredentials: true });

// Table Endpoints
export const addTable = (data) =>
  axiosWrapper.post("/api/table/", data, { withCredentials: true });

export const getTables = () =>
  axiosWrapper.get("/api/table", { withCredentials: true });

export const updateTable = ({ tableId, ...tableData }) =>
  axiosWrapper.put(`/api/table/${tableId}`, tableData, {
    withCredentials: true,
  });

// Payment Endpoints
export const createOrderRazorpay = (data) =>
  axiosWrapper.post("/api/payment/create-order", data, {
    withCredentials: true,
  });

export const verifyPaymentRazorpay = (data) =>
  axiosWrapper.post("/api/payment/verify-payment", data, {
    withCredentials: true,
  });

// Order Endpoints
export const addOrder = (data) =>
  axiosWrapper.post("/api/order/", data, { withCredentials: true });

export const getOrders = () =>
  axiosWrapper.get("/api/order", { withCredentials: true });

export const updateOrderStatus = ({ orderId, orderStatus }) =>
  axiosWrapper.put(
    `/api/order/${orderId}`,
    { orderStatus },
    { withCredentials: true }
  );
