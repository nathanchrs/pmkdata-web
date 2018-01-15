import React from 'react';
import { Badge, Icon } from 'antd';

export function getUserStatusBadge (status) {
  switch (status) {
    case 'active': 
      return <Badge status="success" text="Aktif" />;
    case 'awaiting_validation':
      return <Badge status="processing" text="Menunggu validasi" />;
    case 'disabled':
      return <Badge status="error" text="Tidak aktif" />; 
    default:
      return null;
  }
}

export function getFilterIcon (filters, dataIndex) {
  return <Icon type="search" style={{ color: filters[dataIndex] ? '#108ee9' : '#aaa' }} />;
}
