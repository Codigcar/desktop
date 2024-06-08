import React, { useState } from 'react';
import styles from './projectBoard.module.scss';
import Image from 'next/image';
import useCollapse from 'react-collapsed';
import * as XSLX from 'xlsx';
import moment from 'moment';
const Column = (props: any) => {
  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const handlerDowloadApplication = () => {
    const prueba = props?.cardsId?.map((cardId: any) =>
      props?.cards.find((card: any) => card.id === cardId)
    );
    const exportData = transformDataDowload(prueba, props?.type);
    handleOnExport(exportData);
  };
  const transformDataDowload = (data: any, type: string) => {
    if (type === 'job') {
      const dataTransform = data.map((row: any, index: number) => ({
        'N°': index + 1,
        'Full Name': row.user?.full_name,
        Summary: row?.summary,
        Experience: row.experience,
        Salary: props?.dataObject.salary,
        CV: row?.file_url,
      }));
      return dataTransform;
    } else {
      const dataTransform = data.map((row: any, index: number) => ({
        N: index,
        'Full Name': row.user?.full_name,
        Weeks: row.weeks,
        Days: row.days,
        'Price Proposal': row.price_proposal,
        Proposal: row?.proposal,
        Procedure: row.procedure_text,
      }));
      return dataTransform;
    }
  };
  const handleOnExport = async (exportData: any) => {
    const wb = XSLX.utils.book_new();
    const ws = XSLX.utils.json_to_sheet(exportData);
    XSLX.utils.book_append_sheet(wb, ws, 'Report ');
    const fecha = moment(new Date(), 'DD-MM-YYYY');
    XSLX.writeFile(wb, `Reporte ${fecha}.xlsx`);
  };
  return (
    <div className={`${styles.boardColumn}`}>
      <div className={`${styles.columnHeader}`}>
        <div className={`${styles.headerTitle}`}>
          <Image src={props.icon} width={24} height={24} alt="Darshana" />
          <h1 className="text-20">
            <strong>{props.title}</strong>
          </h1>
          <div
            className={`${styles.headerIcon}`}
            onClick={() => handlerDowloadApplication()}
          >
            <Image
              src={'/images/icons/download.svg'}
              width={24}
              height={24}
              alt="Darshana"
            />
          </div>
        </div>

        <button
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        >
          {isExpanded ? (
            <Image
              src={'/images/icons/arrow-down.svg'}
              height={28}
              width={28}
              alt="arrow down"
            />
          ) : (
            <Image
              src={'/images/icons/arrow-top.svg'}
              height={28}
              width={28}
              alt="arrow top"
            />
          )}
        </button>
      </div>
      <div className={`${styles.columnBody}`} {...getCollapseProps()}>
        {props.children}
      </div>
    </div>
  );
};

export default Column;
