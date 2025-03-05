"use client";
import { useSelector, useDispatch } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { RootState } from "@/lib/store";
import { closeModal } from "@/lib/features/modal/modalSlice";

const Modal = () => {
  const { isOpen, content } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(closeModal())}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2 p-2" onClick={() => dispatch(closeModal())}>
              <X className="w-5 h-5" />
            </button>
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
