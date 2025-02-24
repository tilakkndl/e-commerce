import React, { useState } from "react";

interface ColorPickerProps {
  setColor: (color: string) => void; // Function to update the color in the parent component
}

const ColorPicker: React.FC<ColorPickerProps> = ({ setColor }) => {
  const [selectedColor, setSelectedColor] = useState<string>("#000000"); // Default color is black

  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setSelectedColor(newColor); // Update local state
    setColor(newColor); // Update parent state
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">Color Picker</h2>
      <div className="flex items-center space-x-4">
        <input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          className="w-16 h-16 cursor-pointer"
        />
        <span className="text-lg font-semibold">{selectedColor}</span>
      </div>
    </div>
  );
};

export default ColorPicker;
