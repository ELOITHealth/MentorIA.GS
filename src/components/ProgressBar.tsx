import { motion } from "framer-motion";

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden mt-2 shadow-inner">
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-400 to-indigo-300"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
