import { useRef, useCallback, useEffect, useState } from "react"; 
import { motion } from "framer-motion";
import { Github, MapPin, Code2, Terminal, Instagram, Twitter, Loader2, Skull, GraduationCap, Briefcase, Shield, Smartphone, Download, FileText, Trophy, Users } from "lucide-react";
import TerminalTitleBar from "@/components/TerminalTitleBar";
import TerminalBlock from "@/components/TerminalBlock";
import TypingText from "@/components/TypingText";
import ProjectCard from "@/components/ProjectCard";
import SkillBar from "@/components/SkillBar";
import CommandInput from "@/components/CommandInput";
import StatusBar from "@/components/StatusBar";
import CyberGrid from "@/components/CyberGrid";
import KaliBootScreen from "@/components/KaliBootScreen";
import GithubContributions from "@/components/GithubContributions";
import TechLogosSection from "@/components/TechLogosSection";
import { useGithubRepos } from "@/hooks/useGithubRepos";

const LANG_TO_TECH: Record<string, string[]> = {
  TypeScript: ["TypeScript", "Web"],
  JavaScript: ["JavaScript", "Web"],
  Python: ["Python"],
  Dart: ["Dart", "Flutter"],
  HTML: ["HTML", "Web"],
  CSS: ["CSS", "Web"],
  Kotlin: ["Kotlin", "Android"],
  Tcl: ["Tkinter", "Python"],
};

const KALI_DRAGON = `    ⠀⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣷⣶⣄⣀⣀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣰⣾⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀
    ⠀⠀⠀⠀⣸⣿⣿⣿⣿⠃⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀
    ⠀⠀⠀⣿⣿⣿⣿⣿⡅⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⠟⠛⣿⠀
    ⠀⠀⠀⢸⣿⣿⣿⣿⡇⠀⠀⠀⢸⣿⣿⡿⠟⠋⠀⠀⠀⡇⠀
    ⠀⠀⠀⠀⠻⢿⣿⡿⠁⠀⠀⠀⠈⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀`;

const QUICK_COMMANDS = [
  { label: "about", desc: "Who am I" },
  { label: "projects", desc: "My work" },
  { label: "skills", desc: "Tech stack" },
  { label: "resume", desc: "Download CV" },
  { label: "contact", desc: "Reach out" },
];

const Index = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [booted, setBooted] = useState(false);

  const { data: repos, isLoading: reposLoading } = useGithubRepos();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (booted) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [booted]);

  const scrollTo = useCallback((section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      about: aboutRef,
      projects: projectsRef,
      skills: skillsRef,
      contact: contactRef,
      resume: resumeRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleCommand = useCallback((cmd: string) => {
    if (cmd === "resume") {
      const link = document.createElement("a");
      link.href = "/Rohan_Chatterjee_Resume.pdf";
      link.download = "Rohan_Chatterjee_Resume.pdf";
      link.click();
      return;
    }
    if (["about", "projects", "skills", "contact"].includes(cmd)) {
      scrollTo(cmd);
    }
  }, [scrollTo]);

  return (
    <div className="min-h-screen bg-terminal-bg/70 scanline relative">
      {!booted && <KaliBootScreen onComplete={() => setBooted(true)} />}
      
      <CyberGrid />

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col w-full border-x border-border terminal-box-glow">
          <TerminalTitleBar />

          <div className="flex-1 bg-terminal-bg/40 p-4 md:p-8 lg:px-16 space-y-1 overflow-y-auto pb-12">

            {/* Quick Navigation + Command Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : -10 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 p-2 sm:p-3 rounded-lg bg-terminal-block border border-border"
            >
              <span className="text-terminal-prompt text-[10px] sm:text-xs mr-0.5 sm:mr-1">$</span>
              <span className="text-muted-foreground text-[10px] sm:text-xs mr-1 sm:mr-2">quick-nav:</span>
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd.label}
                  onClick={() => handleCommand(cmd.label)}
                  className="text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm bg-secondary hover:bg-primary/20 text-primary font-medium transition-colors border border-border hover:border-primary/40"
                  title={cmd.desc}
                >
                  {cmd.label}
                </button>
              ))}
              <span className="text-muted-foreground text-[9px] sm:text-[10px] ml-auto hidden sm:inline">
                type <span className="text-primary font-semibold">'help'</span> in terminal below for all commands
              </span>
            </motion.div>

            {/* Welcome / Hero */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: booted ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-start gap-6 mb-4">
                <pre className="text-primary terminal-glow text-[8px] md:text-[10px] leading-tight hidden md:block select-none">
                  {KALI_DRAGON}
                </pre>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Skull className="w-5 h-5 text-primary" />
                    <span className="text-primary font-bold text-lg terminal-glow">portfolio.sh</span>
                    <span className="text-muted-foreground text-[10px] ml-2 opacity-50">PID 1337 · TTY pts/0 · root</span>
                  </div>
                  <div className="text-foreground text-xl md:text-3xl font-bold mb-1">
                    <TypingText text="Hey, I'm Rohan Chatterjee 👋" speed={50} />
                  </div>
                  <p className="text-terminal-output text-sm mt-2">
                    <span className="text-terminal-success">root@kali</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-primary">~</span>
                    <span className="text-muted-foreground"># </span>
                    InsaneCoder789 · Software Dev Intern · Open source enthusiast · Python adopter 🐍
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
                    <a href="https://www.linkedin.com/in/rochiee24/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-xs font-semibold">
                      in
                    </a>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Working from home 🏠
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <div ref={aboutRef}>
              <TerminalBlock command="cat about.md" delay={0.6}>
                <div className="text-terminal-output leading-relaxed space-y-3">
                  <p>
                    Software Development Intern with hands-on experience in Android (Kotlin) and Flutter,
                    and working knowledge of Firebase and Python. Strong foundation in CS concepts,
                    experience building UI-centric and logic-driven applications, and a collaborative
                    mindset developed through team-based projects and hackathons.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    <div className="flex items-start gap-2 text-xs">
                      <GraduationCap className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span><span className="text-foreground font-semibold">KIIT University</span> — B.Tech CSE (2024–2028)</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Briefcase className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span><span className="text-foreground font-semibold">GFG KIIT</span> — Android Developer (Jan 2026 – Present)</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Briefcase className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span><span className="text-foreground font-semibold">K1000 KIIT</span> — Android Developer (May 2025 – Present)</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Shield className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span><span className="text-foreground font-semibold">Cybersecurity</span> — Built Lakshman Rekha anti-scam app</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Smartphone className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span><span className="text-foreground font-semibold">Mobile dev</span> — Flutter/Dart & Kotlin Android apps</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <GraduationCap className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span><span className="text-foreground font-semibold">Mayoor Private School, Abu Dhabi</span> — CBSE (2024 Batch)</span>
                    </div>
                  </div>
                </div>
              </TerminalBlock>
            </div>

            {/* Experience & Activities */}
            <TerminalBlock command="cat experience.log" delay={0.8}>
              <div className="text-terminal-output space-y-3 text-xs leading-relaxed">
                <div className="flex items-start gap-2">
                  <Trophy className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="text-foreground font-semibold">Smart India Hackathon 2025</span>
                    <span className="text-muted-foreground"> — Volunteer, KIIT School of CS (Oct 2025)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="text-foreground font-semibold">Ignithon Hackathon OC</span>
                    <span className="text-muted-foreground"> — K1000, 12-hour hackathon at KIIT (Aug 2025)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="text-foreground font-semibold">Shark-A-Thon OC</span>
                    <span className="text-muted-foreground"> — K1000 × Unstop collab hackathon at KIIT (Dec 2025)</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-border">
                  <span className="text-muted-foreground">Certifications: </span>
                  <span className="text-foreground">Android App Dev (K1000) · Flutter & Dart (ELabs KIIT)</span>
                </div>
              </div>
            </TerminalBlock>

            {/* Projects */}
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

            {/* Tech Logos */}
            <TerminalBlock command="dpkg --list-installed-tech" delay={1.3}>
              <TechLogosSection delay={1.4} />
            </TerminalBlock>

            {/* GitHub Contributions */}
            <TerminalBlock command="gh contributions --graph" delay={1.6}>
              <GithubContributions delay={1.8} />
            </TerminalBlock>

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
                    <SkillBar name="Kotlin" level={76} delay={2.45} />
                    <SkillBar name="JavaScript" level={85} delay={2.5} />
                    <SkillBar name="React" level={75} delay={2.6} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="text-primary text-xs font-semibold mb-3 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Tools & Infrastructure
                    </div>
                    <SkillBar name="Git" level={90} delay={2.3} />
                    <SkillBar name="Firebase" level={74} delay={2.4} />
                    <SkillBar name="REST APIs" level={78} delay={2.45} />
                    <SkillBar name="MySQL" level={75} delay={2.5} />
                    <SkillBar name="Linux" level={72} delay={2.55} />
                    <SkillBar name="Android Dev" level={80} delay={2.6} />
                  </div>
                </div>
              </TerminalBlock>
            </div>

            {/* Resume */}
            <div ref={resumeRef}>
              <TerminalBlock command="cat ~/resume.pdf --preview" delay={2.4}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-semibold">Rohan_Chatterjee_Resume.pdf</span>
                      <span className="text-muted-foreground text-xs">(1 page)</span>
                    </div>
                    <a
                      href="/Rohan_Chatterjee_Resume.pdf"
                      download="Rohan_Chatterjee_Resume.pdf"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/15 hover:bg-primary/25 text-primary text-xs font-medium border border-primary/30 hover:border-primary/50 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Resume
                    </a>
                  </div>
                  <div className="text-xs text-terminal-output border border-border rounded-md p-3 bg-terminal-bg/50 space-y-2">
                    <div className="text-foreground font-semibold text-sm">Rohan Chatterjee — Software Development Intern</div>
                    <div className="text-muted-foreground">KIIT University · chatterjeerohan0204@gmail.com</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-border">
                      <span>▸ Android (Kotlin) & Flutter developer</span>
                      <span>▸ Firebase, REST APIs, OOP</span>
                      <span>▸ K1000 KIIT & GFG KIIT member</span>
                      <span>▸ SIH 2025 volunteer, Hackathon OC</span>
                    </div>
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
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold text-xs w-3.5 text-center">in</span>
                    <a href="https://www.linkedin.com/in/rochiee24/" target="_blank" rel="noopener noreferrer" className="text-terminal-link hover:underline">linkedin.com/in/rochiee24</a>
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
              rochiee24 · © {new Date().getFullYear()}
            </motion.div>
          </div>
        </div>

        <StatusBar />
      </div>
    </div>
  );
};

export default Index;
