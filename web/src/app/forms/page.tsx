"use client"; // This directive ensures the file is treated as a client component.

import FormfacadeEmbed from "@formfacade/embed-react";
import React from "react";

const FormPage = () => {
  return (
    <div>
    <FormfacadeEmbed
        formFacadeURL="https://formfacade.com/include/108158818245593499731/form/1FAIpQLSeDWZMkvU7LDbg7961nrb5ZT2vHXxB7S6xFfTzPIEw7q0BAwQ/classic.js/?div=ff-compose"
        onSubmitForm={() => console.log('Form submitted')}
    />
    </div>
  );
};

export default FormPage;
