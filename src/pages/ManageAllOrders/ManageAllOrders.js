import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { FcOk } from "react-icons/fc";
import classes from "../Table.module.css";

const ManageAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    const response = await fetch(
      "https://holiday-dreams.herokuapp.com/orders"
    );
    const responseData = await response.json();
    setOrders(responseData);
  };

  //Load all orders
  useEffect(() => {
    loadOrders();
  }, []);

  //Order delete handler
  const handleDelete = async (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#30764a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          {
            const response = fetch(
              `https://holiday-dreams.herokuapp.com/orders/${_id}`,
              {
                method: "DELETE",
              }
            );
            const responseData = response.json;

            loadOrders();
          }
          Swal.fire(
            'Deleted!',
            "User's Booking has been deleted.",
            'success'
          ).then(function () {
            window.location = "/my-orders";
          });
        }
      })
  };
  let count = 1;

  //Approve order handler
  const handleApprove = async (_id) => {
    const response = await fetch(
      `https://holiday-dreams.herokuapp.com/orders/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      }
    );
    const responseData = await response.json();
    if (responseData.ok > 0) {
      loadOrders();
    }
  };

  return (
    <section className={classes.orders}>
      <div className="container">
        <h2 className="section-heading">All Orders</h2>
        <div className="row">
          <div className={`col-md-12 ${classes["main-datatable"]}`}>
            <div className={classes.card_body}>
              <div className={classes["overflow-x"]}>
                <table
                  style={{ width: "100%" }}
                  className={`table ${classes["cust-datatable"]} ${classes.dataTable} ${classes["no-footer"]}`}
                >
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>ID</th>
                      <th style={{ minWidth: "200px" }}>Name</th>
                      <th style={{ minWidth: "280px" }}>Email</th>
                      <th style={{ minWidth: "280px" }}>Tour Name</th>
                      <th style={{ minWidth: "80px" }}>Price</th>
                      <th style={{ minWidth: "150px" }}>Status</th>
                      <th style={{ minWidth: "250px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      console.log("Hello", order.userImage);
                      return (
                        <tr key={order._id}>
                          <td>{count++}</td>
                          <td>
                            <img
                              src={order.userImage}
                              alt={order.userName.split(" ")[0]}
                              className="img-fluid rounded-circle me-2"
                              width="40"
                            />
                            {order.userName}
                          </td>
                          <td>
                            <span
                              className={`${classes.mode} ${classes.mode_email}`}
                            >
                              {order.email}
                            </span>
                          </td>
                          <td>{order.name}</td>
                          <td>${order.price}</td>
                          <td>
                            <span
                              className={`${classes.mode} ${order.status === "approved"
                                ? classes.mode_on
                                : classes.mode_off
                                }`}
                            >
                              {order.status === "pending" && "Pending"}
                              {order.status === "approved" && "Approved"}
                            </span>
                          </td>
                          <td>
                            {order.status === "pending" && (
                              <button
                                className={`btn btn-sm me-3 ${classes.mark}`}
                                onClick={() => handleApprove(order._id)}
                              >
                                Mark as Approved <FcOk />
                              </button>
                            )}
                            <MdDelete
                              className={classes.delete}
                              onClick={() => handleDelete(order._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageAllOrders;
