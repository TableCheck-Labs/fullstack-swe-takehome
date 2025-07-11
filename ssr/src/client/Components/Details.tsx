import { User } from "~/services/useAuth";

interface Props {
  reservation: Reservation;
  user: User;
}

interface Reservation {
  id: string;
  shopId: string;
  date: string;
  time: string;
  status: string;
  guests: number;
  specialRequests: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  cancellationPolicy: string;
  paymentStatus: string;
  totalCost: number;
  discounts: string[];
}

export function Details({ reservation, user }: Props) {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Reservation Info */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Reservation Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-500">Shop ID:</span>
            <div className="font-medium">{reservation.shopId}</div>
          </div>
          <div>
            <span className="text-gray-500">Date & Time:</span>
            <div className="font-medium">
              {reservation.date} at {reservation.time}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Guests:</span>
            <div className="font-medium">{reservation.guests}</div>
          </div>
          <div>
            <span className="text-gray-500">Booking Email:</span>
            <div className="text-gray-800">{user.email}</div>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>
            <div className="font-medium">{reservation.status}</div>
          </div>
          <div>
            <span className="text-gray-500">Special Requests:</span>
            <div className="font-medium">{reservation.specialRequests || "None"}</div>
          </div>
        </div>
      </div>

      {/* Billing Info */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Billing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-500">Total Cost:</span>
            <div className="font-medium">${reservation.totalCost.toFixed(2)}</div>
          </div>
          <div>
            <span className="text-gray-500">Payment Status:</span>
            <div className="font-medium">{reservation.paymentStatus}</div>
          </div>
          {reservation.discounts.length > 0 && (
            <div className="md:col-span-2">
              <span className="text-gray-500">Discounts:</span>
              <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
                {reservation.discounts.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
