import { OrderService } from "../services/order.service.ts";
export class OrderServiceFactory{
    public static create():OrderService{
        return new OrderService;
    }
}