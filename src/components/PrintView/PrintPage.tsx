import React, { PropsWithChildren } from "react";
import PrintHeader, { PrintHeaderProps } from "./PrintHeader";
import { MTGCardBlock } from "../../@types/MTGSet";
import BinderPage from "../BinderPage";
import { v4 as uuidv4 } from "uuid";

interface PrintPageProps {
  headerProps?: PrintHeaderProps;
  blocks: MTGCardBlock[];
}
function PrintPage(props: PropsWithChildren<PrintPageProps>) {
  return (
    <div className="container printpage relative">
      {props.headerProps && (
        <PrintHeader
          pageNumber={props.headerProps.pageNumber}
          totalPages={props.headerProps.totalPages}
        />
      )}
      {props.blocks.map((block) => (
        <BinderPage key={uuidv4()} block={block} />
      ))}
    </div>
  );
}

export default PrintPage;
