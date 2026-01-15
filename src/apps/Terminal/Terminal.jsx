import React, { useState, useEffect, useRef, useId } from "react";
import { useFileSystem, useUserData } from "../../context/DataContext";
import "./Terminal.css";

const Terminal = () => {
  const fileSystem = useFileSystem();
  const { profile, contact, terminal } = useUserData();

  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentDirectory, setCurrentDirectory] = useState("~");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputId = useId();
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

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
  tree          Display directory tree
  find <term>   Search for files/directories
  grep <pattern> <file>  Search within files
  wc <file>     Count lines, words, characters
  head <file>   Show first 10 lines
  tail <file>   Show last 10 lines
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

    whoami: () => ({ output: terminal.username }),

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

    about: () => ({
      output: `${profile.name}\n${profile.title}\n\nInterests: ${profile.interests}`
    }),

    contact: () => ({
      output: `Email: ${contact.email}\nPhone: ${contact.phone}`
    }),

    tree: () => {
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

    exit: () => ({ output: "logout", exit: true }),

    uname: () => ({ output: `Darwin ${terminal.hostname} 23.1.0 Darwin Kernel Version 23.1.0` }),

    uptime: () => {
      const uptime = Math.floor(Math.random() * 100000);
      return { output: `up ${Math.floor(uptime / 3600)}:${Math.floor((uptime % 3600) / 60)}` };
    },

    ps: () => ({
      output: "  PID TTY           TIME CMD\n 1234 ttys000    0:00.01 -zsh\n 5678 ttys000    0:00.02 terminal"
    }),

    top: () => ({
      output: "Processes: 342 total, 2 running, 340 sleeping\nLoad Avg: 1.23, 1.45, 1.67\nCPU usage: 12.3% user, 4.5% sys, 83.2% idle"
    })
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
      inputRef.current.focus({ preventScroll: true });
    }
  }, []);

  const handleTerminalClick = (e) => {
    if (inputRef.current) {
      e.preventDefault();
      inputRef.current.focus({ preventScroll: true });
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
              <span className="terminal-user">{terminal.username}@{terminal.hostname.split('-')[0]}</span>
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
            <span className="terminal-user">{terminal.username}@{terminal.hostname.split('-')[0]}</span>
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
                name={`terminal-input-${inputId}`}
                id={`terminal-input-${inputId}`}
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