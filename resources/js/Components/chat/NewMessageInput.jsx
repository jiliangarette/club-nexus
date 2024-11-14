import React, { useEffect, useRef } from "react";

const NewMessageInput = ({
  value,
  onChange,
  onSend,
  isFocus = false,
  onFocus,
  onBlur,
}) => {
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

  useEffect(() => {
    if (isFocus && input.current) {
      input.current.focus();
    }
  }, [isFocus]);

  return (
    <textarea
      ref={input}
      value={value}
      rows="1"
      placeholder="Aa"
      onKeyDown={onInputKeyDown}
      onChange={onChangeEvent}
      onFocus={onFocus}
      onBlur={onBlur}
      className="w-full resize-none overflow-y-auto max-h-40 bg-slate-200 sm:bg-transparent border-none outline-none focus:outline-none focus:border-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 sm:text-lg text-[15px] rounded-lg h-full mx-1 sm:mx-0"
    />
  );
};

export default NewMessageInput;
