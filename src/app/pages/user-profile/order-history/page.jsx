import React from "react";
import Image from "next/image";
import "@/css/OrderHistoryUser/OrderHistoryUserTable.css";

const OrderHistoryUser = () => {
  return (
    <div className="containerTable">
      <br />
      <h1>Hello</h1>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name of Product</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Price</th>
            <th>Category</th>
            <th>Type</th>
            <th>Color</th>
            <th>Size</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <Image src="" alt="Product" width={180} height={180} priority />
              Product 1
            </td>
            <td>Comprado</td>
            <td>11/20/2023</td>
            <td>$19.99</td>
            <td>Women</td>
            <td>Shirts</td>
            <td>Blue</td>
            <td>L</td>
          </tr>

          <tr>
            <td>
              <Image src="" alt="Product" width={180} height={180} priority />
              Product 2
            </td>
            <td>Comprado</td>
            <td>11/11/2023</td>
            <td>$21.00</td>
            <td>Men</td>
            <td>Pants</td>
            <td>Black</td>
            <td>M</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryUser;