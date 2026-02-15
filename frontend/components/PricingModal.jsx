"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import PricingSection from "./PricingSection";

const PricingModal = ({children, subscriptionTeir = "free"}) => {

  const [isOpen, setIsOpen] = useState(false)
  const canOpen = subscriptionTeir === "free"

  return (
    <Dialog open={isOpen} onOpenChange={canOpen ? setIsOpen : undefined}>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent className={"p-8 pt-4 sm:max-w-4xl"}>
        <DialogHeader>
          <DialogTitle/>
          <PricingSection/>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
