export default function Select({ name, label, items, ...rest }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...rest}
      >
        <option value={''} disabled>
          Select Item
        </option>
        {items && items.length
          ? items.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))
          : null}
      </select>
    </div>
  );
}
