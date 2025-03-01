import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Import UserContext

const OrderDetail = () => {
  const { id } = useParams(); // Get order ID from URL parameters
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const { token } = useContext(UserContext); // Use UserContext to get user data

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request headers
          }
        });
        setOrder(response.data.order);

        if (response.data.details) {
          // Fetch product details for each product in the order
          const productDetails = await Promise.all(
            response.data.details.map(async (detail) => {
              const productResponse = await axios.get(`/productos/${detail.product_id}`, {
                headers: {
                  Authorization: `Bearer ${token}` // Include the token in the request headers
                }
              });
              return {
                ...detail,
                ...productResponse.data
              };
            })
          );
          setOrderDetails(productDetails);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetail();
  }, [id, token]);

  if (!order) {
    return <div>Loading...</div>;
  }
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className='container my-5'>
      <h1 className='py-5'>Detalle de la Orden #{order.id}</h1>
      <Table striped
        bordered
        hover
        responsive
        className="table table-striped table-hover text-center align-middle">
        <thead>
          <tr>
            
            <th></th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map(product => (
            <tr key={product.id}>
              <td><img src={product.img} alt={product.title} className='img-fluid' style={{ width: '100px' }} />
              </td>
              <td>{product.title}</td>
              
              <td>{product.quantity}</td>
              <td>{formatCurrency(product.price)}</td>
            </tr>
          ))}
          <tr>
              <td colSpan="3" className="text-end fw-bold">Total de la compra:</td>
              <td className="text-center fw-bold">{formatCurrency(order.total)}</td>
            </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default OrderDetail;
