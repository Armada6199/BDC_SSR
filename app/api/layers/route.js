export async function GET(request) {
  const body = await request.json();
  const { layersList, currentSalary, serviceYears } = body;
  if (serviceYears < 3 && serviceYears >= 1) {
    const filteredList = layersList.filter((item) => !item.isSupport);
    return Response.json(filteredList);
  }
  if (serviceYears >= 3) {
    const maxLoanAmount = currentSalary * 60;
    console.log(maxLoanAmount);

    if (maxLoanAmount <= 40000) {
      updatedLayerList[0].max = maxLoanAmount;
      return Response.json(updatedLayerList);
    }
    if (maxLoanAmount <= 200000) {
      updatedLayerList[1].max = maxLoanAmount - updatedLayerList[0].max;
      return Response.json(updatedLayerList);
    }
  }

  return [];
}
