import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Linkedin, MapPin, Code2, Terminal } from "lucide-react";
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
                <TypingText text="Hey, I'm Your Name 👋" speed={50} />
              </div>
              <p className="text-terminal-output text-sm mt-2">
                Full-stack developer · Open source enthusiast · Builder of things
              </p>
              <div className="flex items-center gap-4 mt-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="mailto:you@email.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> San Francisco, CA
                </span>
              </div>
            </motion.div>

            {/* About */}
            <div ref={aboutRef}>
              <TerminalBlock command="cat about.md" delay={0.6}>
                <p className="text-terminal-output leading-relaxed">
                  I'm a passionate developer who loves building elegant, performant applications. 
                  With expertise spanning frontend and backend technologies, I craft digital 
                  experiences that are both beautiful and functional. When I'm not coding, you'll 
                  find me contributing to open source or exploring new technologies.
                </p>
              </TerminalBlock>
            </div>

            {/* Projects */}
            <div ref={projectsRef}>
              <TerminalBlock command="ls ~/projects --featured" prompt="~/projects" delay={1.0}>
                <div className="grid gap-3 md:grid-cols-2 mt-1">
                  <ProjectCard
                    name="awesome-cli-tool"
                    description="A blazing fast CLI tool built with Rust for managing development workflows."
                    tech={["Rust", "CLI", "Open Source"]}
                    stars={342}
                    url="https://github.com"
                    delay={1.2}
                  />
                  <ProjectCard
                    name="react-terminal-ui"
                    description="Terminal-styled React components for building hacker-aesthetic interfaces."
                    tech={["React", "TypeScript", "CSS"]}
                    stars={128}
                    url="https://github.com"
                    delay={1.4}
                  />
                  <ProjectCard
                    name="api-gateway-proxy"
                    description="High-performance API gateway with rate limiting, caching and auth middleware."
                    tech={["Go", "Docker", "Redis"]}
                    stars={89}
                    url="https://github.com"
                    delay={1.6}
                  />
                  <ProjectCard
                    name="dotfiles"
                    description="My personal development environment config. Neovim, tmux, zsh and more."
                    tech={["Shell", "Lua", "Config"]}
                    stars={56}
                    url="https://github.com"
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
                    <SkillBar name="TypeScript" level={92} delay={2.2} />
                    <SkillBar name="React" level={90} delay={2.3} />
                    <SkillBar name="Node.js" level={85} delay={2.4} />
                    <SkillBar name="Rust" level={70} delay={2.5} />
                    <SkillBar name="Go" level={65} delay={2.6} />
                    <SkillBar name="Python" level={78} delay={2.7} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="text-primary text-xs font-semibold mb-3 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Tools & Infrastructure
                    </div>
                    <SkillBar name="Docker" level={88} delay={2.3} />
                    <SkillBar name="AWS" level={75} delay={2.4} />
                    <SkillBar name="PostgreSQL" level={82} delay={2.5} />
                    <SkillBar name="Git" level={95} delay={2.6} />
                    <SkillBar name="Linux" level={85} delay={2.7} />
                    <SkillBar name="CI/CD" level={80} delay={2.8} />
                  </div>
                </div>
              </TerminalBlock>
            </div>

            {/* Contact */}
            <div ref={contactRef}>
              <TerminalBlock command="echo $CONTACT_INFO" delay={2.8}>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <a href="mailto:you@email.com" className="text-terminal-link hover:underline">you@email.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-primary" />
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-terminal-link hover:underline">github.com/yourusername</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-primary" />
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-terminal-link hover:underline">linkedin.com/in/yourusername</a>
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
              built with ❤️ and too much caffeine · © {new Date().getFullYear()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
