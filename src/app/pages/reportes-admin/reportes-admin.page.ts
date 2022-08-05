import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as HighCharts from 'highcharts';
import { NotaService } from 'src/app/services/nota.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TerapiaService } from 'src/app/services/terapia.service';


@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.page.html',
  styleUrls: ['./reportes-admin.page.scss'],
})
export class ReportesAdminPage implements OnInit {

  categoriaDiscapacidades: [] = []
  terapiasfisicas: [] = []
  Xterapiasfisicas: [] = []
  XNotasEnfermerias: [] = []
  dataResult: any;
  labels = new Array;
  labelsGeneros = new Array;
  labelsFisica = new Array;
  labelsxTerapias = new Array;
  labelsxTNotasEnfermeria = new Array;
  
 
  constructor(
    private pacienteService:PacienteService,
    private terapiaService:TerapiaService,
    private notaService:NotaService,
    private navCtrl: NavController
  ) { 
    
  }

  ngOnInit() {
    this.getTipoDiscapacidades();
    this.getTipoTerapias();
    this.getXTerapiasEnfermeras();
    this.getXNotasEnfermeras();
    
  }

  ionViewWillEnter()
  {
    this.getTipoDiscapacidades();
    this.getTipoTerapias();
    this.getXTerapiasEnfermeras();
    this.getXNotasEnfermeras();
  }

  ionViewDidEnter() {
    
  }

 
  getTipoDiscapacidades()
  {
      this.pacienteService.lista().subscribe((data: any)=>{
      this.categoriaDiscapacidades = data;
      this.setTipoDiscapacidades();
      this.setGeneros();
      //console.log(this.categoriaDiscapacidades);
    })
  }

  setTipoDiscapacidades()
  {
    this.labels = new Array
    this.categoriaDiscapacidades.forEach((el:any)=>{
      let index = this.labels.findIndex(ele => ele.name == el.nombreCategoria )
      
      if(index>=0){
        //console.log(index);
        this.labels[index].y++
        
      }else{
        
        this.labels.push({name:el.nombreCategoria, y:1})
      }
      //console.log("dentro del for: ",this.labels)
    })
    
    this.discapacidades();

  }

  getXTerapiasEnfermeras()
  {
      this.terapiaService.lista().subscribe((data: any)=>{
      this.Xterapiasfisicas = data;
      this.setXTerapiasEnfermeras();
      //this.setGeneros();
      //console.log(this.categoriaDiscapacidades);
    })
  }

  setXTerapiasEnfermeras()
  {
    this.labelsxTerapias = new Array
    this.Xterapiasfisicas.forEach((el:any)=>{
      let index = this.labelsxTerapias.findIndex(ele => ele.name == el.nombreEnfermeraTerapia +' '+ el.apellidoEnfermeraTerapia)
      
      if(index>=0){
        //console.log(index);
        this.labelsxTerapias[index].y++
        
      }else{
        
        this.labelsxTerapias.push({name:el.nombreEnfermeraTerapia +' '+ el.apellidoEnfermeraTerapia, y:1, drilldown:el.nombreEnfermeraTerapia +' '+ el.apellidoEnfermeraTerapia})
      }
      //console.log("dentro del for: ",this.labels)
    })
    
    this.cantidadTerapiasEnfermera();

  }

  getXNotasEnfermeras()
  {
      this.notaService.lista().subscribe((data: any)=>{
      this.XNotasEnfermerias = data;
      this.setXTNotasEnfermeras();
      //this.setGeneros();
      //console.log(this.categoriaDiscapacidades);
    })
  }

  setXTNotasEnfermeras()
  {
    this.labelsxTNotasEnfermeria = new Array
    this.XNotasEnfermerias.forEach((el:any)=>{
      let index = this.labelsxTNotasEnfermeria.findIndex(ele => ele.name == el.nombreEnfermera +' '+ el.apellidoEnfermera)
      
      if(index>=0){
        //console.log(index);
        this.labelsxTNotasEnfermeria[index].y++
        
      }else{
        
        this.labelsxTNotasEnfermeria.push({name:el.nombreEnfermera +' '+ el.apellidoEnfermera, y:1, drilldown:el.nombreEnfermera +' '+ el.apellidoEnfermera})
      }
      //console.log("dentro del for: ",this.labels)
    })
    
    this.cantidadNotasEnfermera();

  }

  getTipoTerapias()
  {
    this.terapiaService.lista().subscribe((data:any)=>{
    this.terapiasfisicas = data;
    this.setTerapiasFisicas();
    //console.log(this.terapiasfisicas);
   }) 
  }

  setTerapiasFisicas()
  {
    this.labelsFisica = new Array
    this.terapiasfisicas.forEach((el:any)=>{
    let index = this.labelsFisica.findIndex(ele => ele.name == el.tipoTerapia)

    if(index>=0){
      //console.log(index);
      this.labelsFisica[index].y++
      
    }else{
      
      this.labelsFisica.push({name:el.tipoTerapia, y:1})
    }
    //console.log("dentro del for de terapias: ",this.labels)

    })
    this.terapiasFisicas();
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
      //console.log("dentro del for generos: ",this.labelsGeneros)
    })
    
    this.discapacidades();
    this.generos();
  }

  goToLog(){
    this.navCtrl.navigateForward('/registros-log');
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
        text: 'Discapacidades'
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
        text: '.',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
              enabled: true,
              format: 'Cantidad:{point.y}'
          },
        }
      
    },
    xAxis: {
      type: 'category'
  },
  yAxis: {
      title: {
          text: 'Total pacientes'
      }

  } ,
      series: [{
        name: '',
        colorByPoint: true,
        type: undefined,
        data: this.labelsGeneros
      }]
    });
    
  }
 

  terapiasFisicas() {
    HighCharts.chart('discapacidadFisicaChart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Terapias físicas'
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
        data: this.labelsFisica
      }]
    });
  }

  cantidadTerapiasEnfermera() {
    HighCharts.chart('xTerapiasChart', {
      chart: {
        type: 'column'
        
      },
      title: {
        text: '.',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
              enabled: true,
              format: ''
          },
        }
      
    },
    xAxis: {
      type: 'category'
  },
  yAxis: {
      title: {
          text: 'Total notas de terapias '
      }

  } ,
      series: [{
        name: '',
        colorByPoint: true,
        type: undefined,
        data: this.labelsxTerapias
      }]
    });
    
  }


  cantidadNotasEnfermera() {
    HighCharts.chart('xNotasChart', {
      chart: {
        type: 'column'
        
      },
      title: {
        text: '.',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
              enabled: true,
              format: ''
          },
        }
      
    },
    xAxis: {
      type: 'category'
  },
  yAxis: {
      title: {
          text: 'Total notas de enfermeria '
      }

  } ,
      series: [{
        name: '',
        colorByPoint: true,
        type: undefined,
        data: this.labelsxTNotasEnfermeria
      }]
    });
    
  }


}
