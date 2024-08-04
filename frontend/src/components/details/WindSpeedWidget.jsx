import React from 'react';
import WindPowerIcon from '@mui/icons-material/WindPower';
import './WidgetStyles.css';

const WindSpeedWidget = ({ windSpeed }) => {
  return (
    <div className="widget">
      <div className="widget-title">Wind Speed</div>
      <div className="widget-value">{windSpeed} km/h</div>
      <WindPowerIcon style={{ fontSize: '40px', color: '#1E90FF' }} />
    </div>
  );
};

export default WindSpeedWidget;
