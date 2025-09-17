import React, { useState, useEffect, useRef } from "react";
import "./Terminal.css";
import data from "../../data.json";

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentDirectory, setCurrentDirectory] = useState("~");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputKey, setInputKey] = useState(Math.random());
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const fileSystem = {
    "~": {
      type: "directory",
      contents: {
        "about.txt": { type: "file", content: `${data.name}\n${data.title}\n\nInterests: ${data.interests}\nCurrent: ${data.current}\nEducation: ${data.education}` },
        "contact.txt": { type: "file", content: `Email: ${data.contact.email}\nGitHub: github.com/${data.contact.github}\nX: x.com/${data.contact.x}\nInstagram: instagram.com/${data.contact.instagram}\nLinkedIn: linkedin.com/in/${data.contact.linkedin}\nSnapchat: snapchat.com/add/${data.contact.snapchat}` },
        "resume.txt": { type: "file", content: `${data.name} - Resume\n\nEducation: ${data.education}\nCurrent: ${data.current}\nPrevious Experience:\n• ${data.past}\n\nSkills: React, JavaScript, Python, Machine Learning, Robotics` },
        "projects": {
          type: "directory",
          contents: {
            "website.txt": { type: "file", content: "Personal Portfolio Website\nBuilt with React + Vite\nFeatures: Desktop-like interface, Terminal app, Music player" },
            "terminal.txt": { type: "file", content: "macOS Terminal Clone\nBuilt with React\nFeatures: Command execution, File system simulation, Command history" }
          }
        },
        "experience": {
          type: "directory",
          contents: {
            "current.txt": { type: "file", content: data.current },
            "past.txt": { type: "file", content: data.past }
          }
        },
        "notes": {
          type: "directory",
          contents: {
            "ideas.txt": { type: "file", content: "Project Ideas:\n• AI-powered code assistant\n• Robotics simulation platform\n• Financial analysis tool" }
          }
        }
      }
    }
  };

  const commands = {
    help: () => ({
      output: `Available commands:
  help          Show this help message
  ls            List directory contents
  cd <dir>      Change directory
  pwd           Print working directory
  cat <file>    Display file contents
  clear         Clear terminal (Ctrl+L)
  whoami        Display current user
  date          Show current date and time
  echo <text>   Display text
  mkdir <dir>   Create directory
  touch <file>  Create empty file
  rm <file>     Remove file
  history       Show command history
  about         Show about information
  contact       Show contact information
  projects      List projects
  experience    Show experience
  tree          Display directory tree
  find <term>   Search for files/directories
  grep <pattern> <file>  Search within files
  wc <file>     Count lines, words, characters
  head <file>   Show first 10 lines
  tail <file>   Show last 10 lines
  which <cmd>   Locate command
  man <cmd>     Show manual page
  open <file>   Open file/directory
  curl <url>    Transfer data from server
  ping <host>   Send ICMP packets
  ssh <host>    Secure shell connection
  git <cmd>     Git version control
  npm <cmd>     Node package manager
  uname         System information
  uptime        Show system uptime
  ps            Show running processes
  top           Display system processes
  exit          Close terminal

Navigation:
  ↑/↓ arrows   Browse command history
  Tab          Auto-complete commands/files
  Ctrl+L       Clear screen`
    }),

    ls: (args) => {
      const path = args[0] || currentDirectory;
      const dir = getDirectoryContents(path);
      if (!dir) return { output: `ls: ${path}: No such file or directory`, error: true };

      const contents = Object.entries(dir.contents || {});
      if (contents.length === 0) return { output: "" };

      const formatted = contents.map(([name, item]) => {
        if (item.type === "directory") {
          return `\x1b[34m${name}/\x1b[0m`;
        } else {
          return name;
        }
      });

      return { output: formatted.join("  "), colored: true };
    },

    pwd: () => ({ output: currentDirectory }),

    cd: (args) => {
      if (!args[0]) {
        setCurrentDirectory("~");
        return { output: "" };
      }

      let newPath;
      if (args[0] === "..") {
        newPath = getParentDirectory(currentDirectory);
      } else if (args[0].startsWith("/")) {
        newPath = args[0];
      } else if (args[0].startsWith("~/")) {
        newPath = args[0];
      } else {
        newPath = currentDirectory === "~" ? `~/${args[0]}` : `${currentDirectory}/${args[0]}`;
      }

      const dir = getDirectoryContents(newPath);

      if (!dir || dir.type !== "directory") {
        return { output: `cd: ${args[0]}: No such file or directory`, error: true };
      }

      setCurrentDirectory(newPath);
      return { output: "" };
    },

    cat: (args) => {
      if (!args[0]) return { output: "cat: missing file operand", error: true };

      const file = getFileContents(args[0]);
      if (!file) return { output: `cat: ${args[0]}: No such file or directory`, error: true };
      if (file.type !== "file") return { output: `cat: ${args[0]}: Is a directory`, error: true };

      return { output: file.content || "" };
    },

    clear: () => {
      setHistory([]);
      return null;
    },

    whoami: () => ({ output: "danish" }),

    date: () => ({ output: new Date().toString() }),

    echo: (args) => ({ output: args.join(" ") }),

    mkdir: (args) => {
      if (!args[0]) return { output: "mkdir: missing operand", error: true };
      return { output: `mkdir: created directory '${args[0]}'` };
    },

    touch: (args) => {
      if (!args[0]) return { output: "touch: missing file operand", error: true };
      return { output: "" };
    },

    rm: (args) => {
      if (!args[0]) return { output: "rm: missing operand", error: true };
      return { output: "" };
    },

    history: () => ({
      output: commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join("\n")
    }),

    about: () => ({ output: commands.cat(["about.txt"]).output }),

    contact: () => ({ output: commands.cat(["contact.txt"]).output }),

    projects: () => ({
      output: "Available projects:\n• Personal Website (React + Vite)\n• Terminal App\n• Music Player\n• Guest Book"
    }),

    experience: () => ({
      output: `Current:\n${data.current.map(exp => `• ${exp}`).join("\n")}\nPast:\n• ${data.past}\n`
    }),

    uname: () => ({ output: "Darwin danish-macbook 23.1.0 Darwin Kernel Version 23.1.0" }),

    uptime: () => {
      const uptime = Math.floor(Math.random() * 100000);
      return { output: `up ${Math.floor(uptime / 3600)}:${Math.floor((uptime % 3600) / 60)}` };
    },

    ps: () => ({
      output: "  PID TTY           TIME CMD\n 1234 ttys000    0:00.01 -zsh\n 5678 ttys000    0:00.02 terminal"
    }),

    top: () => ({
      output: "Processes: 342 total, 2 running, 340 sleeping\nLoad Avg: 1.23, 1.45, 1.67\nCPU usage: 12.3% user, 4.5% sys, 83.2% idle"
    }),

    exit: () => ({ output: "logout", exit: true }),

    tree: (args) => {
      const buildTree = (dir, prefix = "", isLast = true) => {
        if (!dir || !dir.contents) return "";
        const entries = Object.entries(dir.contents);
        let result = "";

        entries.forEach(([name, item], index) => {
          const isLastItem = index === entries.length - 1;
          const connector = isLastItem ? "└── " : "├── ";
          result += prefix + connector + name + (item.type === "directory" ? "/" : "") + "\n";

          if (item.type === "directory") {
            const newPrefix = prefix + (isLastItem ? "    " : "│   ");
            result += buildTree(item, newPrefix, isLastItem);
          }
        });

        return result;
      };

      const dir = getDirectoryContents(currentDirectory);
      return { output: currentDirectory + "/\n" + buildTree(dir) };
    },

    find: (args) => {
      if (!args[0]) return { output: "find: missing argument", error: true };
      const searchTerm = args[0];
      const results = [];

      const searchDir = (dir, path = "") => {
        if (!dir?.contents) return;
        Object.entries(dir.contents).forEach(([name, item]) => {
          const fullPath = path ? `${path}/${name}` : name;
          if (name.includes(searchTerm)) {
            results.push(fullPath);
          }
          if (item.type === "directory") {
            searchDir(item, fullPath);
          }
        });
      };

      searchDir(getDirectoryContents(currentDirectory));
      return { output: results.join("\n") || `find: '${searchTerm}' not found` };
    },

    grep: (args) => {
      if (args.length < 2) return { output: "grep: missing arguments", error: true };
      const pattern = args[0];
      const filename = args[1];
      const file = getFileContents(filename);

      if (!file) return { output: `grep: ${filename}: No such file or directory`, error: true };
      if (file.type !== "file") return { output: `grep: ${filename}: Is a directory`, error: true };

      const lines = file.content.split("\n");
      const matches = lines.filter(line => line.toLowerCase().includes(pattern.toLowerCase()));

      return { output: matches.join("\n") || `grep: no matches found for '${pattern}'` };
    },

    wc: (args) => {
      if (!args[0]) return { output: "wc: missing file operand", error: true };
      const file = getFileContents(args[0]);

      if (!file) return { output: `wc: ${args[0]}: No such file or directory`, error: true };
      if (file.type !== "file") return { output: `wc: ${args[0]}: Is a directory`, error: true };

      const lines = file.content.split("\n").length;
      const words = file.content.split(/\s+/).filter(w => w).length;
      const chars = file.content.length;

      return { output: `${lines} ${words} ${chars} ${args[0]}` };
    },

    head: (args) => {
      const lines = args.includes("-n") ? parseInt(args[args.indexOf("-n") + 1]) || 10 : 10;
      const filename = args[args.length - 1];

      if (!filename || filename.startsWith("-")) return { output: "head: missing file operand", error: true };

      const file = getFileContents(filename);
      if (!file) return { output: `head: ${filename}: No such file or directory`, error: true };
      if (file.type !== "file") return { output: `head: ${filename}: Is a directory`, error: true };

      return { output: file.content.split("\n").slice(0, lines).join("\n") };
    },

    tail: (args) => {
      const lines = args.includes("-n") ? parseInt(args[args.indexOf("-n") + 1]) || 10 : 10;
      const filename = args[args.length - 1];

      if (!filename || filename.startsWith("-")) return { output: "tail: missing file operand", error: true };

      const file = getFileContents(filename);
      if (!file) return { output: `tail: ${filename}: No such file or directory`, error: true };
      if (file.type !== "file") return { output: `tail: ${filename}: Is a directory`, error: true };

      const fileLines = file.content.split("\n");
      return { output: fileLines.slice(-lines).join("\n") };
    },

    which: (args) => {
      if (!args[0]) return { output: "which: missing argument", error: true };
      const command = args[0];
      return commands[command] ? { output: `/usr/bin/${command}` } : { output: `which: ${command}: not found`, error: true };
    },

    man: (args) => {
      if (!args[0]) return { output: "man: missing argument", error: true };
      const command = args[0];
      const manPages = {
        ls: "ls - list directory contents\nUsage: ls [directory]",
        cd: "cd - change directory\nUsage: cd [directory]",
        pwd: "pwd - print working directory\nUsage: pwd",
        cat: "cat - display file contents\nUsage: cat <file>",
        help: "help - show available commands\nUsage: help",
        clear: "clear - clear terminal screen\nUsage: clear",
        tree: "tree - display directory tree\nUsage: tree",
        find: "find - search for files\nUsage: find <search_term>",
        grep: "grep - search within files\nUsage: grep <pattern> <file>",
        wc: "wc - word, line, character count\nUsage: wc <file>"
      };
      return { output: manPages[command] || `man: no manual entry for ${command}` };
    },

    open: (args) => {
      if (!args[0]) return { output: "open: missing file operand", error: true };
      const file = getFileContents(args[0]);

      if (!file) return { output: `open: ${args[0]}: No such file or directory`, error: true };

      if (file.type === "file") {
        return { output: `Opening ${args[0]}...\n${file.content}` };
      } else {
        return { output: `Opening directory ${args[0]}...` };
      }
    },

    curl: (args) => {
      if (!args[0]) return { output: "curl: missing URL", error: true };
      const url = args[0];

      if (url.includes("github.com")) {
        return { output: `Fetching ${url}...\nConnected to GitHub successfully!` };
      } else if (url.includes("linkedin.com")) {
        return { output: `Fetching ${url}...\nConnected to LinkedIn successfully!` };
      } else {
        return { output: `curl: (6) Could not resolve host: ${url}`, error: true };
      }
    },

    ping: (args) => {
      if (!args[0]) return { output: "ping: missing host", error: true };
      const host = args[0];
      return { output: `PING ${host}: 56 data bytes\n64 bytes from ${host}: icmp_seq=0 ttl=64 time=12.345 ms\n64 bytes from ${host}: icmp_seq=1 ttl=64 time=11.234 ms\n--- ${host} ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss` };
    },

    ssh: (args) => {
      if (!args[0]) return { output: "ssh: missing hostname", error: true };
      return { output: `ssh: connect to host ${args[0]} port 22: Connection refused`, error: true };
    },

    git: (args) => {
      if (!args[0]) return { output: "git: missing command", error: true };
      const subcommand = args[0];

      const gitCommands = {
        status: "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean",
        log: "commit abc123 (HEAD -> main, origin/main)\nAuthor: Danish <aansaridan@gmail.com>\nDate: " + new Date().toDateString() + "\n\n    Add terminal app",
        branch: "* main\n  develop",
        remote: "origin\thttps://github.com/dan10ish/portfolio.git (fetch)\norigin\thttps://github.com/dan10ish/portfolio.git (push)"
      };

      return { output: gitCommands[subcommand] || `git: '${subcommand}' is not a git command` };
    },

    npm: (args) => {
      if (!args[0]) return { output: "npm: missing command", error: true };
      const subcommand = args[0];

      if (subcommand === "start" || subcommand === "run") {
        return { output: "Starting development server...\nServer running on http://localhost:5173" };
      } else if (subcommand === "install") {
        return { output: "Installing dependencies...\nDependencies installed successfully!" };
      } else if (subcommand === "version") {
        return { output: "npm: 10.2.4\nnode: v20.11.0" };
      }

      return { output: `npm: unknown command '${subcommand}'`, error: true };
    }
  };

  const getDirectoryContents = (path) => {
    if (path === "~" || path === "/") return fileSystem["~"];
    if (path.startsWith("~/")) {
      const subPath = path.slice(2);
      const parts = subPath.split("/");
      let current = fileSystem["~"];
      for (const part of parts) {
        if (current?.contents?.[part]?.type === "directory") {
          current = current.contents[part];
        } else {
          return null;
        }
      }
      return current;
    }
    const currentDir = getDirectoryContents(currentDirectory);
    return currentDir?.contents?.[path];
  };

  const getFileContents = (filename) => {
    if (filename.includes("/")) {
      const parts = filename.split("/");
      const fileName = parts.pop();
      const dirPath = parts.join("/");
      const dir = getDirectoryContents(dirPath);
      return dir?.contents?.[fileName];
    }
    const dir = getDirectoryContents(currentDirectory);
    return dir?.contents?.[filename];
  };

  const getParentDirectory = (path) => {
    if (path === "~") return "~";
    const parts = path.split("/").filter(p => p);
    if (parts.length <= 1) return "~";
    return parts.slice(0, -1).join("/") || "~";
  };

  const executeCommand = (input) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const [command, ...args] = trimmed.split(" ");
    const cmd = commands[command];

    const historyEntry = {
      command: trimmed,
      output: "",
      error: false,
      directory: currentDirectory
    };

    if (cmd) {
      const result = cmd(args);
      if (result === null) return;

      historyEntry.output = result.output || "";
      historyEntry.error = result.error || false;
      historyEntry.colored = result.colored || false;

      if (result.exit) {
        historyEntry.output = "logout";
      }
    } else {
      historyEntry.output = `zsh: command not found: ${command}`;
      historyEntry.error = true;
    }

    setHistory(prev => [...prev, historyEntry]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const [command, ...args] = currentInput.split(" ");
      if (args.length === 0) {
        const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(command));
        if (matchingCommands.length === 1) {
          setCurrentInput(matchingCommands[0] + " ");
        }
      } else {
        const lastArg = args[args.length - 1];
        const dir = getDirectoryContents(currentDirectory);
        const matches = Object.keys(dir?.contents || {}).filter(name => name.startsWith(lastArg));
        if (matches.length === 1) {
          const newArgs = [...args.slice(0, -1), matches[0]];
          setCurrentInput(command + " " + newArgs.join(" "));
        }
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setInputKey(Math.random());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal-app" onClick={handleTerminalClick}>
      <div className="terminal-content" ref={terminalRef}>
        <div className="terminal-welcome">
          Last login: {new Date().toDateString()} on ttys000
          <br />
          Type 'help' to see available commands.
        </div>

        {history.map((entry, index) => (
          <div key={index} className="terminal-entry">
            <div className="terminal-prompt">
              <span className="terminal-user">danish@macbook</span>
              <span className="terminal-separator">:</span>
              <span className="terminal-path">{entry.directory}</span>
              <span className="terminal-dollar">$</span>
              <span className="terminal-command">{entry.command}</span>
            </div>
            {entry.output && (
              <div className={`terminal-output ${entry.error ? "terminal-error" : ""}`}>
                {entry.colored ? (
                  <span dangerouslySetInnerHTML={{
                    __html: entry.output
                      .replace(/\x1b\[34m/g, '<span style="color: #4a9eff;">')
                      .replace(/\x1b\[0m/g, '</span>')
                  }} />
                ) : (
                  entry.output
                )}
              </div>
            )}
          </div>
        ))}

        <div className="terminal-input-line">
          <span className="terminal-prompt">
            <span className="terminal-user">danish@macbook</span>
            <span className="terminal-separator">:</span>
            <span className="terminal-path">{currentDirectory}</span>
            <span className="terminal-dollar">%</span>
          </span>
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <div className="terminal-input-container">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoSave="off"
                data-form-type="other"
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                data-dashlane-ignore="true"
                name={`terminal-input-${inputKey}`}
                id={`terminal-input-${inputKey}`}
                role="textbox"
                aria-label="Terminal command input"
                inputMode="text"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;