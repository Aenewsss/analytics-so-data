import { BetaAnalyticsDataClient } from "@google-analytics/data"

const analyticsDataClient = new BetaAnalyticsDataClient(
  {
    //file generated in google cloud console service
    keyFilename: './analytics.json'
  }
);

async function runReport(startDate, endDate) {
  try {
    const propertyId = "property_id_found_in_analytics_console_admin_section"

    const formattedStartDate = new Date(startDate).toISOString().split("T")[0] 
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0]

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      ],
      dimensions: [
        {
          name: 'operatingSystem',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    })

    console.log('Report result:');
    response.rows.forEach(row => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });
  } catch (error) {
    console.error('error line 37', error.message)
  }
}

const currentDate = new Date()

const startDate = new Date(currentDate.setDate(currentDate.getDay() - 30))
const endDate = new Date()

runReport(startDate, endDate);