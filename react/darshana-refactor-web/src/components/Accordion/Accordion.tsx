import { DataAccordion } from '@constants/qa';
import { useMediaQuery, useMediaQueryDefault } from '@hooks';
import { collapseMotion } from '@utils/motionUtil';
import type { CollapseProps } from 'rc-collapse';
import Collapse, { Panel } from 'rc-collapse';
import * as React from 'react';

function expandIcon({ isActive }: any) {
  return (
    <i style={{ marginRight: '.5rem' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="50"
        height="50"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central"
          fill="black"
          fontWeight="lighter"
        >
          {isActive ? '-' : '+'}
        </text>
      </svg>
    </i>
  );
}

export const Accordion = ({ data }: { data: DataAccordion[] }) => {
  return (
    <Collapse
      accordion={false}
      openMotion={collapseMotion}
      expandIcon={expandIcon}
      style={{
        marginBottom: '24px',
        borderRadius: '16px',
      }}
    >
      {data.map((qa: any, index: number) => (
        <Panel key={index} header={qa.title} headerClass="my-header-class">
          <div className="text-justify">
            <p dangerouslySetInnerHTML={{ __html: qa.body }}></p>
          </div>
        </Panel>
      ))}
    </Collapse>
  );
};

export const AccordionBennefits = ({ data }: { data: DataAccordion[] }) => {
  return (
    <Collapse
      accordion={true}
      openMotion={collapseMotion}
      expandIcon={expandIcon}
    >
      {data.map((qa: any, index: number) => (
        <>
          <Panel key={index} header={qa.title} headerClass="my-header-class">
            <div className="text-justify">
              <p
                className="content"
                dangerouslySetInnerHTML={{ __html: qa.body }}
              ></p>
            </div>
          </Panel>
          <div
            style={{
              marginTop:15,
              height: 2,
              width: '100%',
              backgroundColor: '#e6e6e6',
            }}
          />
        </>
      ))}
    </Collapse>
  );
};
