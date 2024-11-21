import React, { useEffect, useRef } from "react";

const NewPostInput = ({ value, onChange, onSend, rows }) => {
  const input = useRef();

  const onInputKeyDown = (ev) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      onSend();
    }
  };

  const onChangeEvent = (ev) => {
    setTimeout(() => {
      adjustHeight();
    }, 10);
    onChange(ev);
  };

  const adjustHeight = () => {
    setTimeout(() => {
      input.current.style.height = "auto";
      input.current.style.height = input.current.scrollHeight + 1 + "px";
    }, 100);
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);
  return (
    <textarea
      ref={input}
      value={value}
      rows={rows}
      placeholder="What's new?"
      onKeyDown={onInputKeyDown}
      onChange={(ev) => onChange(ev)}
      className="w-full resize-none hover:overflow-y-auto overflow-hidden   bg-transparent border-none outline-none   focus:outline-none focus:border focus:ring-0 focus-visible:outline-none focus-visible:ring-0 sm:text-lg text-[15px] rounded-lg h-full mx-1 sm:mx-0"
    ></textarea>
  );
};
export default NewPostInput;
