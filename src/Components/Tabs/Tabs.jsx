import React from "react";
import "./tabs.css";
function Tabs({items,selected,onChange}) {
  return (
    <ul className="tab__container">
      {items.map((item, i) => (
        <li onClick={()=>onChange(item.value)} className="tab__item" style={selected===item.value?{backgroundColor:"rgba(119, 119, 119,30%)"}:{}}>{item.label}</li>
      ))}
    </ul>
  );
}
export default Tabs;
