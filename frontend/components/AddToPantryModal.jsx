"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Plus } from "lucide-react";
import { useState } from "react";

const AddToPantryModal = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setactiveTab] = useState("scan");
  const [selectedImage, setSelectedImage] = useState(null);
  const [scannedIngredients, setScannedIngredients] = useState([]);
  const [manualItem, setManualItem] = useState({ name: "", quantity: "" });

  const handleClose = () => {
    setactiveTab("scan");
    setSelectedImage(null);
    setScannedIngredients([]);
    setManualItem({ name: "", quantity: "" });
    onClose();
  };

  const handleAddManual = (e) => {}

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="manual" className={"mt-6"}>
            <form onSubmit={handleAddManual} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Ingredient Name
                </label>
                <input type="text" value={manualItem.name} onChange={(e) => setManualItem({ ...manualItem, name: e.target.value})} placeholder="e.g.. Beef"/>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPantryModal;
