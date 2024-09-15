import React from "react";

function PrintPage(props: any) {
  return <div className="container printpage">{props.children}</div>;
}

export default PrintPage;
