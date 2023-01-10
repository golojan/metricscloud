import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

type ShowChatProps = {
  show?: boolean;
};

const ShowChartButton = ({ show = false }: ShowChatProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '0px',
        fontWeight: 'bolder',
        width: '40px',
        height: '40px',
        display: show ? 'block' : 'none'
      }}
    >
      <Link href="#" legacyBehavior>
        <a className="button text-primary">
          <FontAwesomeIcon icon={faChartPie} fontSize={25} />
        </a>
      </Link>
    </div>
  );
};

export default ShowChartButton;
