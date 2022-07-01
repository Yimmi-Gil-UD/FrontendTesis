import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';
import { PacienteService } from 'src/app/services/paciente.service';


@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.page.html',
  styleUrls: ['./reportes-admin.page.scss'],
})
export class ReportesAdminPage implements OnInit {

  categoriaDiscapacidades: [] = []
  dataResult: any;
  labels = new Array;
  labelsGeneros = new Array;
 
  constructor(
    private pacienteService:PacienteService
  ) { 
    
  }

  ngOnInit() {
    this.getTipoDiscapacidades();
    
  }

  ionViewWillEnter()
  {
    this.getTipoDiscapacidades();
  }

  ionViewDidEnter() {
    this.barChartPopulation();
  }


  getTipoDiscapacidades()
  {
    this.pacienteService.lista().subscribe((data: any)=>{
      this.categoriaDiscapacidades = data;
      this.setTipoDiscapacidades();
      this.setGeneros();
      console.log(this.categoriaDiscapacidades);
    })
  }

 
  setTipoDiscapacidades()
  {
    this.labels = new Array
    this.categoriaDiscapacidades.forEach((el:any)=>{
      let index = this.labels.findIndex(ele => ele.name == el.nombreCategoria )
      
      if(index>=0){
        console.log(index);
        this.labels[index].y++
        
      }else{
        
        this.labels.push({name:el.nombreCategoria, y:1})
      }
      console.log("dentro del for: ",this.labels)
    })
    
    this.discapacidades();

  }

  setGeneros()
  {
    this.labelsGeneros = new Array
    this.categoriaDiscapacidades.forEach((el:any)=>{
      let index = this.labelsGeneros.findIndex(ele => ele.name == el.nombreGenero )
      
      if(index>=0){
        this.labelsGeneros[index].y++
      }else{
        this.labelsGeneros.push({name:el.nombreGenero, y:1})
      }
      console.log("dentro del for generos: ",this.labelsGeneros)
    })
    
    this.discapacidades();
    this.generos();
  }


  discapacidades() {
    HighCharts.chart('discapacidadChart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Discapacidades registradas'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'porcentaje',
        colorByPoint: true,
        type: undefined,
        data: this.labels
      }]
    });
    
  }

  generos() {
    HighCharts.chart('generosChart', {
      chart: {
        type: 'column'
    },
      title: {
        text: 'Generos',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage}</b>'
      },
      plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}'
                
            }
        }
    },
      series: [{
        name: '',
        colorByPoint: true,
        type: undefined,
        data: this.labelsGeneros
        
        
      }]
    });
    
  }
  

    


  barChartPopulation() {
    HighCharts.chart('barChart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Historic World Population by Region'
      },
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: undefined,
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
      }, {
        type: undefined,
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
      }, {
        type: undefined,
        name: 'Year 2000',
        data: [814, 841, 3714, 727, 31]
      }, {
        type: undefined,
        name: 'Year 2016',
        data: [1216, 1001, 4436, 738, 40]
      }]
    });
  }


}
