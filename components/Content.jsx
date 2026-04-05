"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
  Suspense,
  useRef,
} from "react";
import {
  Globe,
  Star,
  ChevronUp,
  ChevronDown,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const LucideIcon = memo(({ icon: Icon, ...props }) => (
  <Icon strokeWidth={2} {...props} />
));
LucideIcon.displayName = "LucideIcon";

const XIcon = memo(({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 22 25" fill="currentColor">
    <path d="M21.8518 22.4638L14.0268 10.1663L21.7481 1.6725C21.9227 1.47566 22.0127 1.21791 21.9986 0.955153C21.9844 0.692393 21.8673 0.445794 21.6725 0.26882C21.4778 0.0918457 21.2212 -0.0012398 20.9583 0.00974476C20.6953 0.0207293 20.4474 0.134898 20.2681 0.3275L12.9131 8.4175L7.85181 0.46375C7.76156 0.321693 7.63692 0.204713 7.48942 0.123647C7.34193 0.0425814 7.17637 5.21628e-05 7.00806 1.18294e-07H1.00806C0.828765 -8.70794e-05 0.652741 0.0480342 0.498423 0.139325C0.344105 0.230615 0.217171 0.361717 0.13091 0.518902C0.0446503 0.676088 0.00223821 0.853574 0.00811486 1.03278C0.0139915 1.21198 0.0679408 1.3863 0.164314 1.5375L7.98931 13.8337L0.268064 22.3337C0.177897 22.4306 0.107851 22.5444 0.061986 22.6685C0.0161206 22.7927 -0.00465234 22.9247 0.000871701 23.0569C0.00639575 23.1891 0.038107 23.3189 0.0941668 23.4388C0.150227 23.5586 0.22952 23.6662 0.327452 23.7552C0.425384 23.8442 0.540006 23.9129 0.664675 23.9572C0.789344 24.0016 0.921581 24.0208 1.05372 24.0137C1.18586 24.0066 1.31528 23.9733 1.43446 23.9158C1.55365 23.8583 1.66025 23.7777 1.74806 23.6787L9.10306 15.5888L14.1643 23.5425C14.2553 23.6834 14.3803 23.7991 14.5277 23.8791C14.6752 23.959 14.8403 24.0006 15.0081 24H21.0081C21.1872 23.9999 21.363 23.9518 21.5171 23.8606C21.6712 23.7693 21.798 23.6384 21.8843 23.4814C21.9705 23.3244 22.013 23.1472 22.0072 22.9681C22.0015 22.7891 21.9479 22.6149 21.8518 22.4638ZM15.5568 22L2.82931 2H6.45431L19.1868 22H15.5568Z" />
  </svg>
));
XIcon.displayName = "XIcon";

const ThreadsIcon = memo(({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 21 26" fill="currentColor">
    <path d="M18.3025 12.4563C17.8686 12.1296 17.4024 11.8482 16.9112 11.6163C16.4112 7.88 13.9113 6.7025 12.7738 6.3575C10.3013 5.6075 7.46 6.50625 6.1675 8.445C6.09462 8.55433 6.04398 8.67694 6.01848 8.80583C5.99298 8.93473 5.99312 9.06738 6.01889 9.19622C6.07093 9.45643 6.22421 9.68531 6.445 9.8325C6.66579 9.9797 6.93602 10.0332 7.19622 9.98111C7.32506 9.95534 7.44757 9.90445 7.55674 9.83134C7.66591 9.75822 7.75962 9.66433 7.8325 9.555C8.62875 8.36 10.5825 7.785 12.1938 8.27125C13.4375 8.64625 14.2962 9.55875 14.7125 10.8962C14.0825 10.7763 13.4426 10.7165 12.8013 10.7175C11.0613 10.7175 9.4325 11.1662 8.2175 11.98C6.7875 12.9462 6 14.375 6 16C6 18.5725 7.9825 20.44 10.7137 20.44C11.5169 20.4345 12.3108 20.2679 13.0484 19.9499C13.7859 19.6319 14.4521 19.169 15.0075 18.5888C15.8125 17.7513 16.7575 16.2938 16.9587 13.9513C17.0062 13.9838 17.0513 14.0175 17.0963 14.0513C18.36 15.0063 19 16.335 19 18C19 20.42 16.4575 24 11 24C7.65875 24 5.315 22.9187 3.8325 20.695C2.61625 18.875 2 16.2825 2 13C2 9.7175 2.61625 7.125 3.8325 5.305C5.315 3.08125 7.65875 2 11 2C15.1163 2 17.75 3.65625 19.0662 7.065C19.1124 7.18896 19.1827 7.30254 19.273 7.39915C19.3634 7.49577 19.472 7.5735 19.5926 7.62785C19.7131 7.68219 19.8433 7.71208 19.9755 7.71577C20.1078 7.71946 20.2394 7.69688 20.3628 7.64934C20.4863 7.6018 20.599 7.53025 20.6946 7.43882C20.7902 7.3474 20.8667 7.23792 20.9197 7.11672C20.9727 6.99552 21.0011 6.86502 21.0033 6.73277C21.0055 6.60051 20.9814 6.46914 20.9325 6.34625C19.335 2.195 15.9 0 11 0C7 0 4.02375 1.41125 2.1675 4.195C0.72875 6.35375 0 9.315 0 13C0 16.685 0.72875 19.6463 2.1675 21.805C4.02375 24.5888 7 26 11 26C14.7587 26 17.1125 24.565 18.425 23.3625C20.0375 21.885 21 19.875 21 18C21 15.7075 20.0675 13.79 18.3025 12.4563ZM13.5662 17.2062C13.1977 17.5928 12.7554 17.9015 12.2654 18.1141C11.7755 18.3267 11.2478 18.4388 10.7137 18.4438C9.3625 18.4438 8 17.6937 8 16.0037C8 14.425 9.5 12.7275 12.8013 12.7275C13.5447 12.7255 14.2847 12.8273 15 13.03C15 14.79 14.5 16.2325 13.5662 17.2025V17.2062Z" />
  </svg>
));
ThreadsIcon.displayName = "ThreadsIcon";

const SnapchatIcon = memo(({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 23" fill="currentColor">
    <path d="M5.82877 3.833C5.22877 5.177 5.46577 7.585 5.56177 9.269C4.91377 9.628 4.08177 8.998 3.61077 8.998C3.12077 8.998 2.53577 9.32 2.44377 9.8C2.37777 10.146 2.53277 10.65 3.64477 11.089C4.07477 11.259 5.09777 11.459 5.33477 12.017C5.66777 12.801 3.62477 16.42 0.416768 16.948C0.165768 16.989 -0.0132325 17.213 0.000767532 17.467C0.0567675 18.442 2.24277 18.824 3.21177 18.974C3.31077 19.108 3.39077 19.674 3.51777 20.105C3.57477 20.298 3.72177 20.529 4.09977 20.529C4.59277 20.529 5.41177 20.149 6.83777 20.385C8.23577 20.618 9.54977 22.6 12.0728 22.6C14.4178 22.6 15.8168 20.609 17.1628 20.385C17.9418 20.256 18.6108 20.297 19.3588 20.443C19.8738 20.544 20.3358 20.6 20.4828 20.094C20.6118 19.657 20.6908 19.102 20.7878 18.971C21.7478 18.822 23.9438 18.441 23.9988 17.466C24.0128 17.212 23.8338 16.989 23.5828 16.947C20.4288 16.427 18.3238 12.819 18.6648 12.016C18.9008 11.459 19.9168 11.261 20.3548 11.088C21.1688 10.767 21.5768 10.372 21.5678 9.915C21.5568 9.33 20.8528 8.981 20.3348 8.981C19.8078 8.981 19.0508 9.605 18.4378 9.267C18.5338 7.569 18.7698 5.172 18.1708 3.829C17.0358 1.286 14.5108 0 11.9868 0C9.47877 0 6.97277 1.268 5.82877 3.833Z" />
  </svg>
));
SnapchatIcon.displayName = "SnapchatIcon";

const GithubIcon = memo(({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 602 667" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M415.647 641.666C415.772 622.212 415.893 554.691 415.893 527.958C415.893 489.324 402.697 464.045 387.897 451.249C479.776 440.983 576.234 405.987 576.234 246.804C576.234 201.574 560.301 164.574 533.838 135.624C538.076 125.141 552.226 82.9994 529.726 25.9578C529.726 25.9578 495.159 14.8244 416.384 68.4744C383.418 59.2536 348.172 54.6911 313.118 54.5078C278.059 54.6911 242.818 59.2578 209.847 68.4744C131.072 14.8244 96.5093 25.9578 96.5093 25.9578C74.0093 82.9994 88.1593 125.141 92.3968 135.624C65.9343 164.574 50.001 201.574 50.001 246.804C50.001 405.987 146.455 440.983 238.334 451.249C223.538 464.045 210.338 489.324 210.338 527.958C210.338 554.691 210.463 622.212 210.584 641.666M25.001 474.999C66.4135 477.929 90.2926 515.562 90.2926 515.562C127.101 578.891 186.868 560.574 210.355 549.999" stroke="currentColor" strokeWidth={60} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));
GithubIcon.displayName = "GithubIcon";

const InstagramIcon = memo(({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 734 734" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M366.667 566.667C477.124 566.667 566.667 477.124 566.667 366.667C566.667 256.21 477.124 166.667 366.667 166.667C256.21 166.667 166.667 256.21 166.667 366.667C166.667 477.124 256.21 566.667 366.667 566.667ZM366.667 500C440.304 500 500 440.304 500 366.667C500 293.029 440.304 233.334 366.667 233.334C293.029 233.334 233.334 293.029 233.334 366.667C233.334 440.304 293.029 500 366.667 500Z" fill="currentColor" />
    <path d="M566.667 133.334C548.257 133.334 533.334 148.258 533.334 166.667C533.334 185.077 548.257 200.001 566.667 200.001C585.077 200.001 600.001 185.077 600.001 166.667C600.001 148.258 585.077 133.334 566.667 133.334Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M21.7987 109.202C0 151.984 0 207.99 0 320V413.333C0 525.343 0 581.35 21.7987 624.13C40.9733 661.763 71.5693 692.36 109.202 711.533C151.984 733.333 207.99 733.333 320 733.333H413.333C525.343 733.333 581.35 733.333 624.13 711.533C661.763 692.36 692.36 661.763 711.533 624.13C733.333 581.35 733.333 525.343 733.333 413.333V320C733.333 207.99 733.333 151.984 711.533 109.202C692.36 71.5693 661.763 40.9733 624.13 21.7987C581.35 0 525.343 0 413.333 0H320C207.99 0 151.984 0 109.202 21.7987C71.5693 40.9733 40.9733 71.5693 21.7987 109.202ZM413.333 66.6667H320C262.895 66.6667 224.075 66.7187 194.069 69.17C164.841 71.558 149.895 75.8863 139.468 81.199C114.38 93.9823 93.9823 114.38 81.199 139.468C75.8863 149.895 71.558 164.841 69.17 194.069C66.7187 224.075 66.6667 262.895 66.6667 320V413.333C66.6667 470.44 66.7187 509.257 69.17 539.263C71.558 568.493 75.8863 583.44 81.199 593.867C93.9823 618.953 114.38 639.35 139.468 652.133C149.895 657.447 164.841 661.777 194.069 664.163C224.075 666.613 262.895 666.617 320 666.617H413.333C470.44 666.617 509.257 666.613 539.263 664.163C568.493 661.777 583.44 657.447 593.867 652.133C618.953 639.35 639.35 618.953 652.133 593.867C657.447 583.44 661.777 568.493 664.163 539.263C666.613 509.257 666.667 470.44 666.667 413.333V320C666.667 262.895 666.613 224.075 664.163 194.069C661.777 164.841 657.447 149.895 652.133 139.468C639.35 114.38 618.953 93.9823 593.867 81.199C583.44 75.8863 568.493 71.558 539.263 69.17C509.257 66.7187 470.44 66.6667 413.333 66.6667Z" fill="currentColor" />
  </svg>
));
InstagramIcon.displayName = "InstagramIcon";

const AboutContent = memo(() => {
  const email = "aansaridan@gmail.com";

  return (
    <div className="w-full mb-2">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="flex">
            <motion.svg
              width="95"
              height="45"
              viewBox="0 0 111 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible -mx-[5px]"
              style={{ transformOrigin: "center" }}
            >
              <motion.path
                d="M23.6658 19.5568C24.184 18.3907 23.7076 16.8809 23.6658 18.6784C23.6143 20.8899 23.9127 23.2085 23.6383 25.4035C23.4632 26.8046 21.1091 20.9763 20.8934 20.545C19.4973 17.7527 11.743 11.8525 15.7604 9.07119C23.2034 3.91831 35.9047 3.41693 44.3624 5.5577C47.3218 6.30674 51.4936 7.83684 53.0364 10.773C55.0268 14.5612 50.8297 18.4111 48.0955 20.243C36.8401 27.7842 22.558 31.2353 10.0784 36.1635C7.07567 37.3493 4.1614 38.5262 1.02019 39.2653C0.82501 39.3112 2.1014 39.3202 2.4201 39.3202"
                stroke="currentColor"
                className="text-black dark:text-white"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M64.4263 16.6339C63.5779 13.1557 60.7209 13.3335 58.7303 16.281C56.2311 19.9818 60.731 23.8048 63.4433 20.4144C64.3358 19.2988 64.2834 14.046 64.4515 16.7347C64.6565 20.0151 67.8321 24.0413 70.6767 20.1623C71.5016 19.0374 71.7571 14.7004 71.332 16.029C71.1337 16.6487 71.8339 20.2254 71.9369 20.1371C73.0086 19.2185 74.565 13.0333 77.0783 14.29C78.3705 14.936 79.0368 19.2757 79.3971 20.7168"
                stroke="currentColor"
                className="text-black dark:text-white"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
              />
              <motion.path
                d="M82.5726 14.8192C82.5726 13.3223 82.7558 15.8654 82.8247 16.1801C83.1276 17.5649 83.4193 18.9774 83.9336 20.2631"
                stroke="currentColor"
                className="text-black dark:text-white"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.2 }}
              />
              <motion.path
                d="M84.3873 7.56058C83.5393 6.71263 83.0281 6.05144 83.9336 7.56058"
                stroke="currentColor"
                className="text-black dark:text-white"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.4 }}
              />
              <motion.path
                d="M91.9923 13.1211C91.9923 11.922 91.0266 11.6815 90.0769 12.4154C87.059 14.7474 88.1454 16.693 91.2614 18.061C93.68 19.1228 94.9167 19.8991 91.7655 21.2618C88.1505 22.825 87.0855 22.3312 88.8001 20.6166"
                stroke="currentColor"
                className="text-black dark:text-white"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 1.8 }}
              />
              <motion.path
                d="M98.1349 1C97.0711 4.44473 96.6171 9.76923 97.38 13.2566C97.5036 13.8217 98.3063 21.7286 99.6349 21C100.481 20.5359 106.046 10.6826 106.68 14.0631C107.137 16.5018 106.893 20.357 109.427 21.6241"
                stroke="currentColor"
                className="text-black dark:text-white"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 2.2 }}
              />
            </motion.svg>
          </span>
          <div className="flex flex-row gap-4 items-center text-foreground">
            <a href="https://github.com/dan10ish" target="_blank" rel="noopener noreferrer" className="hover:text-[#3B82F6] hover:scale-110" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href="https://x.com/dan10ish" target="_blank" rel="noopener noreferrer" className="hover:text-[#3B82F6] hover:scale-110" aria-label="X">
              <XIcon size={20} />
            </a>
            <a href="https://instagram.com/dan10ish" target="_blank" rel="noopener noreferrer" className="hover:text-[#3B82F6] hover:scale-110" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href="https://threads.net/@dan10ish" target="_blank" rel="noopener noreferrer" className="hover:text-[#3B82F6] hover:scale-110" aria-label="Threads">
              <ThreadsIcon size={20} />
            </a>
            <a href="https://snapchat.com/add/dan10ish" target="_blank" rel="noopener noreferrer" className="hover:text-[#3B82F6] hover:scale-110" aria-label="Snapchat">
              <SnapchatIcon size={20} />
            </a>
            <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#3B82F6] hover:scale-110" aria-label="Email">
              <LucideIcon icon={Mail} size={20} />
            </a>
          </div>
        </div>
        <div className="leading-relaxed text-foreground/70 text-left font-medium" style={{ fontSize: 'var(--font-size-base)' }}>
          Mechatronics engineer and generalist bridging code and hardware.
        </div>
      </div>
    </div>
  );
});
AboutContent.displayName = "AboutContent";

const SortIcon = memo(({ columnKey, sortConfig }) => (
  <span className="flex flex-col ml-1 align-middle leading-[0]">
    <LucideIcon
      icon={ChevronUp}
      size={12}
      className={`${sortConfig.key === columnKey && sortConfig.direction === "asc" ? "text-foreground stroke-[3]" : "text-[#9CA3AF] dark:text-[#52525B]"}`}
    />
    <LucideIcon
      icon={ChevronDown}
      size={12}
      className={`-mt-[4px] ${sortConfig.key === columnKey && sortConfig.direction === "desc" ? "text-foreground stroke-[3]" : "text-[#D1D5DB] dark:text-[#4B5563]"}`}
    />
  </span>
));
SortIcon.displayName = "SortIcon";



const BlogList = memo(({ blogs, handleSort, sortConfig, selectedRowIndex }) => {
  return (
    <div className="mt-4">
      <div className="sticky top-0 bg-background z-20 grid grid-cols-[1fr_80px] sm:grid-cols-[1fr_90px] gap-2 md:gap-4 px-2 py-3 text-foreground text-[0.85rem] sm:text-[0.9rem] font-bold uppercase tracking-wider border-b border-foreground/5 items-center font-mono">
        <span onClick={() => handleSort("title")} className="cursor-pointer flex items-center gap-1 hover:text-[#3B82F6]">title <SortIcon columnKey="title" sortConfig={sortConfig} /></span>
        <span onClick={() => handleSort("date")} className="cursor-pointer flex items-center justify-center gap-1 hover:text-[#3B82F6]">date <SortIcon columnKey="date" sortConfig={sortConfig} /></span>
      </div>
      <div>
        {blogs.map((blog, index) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className={`grid grid-cols-[1fr_80px] sm:grid-cols-[1fr_90px] gap-2 md:gap-4 px-2 py-2.5 border-b border-foreground/[0.05] items-center text-[0.95rem] last:border-0 hover:hover:bg-foreground/[0.02] ${index === selectedRowIndex ? "bg-foreground/[0.02] ring-1 ring-inset ring-foreground/5" : ""}`}
            prefetch={true}
          >
            <span className="font-semibold text-foreground/90">{blog.title}</span>
            <span className="text-[0.82rem] text-[#6B7280] dark:text-[#71717A] text-center font-mono tracking-tighter">
              {blog.date ? new Date(blog.date + "T00:00:00").toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).replace(' ', ', ') : ""}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
});
BlogList.displayName = "BlogList";

const ProjectList = memo(({ projects, selectedRowIndex }) => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`flex flex-col p-3 rounded-xl border border-foreground/[0.05] bg-foreground/[0.01] hover:hover:bg-foreground/[0.03] transition-colors group ${index === selectedRowIndex ? "bg-foreground/[0.03] ring-1 ring-inset ring-foreground/10" : ""}`}
          >
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-foreground/90 text-[0.95rem] truncate leading-tight">{project.title}</span>
              {project.highlight && <Star size={12} className="text-yellow-500 fill-current shrink-0" />}
            </span>
            <div className="flex items-center gap-1">
              {project.sourceLink ? (
                <a href={project.sourceLink} target="_blank" className="p-1.5 rounded-md hover:bg-foreground/[0.05] text-[#6B7280] dark:text-[#71717A] hover:text-[#3B82F6] hover:scale-110" onClick={e => e.stopPropagation()}><GithubIcon size={16} /></a>
              ) : (
                <span className="p-1.5 text-[#6B7280] dark:text-[#333333] cursor-not-allowed"><GithubIcon size={16} /></span>
              )}
              {project.projectLink ? (
                <a href={project.projectLink} target="_blank" className="p-1.5 rounded-md hover:bg-foreground/[0.05] text-[#6B7280] dark:text-[#71717A] hover:text-[#3B82F6] hover:scale-110" onClick={e => e.stopPropagation()}><Globe size={16} /></a>
              ) : (
                <span className="p-1.5 text-[#9CA3AF] dark:text-[#333333] cursor-not-allowed"><Globe size={16} /></span>
              )}
            </div>
          </div>
            <p className="text-[0.85rem] text-foreground/50 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});
ProjectList.displayName = "ProjectList";

const Content = memo(({ projects, blogs }) => {
  const [activeTab, setActiveTab] = useState("microblogs");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleTabChange = useCallback(t => {
    setActiveTab(t);
    setSortConfig({ key: null, direction: null });
    window.history.replaceState(null, "", `#${t}`);
  }, []);

  const handleSort = useCallback(k => {
    setSortConfig(c => ({
      key: c.key === k && c.direction === "desc" ? null : k,
      direction: c.key === k ? (c.direction === "asc" ? "desc" : null) : "asc"
    }));
  }, []);



  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (["projects", "microblogs"].includes(hash)) setActiveTab(hash);
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (["projects", "microblogs"].includes(h)) setActiveTab(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const sortedData = useMemo(() => {
    const raw = activeTab === "microblogs" ? blogs : projects;
    if (!sortConfig.key) return raw;
    return [...raw].sort((a, b) => {
      let valA = a[sortConfig.key], valB = b[sortConfig.key];
      if (Array.isArray(valA)) { valA = valA.join(","); valB = valB.join(","); }
      return sortConfig.direction === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
  }, [activeTab, blogs, projects, sortConfig]);

  useEffect(() => {
    const handleKeys = e => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedRowIndex(p => p === null ? 0 : Math.min(p + 1, sortedData.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelectedRowIndex(p => p === null ? sortedData.length - 1 : Math.max(p - 1, 0)); }
      if (e.key === "Enter" && selectedRowIndex !== null) {
        if (activeTab === "microblogs") window.location.href = `/blog/${sortedData[selectedRowIndex].slug}`;
        else {
          const project = sortedData[selectedRowIndex];
          if (project.projectLink) window.open(project.projectLink, "_blank");
          else if (project.sourceLink) window.open(project.sourceLink, "_blank");
        }
      }
      if (e.key === "Escape") setSelectedRowIndex(null);
    };
    window.addEventListener("keydown", handleKeys);
    const onMove = () => { if (selectedRowIndex !== null) setSelectedRowIndex(null); };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("keydown", handleKeys); window.removeEventListener("mousemove", onMove); };
  }, [sortedData, selectedRowIndex, activeTab]);

  return (
    <div className="flex flex-col">
      <AboutContent />
      <div className="flex gap-2 mt-6 px-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => handleTabChange(t.id)}
            className={`px-4 py-1.5 text-sm font-bold uppercase tracking-widest relative z-10 ${activeTab === t.id ? "text-foreground" : "text-foreground/30 hover:hover:text-foreground/60"}`}
          >
            {activeTab === t.id && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-foreground/[0.05] rounded-lg -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {t.label}
          </button>
        ))}
      </div>
      {activeTab === "microblogs" ? (
        <BlogList blogs={sortedData} handleSort={handleSort} sortConfig={sortConfig} selectedRowIndex={selectedRowIndex} />
      ) : (
        <ProjectList projects={sortedData} selectedRowIndex={selectedRowIndex} />
      )}
    </div>
  );
});
Content.displayName = "Content";

const TABS = [{ id: "microblogs", label: "Microblogs" }, { id: "projects", label: "Projects" }];

export default function ContentWrapper({ projects, blogs }) {
  return <Suspense fallback={null}><Content projects={projects} blogs={blogs} /></Suspense>;
}
