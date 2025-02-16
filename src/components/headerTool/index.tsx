import React from "react";
import { Button } from "antd";

interface TableToolbarProps {
    onButtonClick: (buttonName: string) => void;
    selectedTable: string | null;
  }
  
  const TableToolbar: React.FC<TableToolbarProps> = ({ onButtonClick, selectedTable }) => {
    const handleButtonClick = (buttonName: string) => {
      onButtonClick(buttonName);
    };
  
    const getButtonStyle = (buttonName: string) => {
      const isSelected = selectedTable === buttonName;
      const baseStyle = {
        color: isSelected ? "#1890FF" : undefined,
        background: isSelected ? "#E6F7FF" : undefined,
      };
  
      if (window.location.pathname.includes("burtgel")) {
        if (buttonName === "Ачаа дөхөлт") {
          return { ...baseStyle, borderRadius: "8px 0 0 8px" };
        } else if (buttonName === "Талбайд ирсэнээр") {
          return { ...baseStyle, borderRadius: "0 8px 8px 0" };
        }
        return { ...baseStyle, borderRadius: "0 0 0 0" };
      } else if (window.location.pathname.includes("lavlah")) {
        if (buttonName === "Харилцагч компани") {
          return { ...baseStyle, borderRadius: "8px 0 0 8px" };
        } else if (buttonName === "Нэмэлт хураамж тохиргоо") {
          return { ...baseStyle, borderRadius: "0 0 0 0" };
        } else if (buttonName === "Харилцагчдын дансны тооцоо") {
          return { ...baseStyle, borderRadius: "0 0 0 0" };
        } else if (buttonName === "Э/Х тасалбар хүчингүй болгох") {
          return { ...baseStyle, borderRadius: "0 8px 8px 0" };
        }
      } else if (window.location.pathname.includes("tailan")) {
        if (buttonName === "Э/Х орлогын тайлан") {
          return { ...baseStyle, borderRadius: "8px" };
        }
      }
  
      return baseStyle;
    };
  
    if (window.location.pathname.includes("burtgel")) {
      return (
        <div className="flex items-center mt-6 mb-6">
          <Button 
            type="default" 
            onClick={() => handleButtonClick("Ачаа дөхөлт")} 
            style={getButtonStyle("Ачаа дөхөлт")}
          >
            Ачаа дөхөлт
          </Button>
          <Button 
            type="default" 
            onClick={() => handleButtonClick("Үлдэгдэл")} 
            style={getButtonStyle("Үлдэгдэл")}
          >
            Үлдэгдэл
          </Button>
          <Button 
            type="default" 
            onClick={() => handleButtonClick("Талбайд ирсэнээр")} 
            style={getButtonStyle("Талбайд ирсэнээр")}
          >
            Талбайд ирсэнээр
          </Button>
        </div>
      );
    } else if (window.location.pathname.includes("lavlah")) {
      return (
        <div className="flex items-center mt-6 mb-6">
          <Button 
            type="default" 
            onClick={() => handleButtonClick("Харилцагч компани")} 
            style={getButtonStyle("Харилцагч компани")}
          >
            Харилцагч компани
          </Button>
          <Button 
            type="default" 
            onClick={() => handleButtonClick("Нэмэлт хураамж тохиргоо")} 
            style={getButtonStyle("Нэмэлт хураамж тохиргоо")}
          >
            Нэмэлт хураамж тохиргоо
          </Button>
          <Button 
            type="default" 
            onClick={() => handleButtonClick("Харилцагчдын дансны тооцоо")} 
            style={getButtonStyle("Харилцагчдын дансны тооцоо")}
          >
            Харилцагчдын дансны тооцоо
          </Button>
          <Button 
            type="default" 
            onClick={() => handleButtonClick("Э/Х тасалбар хүчингүй болгох")} 
            style={getButtonStyle("Э/Х тасалбар хүчингүй болгох")}
          >
            Э/Х тасалбар хүчингүй болгох
          </Button>
        </div>
      );
    } else if (window.location.pathname.includes("tailan")) {
      return (
        <div className="flex items-center mt-6 mb-6">
          <Button 
            type="default" 
            onClick={() => handleButtonClick("Э/Х орлогын тайлан")} 
            style={getButtonStyle("Э/Х орлогын тайлан")}
          >
            Э/Х орлогын тайлан
          </Button>
        </div>
      );
    }
  
    return null;
  };

export default TableToolbar;
