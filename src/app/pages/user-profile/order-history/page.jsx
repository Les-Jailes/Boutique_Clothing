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
            <th className="thTable">Name of Product</th>
            <th className="thTable">Status</th>
            <th className="thTable">Order Date</th>
            <th className="thTable">Price</th>
            <th className="thTable">Category</th>
            <th className="thTable">Type</th>
            <th className="thTable">Color</th>
            <th className="thTable">Size</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <Image
                src="/logo2.png"
                alt="Product"
                width={40}
                height={40}
                priority
                className="image1"
              />
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
              <Image
                src="/logo2.png"
                alt="Product"
                width={25}
                height={25}
                priority
              />
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