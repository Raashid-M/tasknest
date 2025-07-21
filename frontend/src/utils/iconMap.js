// src/utils/iconMap.js
import ico1 from '../assets/ico1.svg';
import ico2 from '../assets/ico2.svg';
import ico3 from '../assets/ico3.svg';
import ico4 from '../assets/ico4.svg';
import defaultIcon from '../assets/default-icon.svg';

const iconMap = {
  'ico1.svg': ico1,
  'ico2.svg': ico2,
  'ico3.svg': ico3,
  'ico4.svg': ico4,
};


export const getProjectIcon = (iconName) => {
  return iconMap[iconName] || defaultIcon;
};
