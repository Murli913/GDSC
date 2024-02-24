import React from "react";

const GoMap = () => {
  return (
    <div className="mb-4 ">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.027953072826!2d77.58476127320962!3d12.970063114915725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16749c6f9dad%3A0x3f523b887a7b9b!2sBangalore%20Police%20Headquarters!5e0!3m2!1sen!2sin!4v1708706375851!5m2!1sen!2sin"
        width="1700"
        height="150"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoMap;
