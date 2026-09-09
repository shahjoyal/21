import * as XLSX from 'xlsx';
import { CustomerOrder } from '../types';

/**
 * Builds and downloads an .xlsx workbook containing full order details —
 * customer info, address, items, pricing, promo/discount, payment and
 * fulfillment status — for every order in `orders`.
 *
 * Requires the "xlsx" (SheetJS) package: `npm install xlsx`
 */
export function exportOrdersToExcel(orders: CustomerOrder[], fromDate?: string, toDate?: string) {
  const rows = orders.map((order) => {
    const itemsSummary = order.items
      .map((it) => `${it.name} (${it.tier.label}) x${it.quantity}`)
      .join('; ');

    return {
      'Order Number': order.orderNumber,
      'Order Date': new Date(order.createdAt).toLocaleString('en-IN'),
      'Customer Name': order.customerName,
      'Phone': order.phone,
      'Email': order.email || '',
      'Address': order.address,
      'City': order.city,
      'Pincode': order.pincode,
      'Occasion': order.occasion || '',
      'Delivery Date': order.deliveryDate,
      'Delivery Slot': order.deliverySlot,
      'Items': itemsSummary,
      'Item Count': order.items.reduce((acc, it) => acc + it.quantity, 0),
      'Subtotal (₹)': order.subtotal,
      'Delivery Fee (₹)': order.deliveryFee,
      'Promo Code': order.promoCode || '',
      'Discount %': order.discountPercent || 0,
      'Discount Amount (₹)': order.discountAmount || 0,
      'Grand Total (₹)': order.total,
      'Payment Method': order.paymentMethod.toUpperCase(),
      'Payment Status': order.paymentStatus,
      'Order Status': order.status,
      'Notes': order.notes || '',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Reasonable column widths so the sheet is readable on first open,
  // rather than every column being crushed to its header width.
  worksheet['!cols'] = [
    { wch: 14 }, { wch: 20 }, { wch: 20 }, { wch: 14 }, { wch: 24 },
    { wch: 28 }, { wch: 14 }, { wch: 10 }, { wch: 14 }, { wch: 14 },
    { wch: 22 }, { wch: 40 }, { wch: 10 }, { wch: 12 }, { wch: 14 },
    { wch: 12 }, { wch: 10 }, { wch: 16 }, { wch: 16 }, { wch: 14 },
    { wch: 14 }, { wch: 24 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

  const rangeLabel = fromDate && toDate ? `_${fromDate}_to_${toDate}` : '';
  const filename = `21kalya_orders${rangeLabel}_${Date.now()}.xlsx`;

  XLSX.writeFile(workbook, filename);
}
