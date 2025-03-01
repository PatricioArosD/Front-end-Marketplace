import React, { useEffect, useState, useContext } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext"; // Import CartContext
import { UserContext } from "../context/UserContext"; // Import UserContext

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]); // State to store statuses
  const { carrito, total_price, formatted_total } = useContext(CartContext); // Use CartContext
  const { token, user } = useContext(UserContext); // Use UserContext to get user data

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders/user/${user.id}`, {
          // Include user_id in the request URL
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchStatuses = async () => {
      try {
        const response = await axios.get("/status", {
          // Fetch statuses from the API
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setStatuses(response.data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    fetchOrders();
    fetchStatuses();
  }, [token, user.id]);

  const getStatusName = (statusId) => {
    const status = statuses.find((status) => status.id === statusId);
    return status ? status.name : "Desconocido";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container py-5">
      <h1 className="py-5">Historial de Pedidos</h1>
      <div className="table-responsive">
      <Table
        striped
        bordered
        hover
        responsive
        className="table table-striped table-hover text-center "
      >
        <thead>
          <tr>
            <th >Orden #</th>
            <th >Total</th>
            <th >Estado</th>
            <th >Detalle</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td >{order.id}</td>
              <td >{formatCurrency(order.total)}</td>
              <td >{getStatusName(order.status_id)}</td>
              <td className="text-center">
                <Link className="btn btn-primary" to={`/order/${order.id}`}>Ver detalles del pedido</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default Order;
