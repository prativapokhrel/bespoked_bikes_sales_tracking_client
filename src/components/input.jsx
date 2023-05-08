import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function Input({
  label,
  name,
  type = "text",
  className = "",
  error = "",
  ...rest
}) {
  return (
    <div className="col-span-6 my-2 sm:col-span-3">
      <div className="flex">
        <label
          htmlFor={name}
          className="flex-auto text-sm font-medium uppercase text-gray-400"
        >
          {label}
        </label>
      </div>
      <div className="relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          className={clsx(
            "mt-1 block w-full rounded-md placeholder-gray-500 placeholder-opacity-30 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm",
            className,
            error ? "border-red-500" : "border-gray-300"
          )}
          {...rest}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
}
