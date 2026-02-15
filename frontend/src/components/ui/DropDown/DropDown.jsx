import { useState, useRef, useEffect } from "react";
import "./DropDown.css";

const Dropdown = ({ options, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Lowest");
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown-btn"
        onClick={() => setOpen(!open)}
      >
        Sort By {selected}
        <span className={`arrow ${open ? "rotate" : ""}`}>▼</span>
      </button>

      {open && (
        <ul className="dropdown-menu">
          {options.map(option => (
            <li
              key={option.id}
              className="dropdown-item"
              onClick={() => {
                setSelected(option.value);
                  setOpen(false);
                  onChange(option.value)
              }}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
