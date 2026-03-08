import { motion } from "framer-motion";

const GITHUB_USERNAME = "InsaneCoder789";

const GithubContributions = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="w-full overflow-hidden"
    >
      <img
        src={`https://ghchart.rshah.org/26a641/${GITHUB_USERNAME}`}
        alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
        className="w-full rounded-md opacity-90 hover:opacity-100 transition-opacity"
      />
      <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
        <span>Contributions in the last year</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] border border-border" style={{ backgroundColor: "#161b22" }} />
          <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: "#0e4429" }} />
          <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: "#006d32" }} />
          <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: "#26a641" }} />
          <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: "#39d353" }} />
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GithubContributions;
