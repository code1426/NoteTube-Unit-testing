import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Spinner } from "react-activity";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PiPaletteLight, PiPaintBrush } from "react-icons/pi";
import toast from "react-hot-toast";
import type { Deck } from "@/types/deck.types";
import useChangeDeckColor from "@/hooks/Decks/useChangeColorDeck";
import { VIBRANT_COLORS } from "@/utils/constants";

const ChangeDeckColorDialog: React.FC<Deck> = ({ id, color }) => {
  const { changeDeckColor, loading, error } = useChangeDeckColor();
  const isColorPreset: boolean = VIBRANT_COLORS.includes(color!);

  const [selectedColor, setSelectedColor] = useState<string>(
    isColorPreset ? color! : "#ffffff",
  );
  const [customColor, setCustomColor] = useState<string>(
    isColorPreset ? "#ffffff" : color!,
  );

  const [isPickerOpen, setPickerOpen] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleColorSelect = (color: string): void => {
    setSelectedColor(color);
  };

  const handleCustomColorSelect = (color: string): void => {
    setCustomColor(color);
    handleColorSelect(color);
  };

  const handleChangeDeckColor = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await changeDeckColor({
      id: id,
      color: selectedColor,
    });

    if (res.success) {
      toast.success("Changed deck color.");
      setDialogOpen(false);
    } else {
      console.error("Failed to change deck color:", error);
      toast.error("Failed to change deck color. Please try again.");
    }
  };

  const handleDialogOpenChange = (open: boolean): void => {
    setDialogOpen(open);
    if (open) {
      setSelectedColor(color!);
      setCustomColor(isColorPreset ? "#ffffff" : color!);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger>
        <button className="flex items-center justify-left p-2 w-40 hover:bg-gray-200 rounded-sm">
          <PiPaletteLight size={20} className="mr-2" />
          <span className="text-sm">Change Color</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader className="select-none">
          <DialogTitle>Select a Color</DialogTitle>
          <DialogDescription>
            Choose a color for your deck. You can select from the palette or use
            the custom color picker.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleChangeDeckColor}>
          <div className="py-4">
            <div className="flex flex-wrap gap-4">
              {VIBRANT_COLORS.map((color) => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded-full border-4 transition-colors ${
                    selectedColor === color
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  type="button"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                ></button>
              ))}
              <div className="relative">
                <button
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-colors ${
                    !VIBRANT_COLORS.includes(selectedColor!)
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  type="button"
                  style={{ backgroundColor: customColor }}
                  onClick={() => setPickerOpen(!isPickerOpen)}
                >
                  <PiPaintBrush size={20} color="#000" />
                </button>
                {isPickerOpen && (
                  <div className="absolute top-16 left-0 z-10">
                    <HexColorPicker
                      color={customColor}
                      onChange={handleCustomColorSelect}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <p className="text-sm text-gray-500">
                Selected Color: {selectedColor}
              </p>
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: selectedColor }}
              ></div>
            </div>
          </div>

          <DialogFooter>
            <Button
              className={`flex-1 px-6 h-12 flex items-center justify-center
                ${loading ? "bg-gray-300" : "bg-green hover:bg-green/90"} 
                text-white rounded-lg text-xl font-semibold 
                transition-colors disabled:opacity-50 gap-2 select-none`}
              onClick={handleChangeDeckColor}
              disabled={loading || !selectedColor}
              type="submit"
            >
              {loading ? (
                <Spinner size={12} color="#fff" animating={true} />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeDeckColorDialog;
