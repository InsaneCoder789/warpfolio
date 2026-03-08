import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, MapPin, Code2, Terminal, Instagram, Twitter, Loader2 } from "lucide-react";
import TerminalTitleBar from "@/components/TerminalTitleBar";
import TerminalBlock from "@/components/TerminalBlock";
import TypingText from "@/components/TypingText";
import ProjectCard from "@/components/ProjectCard";
import SkillBar from "@/components/SkillBar";
import CommandInput from "@/components/CommandInput";

import StatusBar from "@/components/StatusBar";
import { useGithubRepos } from "@/hooks/useGithubRepos";

const LANG_TO_TECH: Record<string, string[]> = {
  TypeScript: ["TypeScript", "Web"],
  JavaScript: ["JavaScript", "Web"],
  Python: ["Python"],
  Dart: ["Dart", "Flutter"],
  HTML: ["HTML", "Web"],
  CSS: ["CSS", "Web"],
};

const Index = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const { data: repos, isLoading: reposLoading } = useGithubRepos();

  const scrollTo = useCallback((section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      about: aboutRef,
      projects: projectsRef,
      skills: skillsRef,
      contact: contactRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleCommand = useCallback((cmd: string) => {
    if (["about", "projects", "skills", "contact"].includes(cmd)) {
      scrollTo(cmd);
    }
  }, [scrollTo]);

  return (
    <div className="min-h-screen bg-terminal-bg scanline relative">
      

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Terminal Window — full screen */}
        <div className="flex-1 flex flex-col w-full border-x border-border terminal-box-glow">
          <TerminalTitleBar />

          <div className="flex-1 bg-terminal-bg/80 backdrop-blur-sm p-4 md:p-8 lg:px-16 space-y-1 overflow-y-auto pb-12">
            {/* Welcome / Hero */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-primary" />
                <span className="text-primary font-bold text-lg terminal-glow">portfolio.sh</span>
                <span className="text-muted-foreground text-[10px] ml-2 opacity-50">PID 1337 · TTY pts/0</span>
              </div>
              <div className="text-foreground text-xl md:text-3xl font-bold mb-1">
                <TypingText text="Hey, I'm Rohan Chatterjee 👋" speed={50} />
              </div>
              <p className="text-terminal-output text-sm mt-2">
                InsaneCoder789 · Developer · Open source enthusiast · Python adopter 🐍
              </p>
              <p className="text-muted-foreground text-xs mt-1 italic">
                "If you want to excel in something, you shall know it till its roots"
              </p>
              <div className="flex items-center gap-4 mt-3">
                <a href="https://github.com/InsaneCoder789" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/rochiee24/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://twitter.com/RohanCh81145388" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Working from home 🏠
                </span>
              </div>
            </motion.div>

            {/* About */}
            <div ref={aboutRef}>
              <TerminalBlock command="cat about.md" delay={0.6}>
                <p className="text-terminal-output leading-relaxed">
                  I'm a passionate developer with a love for building things from the ground up.
                  From full-scale web applications to fun Python projects, I explore tech at its roots.
                  Currently focused on TypeScript, Dart/Flutter, and Python — always learning,
                  always building. I believe great software comes from understanding fundamentals deeply.
                </p>
              </TerminalBlock>
            </div>

            {/* Projects — dynamically fetched */}
            <div ref={projectsRef} className="w-full">
              <TerminalBlock command="ls ~/projects --all --recent" prompt="~/projects" delay={1.0}>
                {reposLoading ? (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Fetching repos from github.com/InsaneCoder789...</span>
                  </div>
                ) : (
                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mt-1">
                    {repos?.map((repo, i) => (
                      <ProjectCard
                        key={repo.name}
                        name={repo.name}
                        description={repo.description || "No description provided."}
                        tech={
                          repo.topics?.length
                            ? repo.topics.slice(0, 3)
                            : repo.language
                              ? LANG_TO_TECH[repo.language] || [repo.language]
                              : ["Code"]
                        }
                        stars={repo.stargazers_count || undefined}
                        url={repo.html_url}
                        delay={1.2 + i * 0.1}
                      />
                    ))}
                  </div>
                )}
              </TerminalBlock>
            </div>

            {/* Skills */}
            <div ref={skillsRef}>
              <TerminalBlock command="neofetch --skills" delay={2.0}>
                <div className="flex flex-col md:flex-row gap-6 mt-1 overflow-hidden">
                  <div className="space-y-2 flex-1">
                    <div className="text-primary text-xs font-semibold mb-3 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" /> Languages & Frameworks
                    </div>
                    <SkillBar name="Python" level={88} delay={2.2} />
                    <SkillBar name="TypeScript" level={82} delay={2.3} />
                    <SkillBar name="Dart/Flutter" level={78} delay={2.4} />
                    <SkillBar name="JavaScript" level={85} delay={2.5} />
                    <SkillBar name="React" level={75} delay={2.6} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="text-primary text-xs font-semibold mb-3 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Tools & Infrastructure
                    </div>
                    <SkillBar name="Git" level={90} delay={2.3} />
                    <SkillBar name="MySQL" level={75} delay={2.4} />
                    <SkillBar name="Linux" level={72} delay={2.5} />
                    <SkillBar name="Tkinter" level={70} delay={2.6} />
                    <SkillBar name="Firebase" level={68} delay={2.7} />
                  </div>
                </div>
              </TerminalBlock>
            </div>

            {/* Contact */}
            <div ref={contactRef}>
              <TerminalBlock command="echo $CONTACT_INFO" delay={2.8}>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-primary" />
                    <a href="https://github.com/InsaneCoder789" target="_blank" rel="noopener noreferrer" className="text-terminal-link hover:underline">github.com/InsaneCoder789</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Instagram className="w-3.5 h-3.5 text-primary" />
                    <a href="https://www.instagram.com/rochiee24/" target="_blank" rel="noopener noreferrer" className="text-terminal-link hover:underline">@rochiee24</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Twitter className="w-3.5 h-3.5 text-primary" />
                    <a href="https://twitter.com/RohanCh81145388" target="_blank" rel="noopener noreferrer" className="text-terminal-link hover:underline">@RohanCh81145388</a>
                  </div>
                  <p className="text-terminal-output text-xs mt-2">
                    Always open for interesting projects and collaborations. Feel free to reach out!
                  </p>
                </div>
              </TerminalBlock>
            </div>

            {/* Interactive Command Input */}
            <div>
              <CommandInput onCommand={handleCommand} />
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
              className="text-center text-muted-foreground text-[10px] pt-4 pb-8"
            >
              built with ❤️ and too much caffeine · © {new Date().getFullYear()} Rohan Chatterjee
            </motion.div>
          </div>
        </div>

        <StatusBar />
      </div>
    </div>
  );
};

export default Index;
