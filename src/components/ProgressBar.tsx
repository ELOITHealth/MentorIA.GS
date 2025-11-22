import { motion } from "framer-motion";

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  const safe = Math.max(0, Math.min(100, progress));
  return (
    <div className="w-full bg-[#102A43] h-4 rounded-full overflow-hidden mt-2 shadow-inner" role="progressbar" aria-valuenow={safe} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className="h-full"
        style={{ background: "linear-gradient(90deg,var(--primary-1),var(--primary-2))" }}
        animate={{ width: `${safe}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
