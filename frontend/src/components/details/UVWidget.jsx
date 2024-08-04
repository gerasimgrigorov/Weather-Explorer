import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import './WidgetStyles.css';

const UVWidget = ({ uvIndex }) => {
  return (
    <div className="widget">
      <div className="widget-title">UV Index</div>
      <div className="widget-value" style={{marginBottom: "0"}}>{uvIndex}</div>
      <WbSunnyIcon style={{ fontSize: '44px', color: '#FFA500' }} />
      <div className="widget-footer" style={{marginTop: "8px"}}>Use sunscreen until 18:00</div>
    </div>
  );
};

export default UVWidget;
