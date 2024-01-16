import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);


export default function CustomChart({interestPayable,loanAmount,originalLoanAmountLabel,interestPayableLabel}) {
  // const appliedInterests=totalAppliedLayers.map(ele=>{
  //   return ele.totalInterestApplied;
  // })
  // const titles=totalAppliedLayers.map(ele=>{
  //   return ele.title;
  // })
  (interestPayable,loanAmount)
  const data = {
    labels: [originalLoanAmountLabel,interestPayableLabel],
    datasets: [
      {
        label: 'EMI Details',
        data: [interestPayable,loanAmount],
        backgroundColor: [
          '#424242',
          '#dd752d',
        ],
        borderColor: [
          '#424242',
          '#dd752d',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return <Doughnut
  options={{maintainAspectRatio:false}}
  height="300px"
  width="300px" data={data} />;
}
