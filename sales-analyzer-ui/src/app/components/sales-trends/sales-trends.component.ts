import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MonthlySales } from 'src/app/schemas/monthlysales';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales-trends',
  templateUrl: './sales-trends.component.html',
  styleUrls: ['./sales-trends.component.css']
})
export class SalesTrendsComponent implements OnInit {

  salesTrendsChart: any;
  salesTrends: MonthlySales[] = []
  saleDates: string[] = []
  salesAmount: number[] = []

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.salesService.getMonthlyMetrics().subscribe(res => {
      this.salesTrends = res;
      this.createChart();
    });
  }

  createChart() {

    this.setLocalState();

    //create chart configuration object
    const chartConfiguration: any = {
      type: 'line',
      data: this.getData(),
      options: { aspectRatio: 5 }
    }

    //pass chart configuration object as parameter to Chart constructor
    this.salesTrendsChart = new Chart("sales-trend-chart", chartConfiguration)
  }



  // --------------- Helper methods -------------------

  getData() {
    return {
      labels: this.saleDates,
      datasets: this.getDataSets()
    }
  }

  getDataSets() {
    return [
      {
        label: "Sales trends",
        data: this.salesAmount,
        backgroundColor: '#3F51B5'
      }
    ]
  }

  setLocalState(){
    this.salesTrends.forEach(item => {
      this.saleDates.push(item.saleDate);
      this.salesAmount.push(item.salesAmount)
    })
  }

}
