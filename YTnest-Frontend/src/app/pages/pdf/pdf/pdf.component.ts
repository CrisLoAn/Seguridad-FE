import { Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {
  constructor() { }
 
  ngOnInit() {
  }
 
  createPDF(){
 
    const pdfDefinition: any = {
      content: [
        { text: 'ACUERDO DE PAGO ENTRE LA UNIVERSIDAD DE INVESTIGACIÓN DE TECNOLOGÍA EXPERIMENTAL YACHAY Y EL/LA ESTUDIANTE', style: 'header' },
        { text: '2023SEM01 - 683 MFA2- A1M1 - P1', style: 'subheader' },
        { text: 'COMPARECIENTES:', style: 'subheader' },
        { text: 'Comparecen a la celebración del presente Acuerdo de Pago, por una parte la UNIVERSIDAD DE INVESTIGACIÓN DE TECNOLOGÍA EXPERIMENTAL YACHAY, legalmente representado por la Mgs. Andrea Proaño Jaramillo, Delegado de la máxima autoridad, en cumplimiento de la Disposición General Primera del Reglamento de Residencias para Estudiantes de la UITEY; y, a quien en adelante y para todos los efectos legales de este documento se denominará como la “YACHAY TECH"; y, por otra parte la/eI ESTUDIANTE ANDRADE LOOR CRISTHIAN ALEXANDER con número de cédula/pasaporte de ciudadanía/identidad 1727320010 quienes en base al Informe de Asignación de Residencias de la Dirección General de Bienestar Universitario, de manera libre y voluntaria convienen en celebrar el presente Acuerdo de Pago, contenido en las siguientes cláusulas:', margin: [0, 10, 0, 0] },
        { text: 'CLÁUSULA PRIMERA: ANTECEDENTES', style:'subheader'},
        { text: 'Con fecha 16 de diciembre de 2013, a través del Suplemento de Registro Oficial No.144, se promulgó la Ley de Creación de la Universidad de investigación de Tecnología Experimental YACHAY, que, en su Artículo 1, establece: \'Créase la Universidad de investigación de Tecnología Experimental YACHAY como una institución de educación superior de derecho público, sin fines de lucro, con personería jurídica propias, con autonomía académica, administrativa, financiera y orgánica, acorde con los principios establecidos en las Conslituciòn de la República y la Ley Orgánica de Educación Superior.\''
        },
        {
        },
        {text: 'Mediante Acta de Uso, Administración, Usufructo y Ocupación Nro. UITEY-ACTA-2022- 03-UAUO, de 13 de mayo de 2022, suscrita por el Ing. Alejandro Ribadeneira Espinosa, Secretario de Educación Superior, Ciencia, Tecnología e lnnovaciôn y el Dr. Diego Gustavo Pérez, Rector de la Universidad de investigación de Tecnología Experimental Yachay, en la cláusula tercera se establece como objeto \'(...) autorizar por parte de la Secretaría de Educación Superior, Ciencia, Tecnología e innovación a la Universidad de Investigación  de Tecnología  Experimental	Yachay el r›so y ocupación de los inmuebles	que  se  detallan	en  el  ANEXO	1  del  presente	instrumento,	para	su correspondiente funcionamiento y operación basados en los principios de eficiencia, Calidad, desconcentración, y proporcionalidad, incluyendo en ésta autorizaciôn la facultad para que YACHAY TECH realice la recaudación de los valores a que hubiere lugar en ejercicio del derecho de usufructo de los bienes contenidos en el ANEXO 1, debiendo estos ser utilizados en la consecución de los fines y objetivos de la Institución de Educación Superior.\' '},
        {text: 'Mediante corrientes inserto en el Memorando Nro. UITEY-CGAF-2023-0175-M, de fecha 28 de abril de 2023, suscrito por el Mgs. Christian David Hurtado Meza Coordinador Administrativo Financiero Subrogante, con el cual se remitió el INFORME TÉCNICO PARA LA DETERMINACIÓN DE COSTOS DE PLAZAS DE RESIDENCIAS UNIVERSITARIAS ; con fecha 2 de mayo de 2023, el Dr. Jorge Andrés Rosales Acosta, Sector de la Universidad, dispone: "Autorizado. Proceder conforme a la normativa legal vigente."', margin: [0, 10]},
        {text: 'CLÁUSULA SEGUNDA: DOCUMENTOS HABILITANTES', style: 'subheader', margin: [0, 10]},
        {text: 'Forman parte integrante del acuerdo de pago, los siguientes documentos:'},
        {ul:['Los documentos que acrediten la calidad de los comparecientes.',
          'Documentos de identificación de los comparecientes.',
        ]},
        {text: 'CLÁUSULA TERCERA: VALOR DEL PAGO', style: 'subheader', margin: [0, 10]},
        {text: 'Con el presente Acuerdo de Pago, el cual la/eI ESTUDIANTE se compromete a cancelar el valor de USD $315,82 ( TRESCIENTOS  QUINCE CON 82/100  DÓLARES  dólares de los Estados Unidos de América), por la prestación del servicio de hospedaje en las Residencias Universitarias de Yachay Tech, por el período comprendido entre el 16 de abril al 15 de agosto de 2023.', margin: [0, 10]},
        {text: 'CLÁUSULA CUARTA: PLAN DE PAGOS', style: 'subheader', margin: [0, 10]},
        {text: 'El/La ESTUDIANTE acepta cumplir su obligación de pago. Consecuentemente, y con objetivo de satisfacer su deuda, se establece el siguiente Plan de pagos mensuales por anticipado:'},
        {text:'Cuota mes de Abril: USD 44,01 dólares americanos correspondientes a 15 días de acuerdo al Memorando Nro. UITEY-DGA-2022-0404-M del 16 de noviembre del 2022.'},
        {text: 'Costos aprobados en el Memorando Nro. UITEY-CGAF-2023-0175-M mediante comentario inserto del 2 de Mayo de 2023.'},
        {ul:['Cuota mes de Mayo: USD 77,66','Cuota mes de Junio: USD 77,66', 'Cuota mes de  Julio: USD 77,66','Cuota mes de  Agosto: USD 38,83 correspondientes a 15 días.']},
        {text: 'Cumpliendo con los pasos en Ias fechas establecidas y comunicadas mediante correo electrónico a todos los residentes.'},
        {text:'Formas de Pago:',style:'subheader', margin: [0, 10]},
        {text: 'Las formas de pago son las siguientes:'},
        {ul:[
          'El pago directamente en ventanillas de las agencias bancarias del Banco Pacífico o Banco Pichincha a nivel nacional únicamente con el número de cédula del estudiante.',
          'Pago a través de las plataformas financieras Biz Bank Banco del Pacífico y Cash Management Banco Pichincha.',
          'Pago a través de las cadenas mi Vecino de Banco Pichincha con el Código Institucional 79708, más el número de cédula del estudiante',
          'Pagos con tarjeta de crédito en la oficinas de la Dirección General Financiera de la UITEY, de las siguientes instituciones: Banco de Guayaquil, Banco Pichincha, Banco del Pacífico, Diners Club del Ecuador S.A., para lo cual deberá estar presente el titular de la tarjeta con su respectivo documento de identificación cédula de ciudadanía/identidad.'
        ]},
        {text: 'CLÁUSULA QUINTA: CONTROVERSIAS', style:'subheader', margin: [0, 10]},
        {text: 'En caso de surgir controversias derivadas de la interpretación, ejecución y cumplimiento del presente Acuerdo de Pago, las mismas serán solucionadas mediante diálogo amigable entre la/el ESTUDIANTE y la UNIVERSIDAD YACHAY TECH, inclusive de ser necesario con la intervención de la máxima autoridad de la Institución de Educación Superior.'},
        {text: 'Si ello no fuere posible para conciliar, LAS PARTES podrán acudir al Centro de Mediación de la Unidad Judicial Multicompetente del Cantón San Miguel de Urcuquí, provincia de imbabura, correspondiéndole a La/El ESTUDIANTE sufragar todos los gastos que estas diligencias del proceso de mediación genere, hasta el final de la controversia.'},
        {text:'En caso de llegar a establecerse la negativa en el pago adeudado por el o la ESTUDIANTE, la Universidad YACHAY TECH, queda facultada a operar con la ejecución del procedimiento Coactivo determinado por la Ley en materia, para recuperación de los valores adeudados.'},
        {text: 'CLÁUSULA SEXTA: ACEPTACIÓN Y SUSCRIPCIÓN', style:'subheader', margin: [0, 10]},
        {text:'Libre y voluntariamente, previo el cumplimiento de todos y cada uno de los requisitos exigidos por las leyes de la materia, las partes declaran expresamente su aceptación a todo lo convenido, por lo que no podrán realizar reclamo alguno en lo posterior.'},
        {text:'Para constancia de lo estipulado, en fe de aceptación y ratificación, las partes firman el presente instrumento, en tres (3) ejemplares, de igual valor y contenido legal.'},
        {text:'Dado y firmado en la ciudad de San Miguel de Urcuquí, Provincia de Imbabura, a los ………días del mes de…………………..de 2023.', margin: [0, 75]},
        {text: "Mgs. Andrea Proaño Jaramillo"},
        {text: 'DELEGADO/A DE LA MÁXIMA AUTORIDAD DE', style:'subheader'},
        {text: 'LA UNIVERSIDAD DE INVESTIGACIÓN DE', style:'subheader'},
        {text: 'TECNOLOGÍA EXPERIMENTAL YACHAY', style:'subheader',margin:[0, 75]},
        {text: 'Sr/Srta. '},
        {text: 'EL/LA ESTUDIANTE DE LA UNIVERSIDAD', style:'subheader'},
        {text: 'DE INVESTIGACIÓN DE TECNOLOGÍA', style:'subheader'},
        {text: 'EXPERIMENTAL YACHAY', style:'subheader'}
        
        // Agregar el resto del contenido aquí...
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        // Puedes definir más estilos aquí según tus necesidades
      }
    };
 
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
 
  }
}
