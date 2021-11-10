import React, { useCallback, useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../store/auth-context";
import classes from "../Table.module.css";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  const {
    user: { email },
  } = useContext(AuthContext);

  const loadUserOrders = useCallback(async () => {
    const response = await fetch(
      `https://holiday-dreams.herokuapp.com/orders/${email}`
    );
    const responseData = await response.json();
    setOrders(responseData);
  }, [email]);

  //Load user orders
  useEffect(() => {
    loadUserOrders();
  }, [email, loadUserOrders]);

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

            loadUserOrders();
          }
          Swal.fire(
            'Deleted!',
            'Your Booking has been deleted.',
            'success'
          )
        }
      })
  };


  //Order id counter
  let count = 1;

  //My order page
  return (
    <section className={classes.orders}>
      <div className="container-xl">
        <h2 className="section-heading" id="my-orders">My Orders</h2>
        <div className="row">
          <div className={`col-lg-12 ${classes["main-datatable"]}`}>
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
                      <th style={{ minWidth: "200px" }}>Tour Name</th>
                      <th style={{ minWidth: "150px" }}>Tour Date</th>
                      <th style={{ minWidth: "50px" }}>Tour Duration</th>
                      <th style={{ minWidth: "120px" }}>Price</th>
                      <th style={{ minWidth: "150px" }}>Status</th>
                      <th style={{ minWidth: "150px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
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
                              {order.name}
                            </span>
                          </td>
                          <td>
                            {new Date(order.startDates).toLocaleDateString(
                              "en-US"
                            )}
                          </td>
                          <td>{order.duration} Days</td>
                          <td>
                            <span
                              className={`${classes.mode} ${classes.mode_email}`}
                            >
                              ${order.price}
                            </span>
                          </td>

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

export default MyOrders;
