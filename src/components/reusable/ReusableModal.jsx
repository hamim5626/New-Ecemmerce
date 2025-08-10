"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ReusableModal({ children, title, className, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={className} variant="outline">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[660px] max-h-[90vh] overflow-y-auto sm:rounded-lg p-6"
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
