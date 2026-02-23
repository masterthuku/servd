"use client";

import {
  addPantryItemMannually,
  saveToPantry,
  scanPantryItem,
} from "@/actions/pantry.actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetch from "@/hooks/use-fetch";
import { Camera, Plus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";



const AddToPantryModal = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setactiveTab] = useState("scan");
  const [selectedImage, setSelectedImage] = useState(null);
  const [scannedIngredients, setScannedIngredients] = useState([]);
  const [manualItem, setManualItem] = useState({ name: "", quantity: "" });

  const {
    loading: scanning,
    data: scanData,
    fn: scanImage,
  } = useFetch(scanPantryItem);
  const {
    loading: saving,
    data: saveData,
    fn: saveScannedItems,
  } = useFetch(saveToPantry);
  const {
    loading: adding,
    data: addData,
    fn: addManualItem,
  } = useFetch(addPantryItemMannually);

  useEffect(() => {
    if (addData?.success) {
      toast.success("Item added to pantry");
      setManualItem({ name: "", quantity: "" });
      handleClose();
      if (onSuccess) onSuccess();
    }
  }, [addData])

  const handleClose = () => {
    setactiveTab("scan");
    setSelectedImage(null);
    setScannedIngredients([]);
    setManualItem({ name: "", quantity: "" });
    onClose();
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setScannedIngredients([]);
  }

  const handleAddManual = async (e) => {
    e.preventDefault();
    if (!manualItem.name.trim() || !manualItem.quantity.trim()) {
      toast.error("Name and quantity are required");
      return;
    }
    const formData = new FormData();
    formData.append("name", manualItem.name);
    formData.append("quantity", manualItem.quantity);
    await addManualItem(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={"max-w-3xl max-h-[90vh] overflow-y-auto rounded-none"}>
        <DialogHeader>
          <DialogTitle className={"text-2xl font-bold tracking-tight"}>Add to pantry</DialogTitle>
          <DialogDescription>
            Scan your pantry with AI or add items manually
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setactiveTab} className={"mt-4"}>
          <TabsList className={"grid w-full grid-cols-2"}>
            <TabsTrigger value="scan" className={"gap-2"}>
              <Camera className="w-4 h-4" />
              AI Scan
            </TabsTrigger>
            <TabsTrigger value="manual">
              <Plus className="w-4 h-4" />
              Add Manually
            </TabsTrigger>
          </TabsList>
          <TabsContent value="scan" className={"space-y-6 mt-6"}>
            {scannedIngredients.length === 0 ? (
              <div className="space-y-4">
                <ImageUploader onImageSelect={handleImageSelect}  loading={scanning}/>
              </div>
            ) : (
              <div></div>
            )}
          </TabsContent>
          <TabsContent value="manual" className={"mt-6"}>
            <form onSubmit={handleAddManual} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  value={manualItem.name}
                  onChange={(e) =>
                    setManualItem({ ...manualItem, name: e.target.value })
                  }
                  placeholder="e.g.. Beef"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={adding}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  value={manualItem.quantity}
                  onChange={(e) =>
                    setManualItem({ ...manualItem, quantity: e.target.value })
                  }
                  placeholder="e.g., 500g, 1kg, 2 cups, 4 pieces"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={adding}
                />
              </div>
              <Button type="submit" disabled={adding} variant="primary">
                {adding ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Item
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPantryModal;
