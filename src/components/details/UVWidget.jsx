import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import './WidgetStyles.css';

const UVWidget = ({ uvIndex }) => {
  return (
    <div className="widget">
      <div className="widget-title">UV Index</div>
      <div className="widget-value">{uvIndex}</div>
      <WbSunnyIcon style={{ fontSize: '40px', color: '#FFA500' }} />
      <div className="widget-footer">Use sunscreen until 18:00</div>
    </div>
  );
};

export default UVWidget;
