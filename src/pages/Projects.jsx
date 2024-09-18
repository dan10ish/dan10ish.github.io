import React from "react";

export default function Projects() {
  return (
    <>
      <div className="projects">
        <ul>
          <li>
            <a
              href="https://dan10ish.github.io/pathfinding-visualizer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pathfinding Visualizer
            </a>
            <br />
            <code>React</code> <code>Algorithms</code>
          </li>
          <li>
            <a
              href="https://github.com/dan10ish/3DOF-RoboticArm-C"
              target="_blank"
              rel="noopener noreferrer"
            >
              3DOF Robotic Arm
            </a>
            <br />
            <code>Kinematics</code> <code>Dynamics</code>{" "}
            <code>Data Structures</code> <code>Algorithms</code>
          </li>
        </ul>
      </div>
    </>
  );
}
