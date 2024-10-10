import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';
import { Chart, ChartData, ChartOptions, registerables, TooltipItem } from 'chart.js';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  private chart: Chart<'bar'> | undefined;

  constructor(private statsService: StatisticsService) {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.statsService.getCounts().subscribe(counts => {
      this.createChart(counts);
    });
  }

  private createChart(counts: { managers: number, coaches: number, adherents: number, gyms: number }): void {
    const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Managers', 'Coaches', 'Adherents', 'Gyms'],
        datasets: [{
          label: 'Number of Entities',
          data: [counts.managers, counts.coaches, counts.adherents, counts.gyms],
          backgroundColor: [
            '#FF6384',  // Color for Managers
            '#36A2EB',  // Color for Coaches
            '#f0c040',  // Color for Adherents
            '#99cdff'   // Color for Gyms
          ],
          borderColor: [
            '#FF6384',  // Border color for Managers
            '#36A2EB',  // Border color for Coaches
            '#FFCE56',  // Border color for Adherents
            '#4BC0C0'   // Border color for Gyms
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        tooltips: {
          callbacks: {
            label: (context: TooltipItem<'bar'>) => {
              const label = context.label || '';
              const value = context.raw || 0;
              return `${label}: ${value}`;
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      } as ChartOptions<'bar'> // Add this cast
    });
  }
  
}
