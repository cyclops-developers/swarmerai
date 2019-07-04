import React from 'react';
import { Modal as AntdModal } from 'antd';

const Modal = props => (
  <AntdModal destroyOnClose footer={null} {...props}></AntdModal>
);

export { Modal };
