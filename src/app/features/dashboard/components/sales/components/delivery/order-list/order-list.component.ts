import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  status: boolean = true;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.loadOrders();
    this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
    });
  }
}
