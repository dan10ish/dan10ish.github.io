import { memo } from "react";

const SocialIcons = memo(() => (
  <div className="socials">
    Elsewhere :
    <a
      href="https://x.com/dan10ish"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
    >
      <svg
        width="22"
        height="25"
        viewBox="0 0 22 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="0.2"
      >
        <path d="M11.3848 10.7287L11.4667 10.6714L11.3848 10.7287L12.275 12.0021L18.6059 21.0577C19.023 21.6542 18.5962 22.4733 17.8683 22.4733H17.259C16.9651 22.4733 16.6898 22.3299 16.5214 22.089L10.7564 13.8426L10.6744 13.8999L10.7564 13.8426L9.86614 12.5693L3.8825 4.0103C3.46544 3.41375 3.89224 2.59462 4.62011 2.59462H5.22938C5.52325 2.59462 5.79862 2.7381 5.967 2.97896L11.3848 10.7287ZM13.9718 10.2204L20.7782 2.30852C21.2537 1.75581 20.861 0.9 20.1319 0.9C19.8836 0.9 19.6476 1.00828 19.4856 1.19654L13.2829 8.40655C12.8978 8.85418 12.1933 8.81595 11.8589 8.32928L7.08193 1.37706C6.87674 1.07843 6.53765 0.9 6.17532 0.9H1.90043C1.01487 0.9 0.492315 1.89307 0.993826 2.62295L8.26781 13.2092C8.49916 13.5458 8.47472 13.9961 8.20829 14.3058L0.993884 22.6914C0.518369 23.2441 0.911055 24.1 1.64017 24.1C1.88851 24.1 2.12451 23.9917 2.28647 23.8035L8.89674 16.1196C9.28183 15.672 9.98637 15.7102 10.3208 16.1969L15.4235 23.623C15.6287 23.9216 15.9678 24.1 16.3301 24.1H20.605C21.4906 24.1 22.0132 23.1069 21.5117 22.3771L13.9123 11.317C13.681 10.9803 13.7054 10.53 13.9718 10.2204Z" />
      </svg>
    </a>
    <a
      href="https://github.com/dan10ish"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <svg
        width="27"
        height="25"
        viewBox="0 0 27 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.3219 0C6.24441 0 0.505371 5.73804 0.505371 12.8165C0.505371 18.4791 4.17767 23.2834 9.27008 24.978C9.9106 25.0967 10.1458 24.7 10.1458 24.3615C10.1458 24.0559 10.1338 23.0463 10.1284 21.9754C6.56282 22.7506 5.81045 20.4632 5.81045 20.4632C5.22741 18.9818 4.38734 18.5878 4.38734 18.5878C3.22455 17.7924 4.47505 17.8088 4.47505 17.8088C5.76199 17.8991 6.43966 19.1295 6.43966 19.1295C7.58282 21.0888 9.43799 20.5223 10.1693 20.1948C10.2844 19.3666 10.6165 18.801 10.9831 18.481C8.13633 18.157 5.1438 17.058 5.1438 12.1471C5.1438 10.7478 5.64444 9.60448 6.46429 8.70693C6.33122 8.38412 5.89256 7.08065 6.58845 5.3152C6.58845 5.3152 7.66473 4.97076 10.114 6.62898C11.1363 6.34501 12.2327 6.20263 13.3219 6.19773C14.4111 6.20263 15.5084 6.34491 16.5326 6.62898C18.9788 4.97086 20.0536 5.3153 20.0536 5.3153C20.7512 7.08055 20.3123 8.38422 20.1792 8.70693C21.001 9.60448 21.4982 10.7478 21.4982 12.1471C21.4982 17.0697 18.5 18.1536 15.646 18.4709C16.1057 18.8686 16.5153 19.6486 16.5153 20.8444C16.5153 22.5591 16.5005 23.9393 16.5005 24.3615C16.5005 24.7026 16.7312 25.1022 17.3808 24.9762C22.4705 23.2798 26.1381 18.4773 26.1381 12.8166C26.1381 5.73804 20.3999 0 13.3219 0Z" />
      </svg>
    </a>
    {/* <a
      href="https://instagram.com/dan10ish"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <svg
        width="26"
        height="25"
        viewBox="0 0 26 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.6382 0C9.24235 0 8.81839 0.015625 7.48506 0.075C6.15381 0.1375 5.24756 0.346875 4.45068 0.65625C3.62881 0.975 2.93089 1.40312 2.2361 2.09792C1.54131 2.79271 1.11214 3.48958 0.794434 4.3125C0.485059 5.10937 0.274642 6.01562 0.213184 7.34687C0.150684 8.68021 0.138184 9.10417 0.138184 12.5C0.138184 15.8958 0.153809 16.3198 0.213184 17.6531C0.275684 18.9833 0.485059 19.8906 0.794434 20.6875C1.11318 21.5083 1.54131 22.2073 2.2361 22.9021C2.93089 23.5958 3.62777 24.026 4.45068 24.3438C5.2486 24.6521 6.15485 24.8635 7.48506 24.925C8.81839 24.9875 9.24235 25 12.6382 25C16.034 25 16.458 24.9844 17.7913 24.925C19.1215 24.8625 20.0288 24.6521 20.8257 24.3438C21.6465 24.025 22.3455 23.5958 23.0403 22.9021C23.734 22.2073 24.1642 21.5115 24.4819 20.6875C24.7903 19.8906 25.0017 18.9833 25.0632 17.6531C25.1257 16.3198 25.1382 15.8958 25.1382 12.5C25.1382 9.10417 25.1226 8.68021 25.0632 7.34687C25.0007 6.01667 24.7903 5.10833 24.4819 4.3125C24.1632 3.49062 23.734 2.79271 23.0403 2.09792C22.3455 1.40312 21.6496 0.973958 20.8257 0.65625C20.0288 0.346875 19.1215 0.136458 17.7913 0.075C16.458 0.0125 16.034 0 12.6382 0ZM12.6382 2.25C15.9746 2.25 16.3726 2.26667 17.6903 2.32396C18.909 2.38125 19.5705 2.58333 20.0101 2.75625C20.5955 2.98229 21.0101 3.25312 21.4496 3.68958C21.8861 4.12708 22.1569 4.54271 22.383 5.12812C22.5538 5.56771 22.758 6.22917 22.8132 7.44792C22.8726 8.76667 22.8861 9.1625 22.8861 12.5C22.8861 15.8375 22.8705 16.2344 22.809 17.5521C22.7455 18.7708 22.5424 19.4323 22.3705 19.8719C22.1371 20.4573 21.8715 20.8719 21.434 21.3115C20.9976 21.7479 20.5757 22.0187 19.9965 22.2448C19.559 22.4156 18.8871 22.6198 17.6684 22.675C16.3413 22.7344 15.9507 22.7479 12.6069 22.7479C9.26214 22.7479 8.87152 22.7323 7.54548 22.6708C6.32568 22.6073 5.65381 22.4042 5.21631 22.2323C4.6236 21.999 4.21631 21.7333 3.77985 21.2958C3.34131 20.8594 3.0611 20.4375 2.84235 19.8583C2.67048 19.4208 2.46839 18.749 2.40485 17.5302C2.35798 16.2177 2.34131 15.8125 2.34131 12.4844C2.34131 9.15521 2.35798 8.74896 2.40485 7.42083C2.46839 6.20208 2.67048 5.53125 2.84235 5.09375C3.0611 4.5 3.34131 4.09375 3.77985 3.65521C4.21631 3.21875 4.6236 2.9375 5.21631 2.71979C5.65381 2.54688 6.3111 2.34375 7.52985 2.28125C8.85798 2.23438 9.2486 2.21875 12.5913 2.21875L12.6382 2.25Z" />
        <path d="M12.6382 16.6667C10.3361 16.6667 8.47152 14.8021 8.47152 12.5C8.47152 10.1979 10.3361 8.33333 12.6382 8.33333C14.9403 8.33333 16.8048 10.1979 16.8048 12.5C16.8048 14.8021 14.9403 16.6667 12.6382 16.6667ZM12.6382 6.08125C9.09131 6.08125 6.21943 8.95625 6.21943 12.5C6.21943 16.0469 9.09443 18.9188 12.6382 18.9188C16.1851 18.9188 19.0569 16.0437 19.0569 12.5C19.0569 8.95312 16.1819 6.08125 12.6382 6.08125Z" />
        <path d="M20.8111 5.82812C20.8111 6.65625 20.1382 7.32812 19.3111 7.32812C18.483 7.32812 17.8111 6.65521 17.8111 5.82812C17.8111 5.00104 18.484 4.32917 19.3111 4.32917C20.1371 4.32812 20.8111 5.00104 20.8111 5.82812Z" />
      </svg>
    </a> */}
    <a
      href="https://dan10ish.read.cv"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ReadCV"
    >
      <svg
        width="21"
        height="23"
        viewBox="0 0 21 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="19"
          height="21"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M5 6H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 10H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 14H12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </a>
  </div>
));

SocialIcons.displayName = "SocialIcons";

export default SocialIcons;