import { GoogleApis } from 'googleapis'

export function getPageview() {

  const google = new GoogleApis()
  const analytics = google.analyticsreporting('v4')
  const credential: any = process.env.GA_CONFIG
  const viewId = 'UA-104252-5'
  const startDate = "2018-01-01"
  const endDate = "2018-04-01"

  console.log('GA_CONFIG', process.env.GA_CONFIG)

  const client = new google.auth.JWT(credential.client_email, '', credential.private_key, ["https://www.googleapis.com/auth/analytics.readonly"], '')

  // client.authorize((error, _token) => {
  //   if (error) return
  //   analytics.reports.batchGet({
  //     requestBody: {
  //       reportRequests: [
  //         {
  //           "dateRanges": [
  //             {
  //               startDate,
  //               endDate
  //             }
  //           ],
  //           viewId,
  //           "dimensions": [
  //             {
  //               "name": "ga:pagePath"
  //             }
  //           ],
  //           "metrics": [
  //             {
  //               "expression": "ga:pageviews"
  //             }
  //           ],
  //         }
  //       ]
  //     },
  //     auth: client
  //   }, (error: any, response: any) => {
  //       if (error) console.log(error)
  //       const pv = response.data.reports[0].data.rows[0].metrics
  //       console.log('pv')
  //       console.log(pv)
  //   });
  // })

  return 610 // TOD: for test
}