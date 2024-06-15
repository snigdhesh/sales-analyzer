import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Product } from 'src/app/schemas/product';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales-distribution',
  templateUrl: './sales-distribution.component.html',
  styleUrls: ['./sales-distribution.component.css']
})
export class SalesDistributionComponent {
  
  salesDistributionChart:any;
  salesDistribution: Product[] = [];

  products: string[] = [];
  maxPrice: number[] = [];
  minPrice: number[] = [];

  displayLimit: number = 15;

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.salesService.getSalesDistribution().subscribe(res => {
      this.salesDistribution = res.splice(0,this.displayLimit);
      this.createChart();
    });
  }

  createChart() {

    this.setLocalState();

    //create chart configuration object
    const chartConfiguration: any = {
      type: 'bar',
      data: this.getData(),
      options: { aspectRatio: 5 }
    }

    //pass chart configuration object as parameter to Chart constructor
    this.salesDistributionChart = new Chart("sales-distribution-chart", chartConfiguration)
  }

    // --------------- Helper methods -------------------

    getData() {
      return {
        labels: this.products,
        datasets: this.getDataSets()
      }
    }
  
    getDataSets() {
      return [
        {
          label: "Max Price",
          data: this.maxPrice,
          backgroundColor: '#90E0EF'
        },
        {
          label: "Min Price",
          data: this.minPrice,
          backgroundColor: '#FEB1B7'
        }
      ]
    }
  
    setLocalState(){
      this.salesDistribution.forEach(item => {
        this.products.push(item.productName);
        this.maxPrice.push(Math.max(...item.saleAmount))
        this.minPrice.push(Math.min(...item.saleAmount))
      })
    }


}
