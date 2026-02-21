"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const AddToPantryModal = ({ isOpen, onClose, onSuccess }) => {

    const [activeTab, setactiveTab] = useState("scan");
    const [selectedImage, setSelectedImage] = useState(null);
    const [scannedIngredients, setScannedIngredients] = useState([])
    const [manualItem, setManualItem] = useState({name: "", quantity: ""})

  const handleClose = () => {
    setactiveTab("scan");
    setSelectedImage(null);
    setScannedIngredients([]);
    setManualItem({name: "", quantity: ""});
    onClose();
  };

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
      </DialogContent>
    </Dialog>
  );
};

export default AddToPantryModal;
