export default function UserDetail({
    userId,
    payments,
}: {
    userId: string;
    payments: Record<string, number>; // Payments for each month
}) {
    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="px-6 py-4 text-gray-800">{userId}</td>
            {/* Render each payment under respective month */}
            {Object.keys(payments).map((month) => (
                <td key={month} className="px-6 py-4 text-gray-800">
                    Rs. {payments[month]}
                </td>
            ))}
        </tr>
    );
}
