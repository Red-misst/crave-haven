import React from "react";

interface ShippingAddressProps {
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    residential: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ shippingInfo, handleChange }) => {
  return (
    <div className="  dark:bg-gray-800 rounded-xl  h-full">
      <h3 className="text-lg font-semibold my-4 flex justify-center">Shipping Information</h3>

      {/* Full Name */}
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={shippingInfo.name}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-lg border bg-gray-200 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* Phone Number */}
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={shippingInfo.phone}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-lg border bg-gray-200 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* Delivery Address */}
      <input
        type="text"
        name="address"
        placeholder="Street Address / Location"
        value={shippingInfo.address}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-lg border bg-gray-200 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* Residential / Estate */}
      <input
        type="text"
        name="residential"
        placeholder="Residential / Apartment / Estate"
        value={shippingInfo.residential}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-lg border bg-gray-200 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

export default ShippingAddress;
