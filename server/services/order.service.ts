import { validateQuery } from "../mock/validateQuery.ts";
import { Order } from "../models/order.model.ts";
import { Product } from "../models/product.model.ts"
import { Shipping } from "../models/shipping.model.ts";
import { User } from "../models/user.model.ts";
import type { OrderTypes, ADD_ORDER, queryTypes, ORDER_RESPONSE } from "../types/types.ts";
import { appError } from "../utils/appError.ts"
import { ERROR, FAIL } from "../utils/httpStatus.ts"
import Stripe from 'stripe';
import { LIMIT, PAGE } from "../utils/pagination.ts";
import { UserServiceFactory } from "../factories/UserService.factory.ts";
import { ProductServiceFactory } from "../factories/ProductService.factory.ts";
export abstract class BaseOrderService<T> {
    abstract addOrder({ idProduct, idUser, idShipping, coupon, session_id }: ADD_ORDER): Promise<OrderTypes>
    abstract creatSession({ idProduct, idUser, idShipping, coupon }: ADD_ORDER): Promise<{ paymentLink: string | null }>
    abstract calcTheTotalCost({ idProduct, idUser, idShipping, coupon }: ADD_ORDER): Promise<T>
    abstract getAllOrders(query: queryTypes): Promise<{ orders: ORDER_RESPONSE[], totalOrders: number, totalPage: number }>

}
export class OrderService extends BaseOrderService<OrderTypes> {
    async addOrder({ idProduct, idUser,  session_id }: ADD_ORDER): Promise<OrderTypes> {
        try {
            const stripe = new Stripe(process.env.SECERT_KEY_STRIPE!);
            if (!session_id) {
                throw appError(FAIL, "Please send the session number", 400);
            }
            const session = await stripe.checkout.sessions.retrieve(session_id, {
                expand:["line_items"]
            })
            if (session.payment_status !== "paid") {
                throw appError(FAIL, "Payment is not complete", 400);
            }
            const newOrder = await Order.create({
                sessionId: session.id,
                customerEmail: session.customer_email,
                totalAmount: ((session.amount_total || 0) / 100),
                paymentStatus: session.payment_status,
                subtotal: session.amount_subtotal,
                idBuyer: idUser,
                idProduct
            })
            const addIdProductpurchased = await UserServiceFactory.create().updateProductsPurchased(idProduct, idUser);
            const decreasingQuantity = await ProductServiceFactory.create().decreasingProductQuantity(idProduct);
            if (!newOrder) {
                throw appError(FAIL, null, 500, "Payment save is not complete");
            }
            return newOrder
        } catch (err: any) {
            throw appError(ERROR, null, 500, err.message);
        }
    }
    async creatSession({ idProduct, idUser, idShipping, coupon }: ADD_ORDER): Promise<{ paymentLink: string | null }> {
        try {
            const stripe = new Stripe(process.env.SECERT_KEY_STRIPE!);
            const { totalAmount, productName, quantity } = await this.calcTheTotalCost({ idProduct, idUser, idShipping, coupon } as ADD_ORDER);
            console.log(totalAmount)
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: 'payment',
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: productName
                            },
                            unit_amount: totalAmount,
                        },
                        quantity: quantity || 1
                    }
                ],
                success_url: `${process.env.url}:${process.env.PORT}/api/orders/success?session_id={CHECKOUT_SESSION_ID}&idUser=${idUser}&idProduct=${idProduct}`,
                cancel_url: `${process.env.url}:${process.env.PORT}/api/orders/cancel`
            })
            if (!session) {
                throw appError(ERROR, null, 500, "The Server Error Occurred during payment");
            }
            return { paymentLink: session.url || null }
        } catch (err: any) {
            throw appError(ERROR, null, 500, err.message)
        }
    }
    async calcTheTotalCost({ idProduct, idUser, idShipping, coupon }: ADD_ORDER): Promise<OrderTypes> {
        const getAll = await Promise.all([
            Product.findOne({ "_id": idProduct }).select("-__v").lean(),
            User.findOne({ "_id": idUser }).select("-__v -__password").lean(),
            Shipping.findOne({ "_id": idShipping }).select("-__v").lean()
        ]);
        if (!getAll[0]) {
            throw appError(FAIL, "This is Product Not Found", 404);
        }
        if (!getAll[1]) {
            throw appError(FAIL, "This is User Not Found", 404);
        }
        if (!getAll[2]) {
            throw appError(FAIL, "This is Shipping Not Found", 404);
        }
        const subtotal = Number(getAll[0].price);
        const discountPercent = Number(getAll[0].couponCode || 0);
        const discountAmount = (subtotal * discountPercent) / 100;
        const amountAfterDiscount = subtotal - discountAmount;
        const totalAmount = amountAfterDiscount + Number(getAll[2].shippingFee);
        const totalCost = {
            idBuyer: getAll[1].id,
            idProduct: getAll[0].id,
            subtotal,
            discountAmount,
            totalAmount,
            shippingFee: getAll[2].shippingFee,
            quantity:  1,
            productName: getAll[0].product_name
        } as OrderTypes;
        return totalCost;
    }
async getAllOrders(query: queryTypes): Promise<{ orders: ORDER_RESPONSE[]; totalOrders: number; totalPage: number; }> {
    const { limit, page } = validateQuery(query.limit || LIMIT.toString(), query.page || PAGE.toString());
    
    let q_Search: Record<string, any> = {};
    if (query.q) {
        q_Search = { $text: { $search: query.q } }; 
    }

    const [orders, totalOrders] = await Promise.all([
        Order.find(q_Search)
            .select("-__v -sessionId")
            .populate("idBuyer", "-__v -password") 
            .populate("idProduct", "-__v")        
            .limit(limit)
            .skip((page - 1) * limit)
            .lean(), 
        Order.countDocuments(q_Search) 
    ]);
    const totalPage = Math.ceil(totalOrders / limit);

    return {
        orders,
        totalOrders,
        totalPage
    };
}

}

