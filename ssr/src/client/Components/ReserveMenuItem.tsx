import { useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  minQty: number;
  maxQty: number;
  image?: string;
};

type ReserveMenuItemProps = {
  isLoading: boolean;
  menuItem: MenuItem;
  onClose: () => void;
  onSubmit?: (quantity: number) => void;
};

export function ReserveMenuItem({ isLoading, menuItem, onClose, onSubmit }: ReserveMenuItemProps) {
  const [qty, setQty] = useState(menuItem.minQty || 1);

  const handleQtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(parseInt(e.target.value, 10));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(qty);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        {menuItem.image && <img src={menuItem.image} alt={menuItem.name} className="w-full h-56 object-cover" />}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{menuItem.name}</h2>
          <p className="text-gray-700 mb-4">{menuItem.description}</p>
          <p className="mb-2 text-lg font-semibold">
            {menuItem.currency} {menuItem.price}
          </p>

          <label htmlFor="quantity" className="block text-sm font-medium mb-1">
            Quantity
          </label>
          <select id="quantity" value={qty} onChange={handleQtyChange} className="border rounded px-3 py-2 w-full mb-4">
            {Array.from({ length: menuItem.maxQty - menuItem.minQty + 1 }, (_, i) => menuItem.minQty + i).map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <div className="flex justify-between">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
