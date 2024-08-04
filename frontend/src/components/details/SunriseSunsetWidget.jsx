import React from 'react';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import './SunriseSunsetWidget.css';
import './WidgetStyles.css';

const SunriseSunsetWidget = ({ sunrise, sunset }) => {
  return (
    <div className="widget">
      <div className="sunset-title">
        <WbTwilightIcon className="twilight-icon" />
        <span>Sun Sets</span>
      </div>
      <div className="arc-container">
        <svg className="arc" viewBox="0 0 380 269">
          <path 
            d="M328.017 269C341.367 245.727 349 218.755 349 190C349 102.187 277.813 31 190 31C102.187 31 31 102.187 31 190C31 218.755 38.633 245.727 51.9833 269H17.1516C6.13848 244.943 0 218.188 0 190C0 85.0659 85.0659 0 190 0C294.934 0 380 85.0659 380 190C380 218.188 373.862 244.943 362.848 269H328.017Z" 
            fill="#FFA500" 
            stroke="#FFA500" 
            strokeWidth="4"
          />
        </svg>
        <div className="time-label">
          <div className="left">{sunrise}</div>
          <div className="right">{sunset}</div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunsetWidget;
