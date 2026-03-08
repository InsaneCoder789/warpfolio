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
        src={`https://ghchart.rshah.org/2dd4bf/${GITHUB_USERNAME}`}
        alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
        className="w-full rounded-md opacity-90 hover:opacity-100 transition-opacity"
        style={{ filter: "hue-rotate(10deg) saturate(1.2)" }}
      />
      <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
        <span>Contributions in the last year</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {[0.1, 0.25, 0.45, 0.7, 1].map((opacity, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ backgroundColor: `hsl(187, 80%, 55%)`, opacity }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GithubContributions;
