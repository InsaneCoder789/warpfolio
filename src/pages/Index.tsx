import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, Mail, MapPin, Code2, Terminal, Instagram, Twitter } from "lucide-react";
import TerminalTitleBar from "@/components/TerminalTitleBar";
import TerminalBlock from "@/components/TerminalBlock";
import TypingText from "@/components/TypingText";
import ProjectCard from "@/components/ProjectCard";
import SkillBar from "@/components/SkillBar";
import CommandInput from "@/components/CommandInput";

const Index = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-terminal-bg scanline">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        {/* Terminal Window */}
        <div className="rounded-xl border border-border overflow-hidden terminal-box-glow">
          <TerminalTitleBar />

          <div className="bg-terminal-bg p-4 md:p-6 space-y-1">
            {/* Welcome / Hero */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-primary" />
                <span className="text-primary font-bold text-lg terminal-glow">portfolio.sh</span>
              </div>
              <div className="text-foreground text-xl md:text-2xl font-bold mb-1">
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

            {/* Projects */}
            <div ref={projectsRef}>
              <TerminalBlock command="ls ~/projects --pinned" prompt="~/projects" delay={1.0}>
                <div className="grid gap-3 md:grid-cols-2 mt-1">
                  <ProjectCard
                    name="k1000-Main"
                    description="Full scale rollback & implementation of an Experimental & Conceptual Design website for K1000 — KIIT University's R&D organisation."
                    tech={["TypeScript", "Web", "Design"]}
                    url="https://github.com/InsaneCoder789/k1000-Main"
                    delay={1.2}
                  />
                  <ProjectCard
                    name="Trilingo"
                    description="Your ultimate travel companion for seamless adventures worldwide."
                    tech={["Dart", "Flutter", "Mobile"]}
                    stars={3}
                    url="https://github.com/InsaneCoder789/Trilingo"
                    delay={1.4}
                  />
                  <ProjectCard
                    name="Student-Database-Manager"
                    description="A Database Manager using Modded Tkinter GUI and MySQL for student records."
                    tech={["Python", "Tkinter", "MySQL"]}
                    stars={2}
                    url="https://github.com/InsaneCoder789/Student-Database-Manager"
                    delay={1.6}
                  />
                  <ProjectCard
                    name="Millionaire"
                    description="Kaun Banega Crorepati — the classic quiz game built in Python."
                    tech={["Python", "Game", "CLI"]}
                    stars={1}
                    url="https://github.com/InsaneCoder789/Millionaire"
                    delay={1.8}
                  />
                </div>
              </TerminalBlock>
            </div>

            {/* Skills */}
            <div ref={skillsRef}>
              <TerminalBlock command="neofetch --skills" delay={2.0}>
                <div className="flex flex-col md:flex-row gap-6 mt-1">
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
            <CommandInput onCommand={handleCommand} />

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
              className="text-center text-muted-foreground text-[10px] pt-4 pb-2"
            >
              built with ❤️ and too much caffeine · © {new Date().getFullYear()} Rohan Chatterjee
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
