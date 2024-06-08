import React, { useState } from 'react';
import Column from './Column';
import { DraggableCard } from './Card';
import styles from './projectBoard.module.scss';
import { useTranslation } from 'next-i18next';

const Board = ({
  cards,
  columns,
  moveCard,
  dropCard,
  type,
  dataObject,
  setDataObject,
}: any) => {
  const { t: tp } = useTranslation('postulation');
  return (
    <div className={`${styles.projectBoardContainer}`}>
      {columns.map((column: any) => (
        <Column
          key={column.id}
          title={column.title}
          icon={column.icon}
          cardsId={column.cardIds}
          cards={cards}
          type={type}
          dataObject={dataObject}
        >
          <div className={`${styles.columnBody}`}>
            {column.cardIds
              .map((cardId: any) =>
                cards.find((card: any) => card.id === cardId)
              )
              .map((card: any, index: any) => (
                <DraggableCard
                  key={card.id}
                  id={card.id}
                  columnId={column.id}
                  columnIndex={index}
                  user={card?.user}
                  type={type}
                  summary={type === 'job' ? card?.summary : card?.proposal}
                  experience={
                    type === 'job' ? card?.experience : card?.procedure_text
                  }
                  moveCard={moveCard}
                  dropCard={dropCard}
                  acceptPrice={card?.accept_price}
                  acceptTime={card?.accept_time}
                  weeks={card?.weeks}
                  days={card?.days}
                  priceProposal={card?.price_proposal}
                  updated={card?.updated}
                  dataObject={dataObject}
                  setDataObject={setDataObject}
                  algorandTransaction={card?.algorand_transaction}
                  nearTransaction={card.near_transaction}
                />
              ))}
            {column.cardIds.length === 0 && (
              <div className={styles.emptyTalent}>{tp('no-talent')}</div>
            )}
          </div>
        </Column>
      ))}
    </div>
  );
};

export default Board;
