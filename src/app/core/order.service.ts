import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor() { }

  loadOrders() {
    const orders = [
    {
      name: 'teste',
      pedido: 'pizza'
    }, {
      name: 'teste2',
      pedido: 'hamburguer'
    },
    {
      name: 'teste3',
      pedido: 'hamburguer'
    },
    {
      name: 'teste4',
      pedido: 'hamburguer'
    }
  ];
    this.ordersSubject.next(orders);
  }
}
