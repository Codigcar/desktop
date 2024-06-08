import React, { Component } from 'react';
import CanvasJSReact from '../js/canvasjs.react';
import { useEffect } from 'react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
 
class BarChart extends Component {
	addSymbols(e:any){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Most Popular Social Networking Sites"
			},
			axisX: {
				title: "Social Network",
				reversed: true,
			},
			axisY: {
				title: "Monthly Active Users",
				// labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  2200000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
					{ y:  1800000000, label: "Aplicación de criptografía robusta para la generación y almacenamiento de códigos de transacciones únicas." },
					{ y:  800000000, label: "Solicitud de documento oficial de identidad al usuario en transacciones físicas de alto riesgo de fraude." },
					{ y:  563000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
					{ y:  376000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
					{ y:  336000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
					{ y:  330000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." }
				]
			}]
		}
		
		return (
		<div>
			<h1>React Bar Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

const BarChartt = ({dataPoints, nameControl}:any) => {
    // useEffect(() => {
    //    console.log({label});
    // }, [])
    
    const options = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text:nameControl
        },
        axisX: {
            // title: "Controles",
            // reversed: true,
            // labelMaxWidth: 150,  
            labelWrap: false,
            // labelFontSize: 20
            // labelAutoFit: false,
        },
        axisY: {
            // title: "Monthly Active Users",
            // labelAutoFit: false,
            labelFontSize: 1
            // labelFormatter: this.addSymbols
        },
        dataPointWidth: 25,
        data: [{
            type: "bar",
            // dataPoints: [
            //     { y:  2200000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
            //     { y:  1800000000, label: "Aplicación de criptografía robusta para la generación y almacenamiento de códigos de transacciones únicas." },
            //     { y:  800000000, label: "Solicitud de documento oficial de identidad al usuario en transacciones físicas de alto riesgo de fraude." },
            //     { y:  563000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
            //     { y:  376000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
            //     { y:  336000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
            //     { y:  330000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
            //     { y:  330000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
            //     { y:  330000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." }
            // ]
            dataPoints: dataPoints
        }],
        // width: 800,
    }
    
    return (
    <div>
        {/* <h1>{nameControl}</h1> */}
        <CanvasJSChart options = {options}
            /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    );
}

export default BarChartt;