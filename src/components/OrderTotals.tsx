import { useCallback } from "react" // useCallback funciona igual que usememo con la diferencia que este necesita agregar () a las funcionaes al llamarlos
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsPRops = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void

}
export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsPRops) {

    const subtotalAmount = useCallback(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
    // usememo se ejecutara cuando cambie tip o cando cambie order
    const tipAmount = useCallback(() => subtotalAmount() * tip, [tip, order])
    const totalAmount = useCallback(() => subtotalAmount() + tipAmount(), [tip, order])
    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black"> Totales y propina: </h2>
                <p>Subtotal a pagar: <span className="font-bold">{formatCurrency(subtotalAmount())}</span></p>
                <p>Propina: <span className="font-bold">{formatCurrency(tipAmount())}</span></p>
                <p>Total a pagar: <span className="font-bold">{formatCurrency(totalAmount())}</span></p>
            </div>
            <button className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
             disabled={totalAmount() === 0}
             onClick={placeOrder}>
                Guardar Orden
            </button>
        </>
    )
}
