import React from 'react';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import './WidgetStyles.css';

const HumidityWidget = ({ humidity }) => {
  return (
    <div className="widget">
      <div className="widget-title">Humidity</div>
      <div className="widget-value">{humidity}%</div>
      <WaterDropIcon style={{ fontSize: '40px', color: '#1E90FF' }} />
    </div>
  );
};

export default HumidityWidget;
