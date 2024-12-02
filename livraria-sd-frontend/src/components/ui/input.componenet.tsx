"use client";

import { InputHTMLAttributes, useRef } from "react";

export default function Input(data: AppInputProps) {
  const inputReference = useRef<HTMLInputElement>(null);

  return (
    <div className="px-2 py-5">
      {data.label && <p className="text-sm mb-1">{data.label}</p>}
      <div
        onClick={() => inputReference.current?.focus()}
        className={`flex items-center gap-2 border-b p-2 border-darkColor ${data.wrapperclassnames}`}
      >
        {data.icon}
        <input
          className={`focus:outline-none bg-transparent w-full ${data.classnames}`}
          ref={inputReference}
          {...data}
        />
      </div>
    </div>
  );
}

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  classnames?: string;
  wrapperclassnames?: string;
  icon?: React.ReactNode;
  label?: string;
}
