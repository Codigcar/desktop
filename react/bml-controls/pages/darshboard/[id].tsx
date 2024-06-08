import React from "react";
import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { GetServerSideProps } from "next";
import { fetchCustom } from "../../utils/fetchCustom";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Radar, Bar } from "react-chartjs-2";
import { IRecords } from '../../interfaces/IRecords';
// import BarChart from "../../components/ui/BarChart";
import dynamic from 'next/dynamic'
import CanvasJSReact from "../../components/js/canvasjs.react";
import { CCollapse } from "../../components/ui";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

interface Props {
    records: IRecords[];
}


const graphics: NextPage<Props> = ({ records }) => {

 const poligono = (subcategoriesList:any) => {

    let labelsList:any = [];
    let dataList:any = [];

    subcategoriesList.map((subcategory:any) => {
         labelsList.push(subcategory.name);
         dataList.push(subcategory.average)
    });
    
    let RadarData = {
        labels: labelsList,
        datasets: [
          {
            label: "Valores",
            backgroundColor: "rgba(242, 153, 74, .2)",
            borderColor: "rgba(242, 153, 74, 1)",
            
            pointBackgroundColor: "rgba(242, 153, 74, 1)",
            poingBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(242, 153, 74, 1)",

            data: dataList,
          },
        ],
      };

    const options = {
        plugins: {
            legend:{
                display:false
            }
        },
        // scale: {
        //     pointLabels: {
        //         fontSize: 20
        //     }
        // }
    }

     return (
        <div style={{  backgroundColor:'white',/*  padding:30, */ borderRadius:20 }}>
            <Radar data={RadarData} options={options}  />
        </div>
     )
 }

 const bar = (controlList:any, nameControl:string) => {

    let labels:any = [];
    let valueList:any = [];

    let dataPoints:any = [];

    controlList.map((control:any) => {
            labels.push(control.name);
            valueList.push(control.value);
            dataPoints.push({y:control.value, label:control.name})
    })

    // console.log({dataPoints});
    



    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
        layout: {
            padding: {
                // left: 150,
                // right: 50,
                // top: 50,
                // bottom: 50
            }
        },
        // scales: {
        //     yAxes: [{
        //       afterFit: function(scaleInstance:any) {
        //         scaleInstance.width = 400; // sets the width to 100px
        //       }
        //     }]
        //   }
    };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map((data:any,i:number)=> valueList[i]),
            borderColor: 'rgb(153, 239, 208)',
            backgroundColor: 'rgba(153, 239, 208, 0.5)',
          },
        ],
      };

      // <div style={{backgroundColor:'white', marginTop:20, borderRadius:20, padding: 20}} >
      //     <Bar options={options} data={data} height={200} />
      // </div>
      return (
        <div style={{backgroundColor:'white', marginTop:20, borderRadius:20, padding: 40}} >
        <DynamicComponentWithNoSSR dataPoints={dataPoints} nameControl={nameControl} />
        </div>
      )
     
 }


  return (
    <Layout>
      <>
        <div /* style={{background:'red', padding: 30}} */ >
         {
           records.length != 0 ?
            (records.map((record, index) => (
                    <div key={index}>
                        <CCollapse record={record} />
                    </div>
                )))
                : (
                    <h3>¡Realiza tu primer control BML! ...</h3>
                )
          }
        </div>
      </>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time



const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/ui/BarChart'),
  { ssr: false }
)

 export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { data } = await  // your fetch function here
  // console.log({ctx});
  // console.log(ctx.params);

  const { id } = params as { id: string };

  const records = await fetchCustom(`/records/by-user/${id}`);

  if (!graphics) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
        records,
    },
  };
};

export default graphics;
