import { MenuItem, useReserveOrder } from "~/services/useReserveOrder";
import { ReserveMenuItem } from "./ReserveMenuItem";

interface Props {
  menu: MenuItem[];
}

export function Menu({ menu }: Props) {
  const [state, api] = useReserveOrder();

  return (
    <>
      {!state.error ? null : (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md z-50">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{state.error.message}</span>
        </div>
      )}
      {!state.selectedItem ? null : (
        <ReserveMenuItem
          isLoading={state.isLoading}
          onSubmit={api.handleSubmit}
          menuItem={state.selectedItem}
          onClose={() => api.setSelectedItem(null)}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
        {menu.map(item => (
          <div
            key={item.id}
            className="relative border rounded-xl shadow-sm p-6 bg-white hover:shadow-md transition-shadow"
            onClick={() => {
              api.setSelectedItem(item);
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="absolute top-4 right-4 w-16 h-16 object-cover rounded-md shadow"
            />
            <h2 className="max-w-[80%] text-xl font-semibold mb-1">{item.name}</h2>
            <p className="max-w-[80%] text-sm text-gray-600 mb-4">{item.description}</p>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Price:</strong> {item.price} {item.currency}
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Quantity:</strong> min {item.minQty} – max {item.maxQty}
            </div>
            <div className="text-xs text-gray-400 truncate">
              <strong>ID:</strong> {item.id}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
