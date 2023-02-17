import Link from "next/link";
import React from "react";

const Sidebar = ({ options, isOpen, setOpen }) => {
  const styles = {
    activeStyles:
      "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-5 w-full",
    inactiveStyles:
      "text-black bg-[#EAFDFC] focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  w-full",
  };

  const [selected, setSelected] = React.useState("Home");

  return (
    <div>
      {isOpen ? (
        <div className="mt-4 flex flex-col item-center px-2 w-full">
          {/* <button
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Cyan to Blue
        </button> */}
          {options &&
            options.map((option) => {
              return (
                <Link href={option.link}>
                  <button
                    type="button"
                    className={
                      selected === option.title
                        ? styles.activeStyles
                        : styles.inactiveStyles
                    }
                    onClick={() => setSelected(option.title)}
                  >
                    {option.title}
                  </button>
                </Link>
              );
            })}
        </div>
      ) : (
        <div className="mt-4 flex flex-col item-center w-full">
          {options &&
            options.map((option) => {
              return (
                <Link href={option.link}>
                  <button
                    type="button"
                    className={
                      selected === option.title
                        ? styles.activeStyles
                        : styles.inactiveStyles
                    }
                    onClick={() => setSelected(option.title)}
                  >
                    {option.icon}
                  </button>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
