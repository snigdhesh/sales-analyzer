import { Component } from '@angular/core';
import { Quantity } from 'src/app/schemas/quantity';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  totalSales: number = 0;
  productsByQuantity: Quantity[] = [];
  topProduct: string = "";

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.salesService.getTotalSales().subscribe((res: any) => this.totalSales = res.totalSales);
    this.salesService.getProductsByQuantity().subscribe(res => {
      this.productsByQuantity = res;
      this.topProduct = this.productsByQuantity[0].itemDescription;
    });
  }
}
