import UserTable from "components/Table";
import { useState, useEffect } from "react";
import { Button } from "antd";
import Header from "components/headerTool";
import TableToolbar from "../../../components/tableHeaderTool";

function Index() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Set default table based on the current path
    if (window.location.pathname.includes("lavlah")) {
      setSelectedTable("Харилцагч компани");
    }
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setSelectedTable(buttonName);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const getButtonStyle = (buttonName: string) => {
    const isSelected = selectedTable === buttonName;
    return {
      color: isSelected ? "#1890FF" : undefined,
      background: isSelected ? "#E6F7FF" : undefined,
    };
  };

  return (
    <div className="mt-[-30px]">
      <div className="mb-4">
        <Header onButtonClick={handleButtonClick} selectedTable={selectedTable} />
      </div>
      <div className="w-full h-full bg-white rounded-2xl p-1">
        {selectedTable === "Харилцагчдын дансны тооцоо"&& (
          <div className="flex items-center mt-2 ml-4">
            <Button 
              type="default" 
              onClick={() => handleButtonClick("Данс")} 
              style={getButtonStyle("Данс")}
            >
              Данс
            </Button>
            <Button 
              type="default" 
              onClick={() => handleButtonClick("Гүйлгээ")} 
              style={getButtonStyle("Гүйлгээ")}
            >
              Гүйлгээ
            </Button>
          </div>
        )}
        
        <TableToolbar
          title="Нийт"
          totalUsers={totalUsers}
          onDateChange={() => {}}
          selectedTable={selectedTable}
        />

        <UserTable
          selectedTable={selectedTable}
          searchQuery={searchQuery}
          setTotalUsers={setTotalUsers}
        />
      </div>
    </div>
  );
}

export default Index;
