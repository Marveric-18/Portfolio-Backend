const { google } = require('googleapis');
const analyticsdata = google.analyticsdata('v1beta');
const CONSTANTS = require('../constants');

const GOOGLE_CREDENTIALS_ANALYTICS = {
    type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
    project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
    private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
    auth_uri: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_URI,
    token_uri: process.env.GOOGLE_SERVICE_ACCOUNT_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_CERT,
    client_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_CERT_URL,
    universe_domain: process.env.GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN
};

async function getUniqueVisitors() {
  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_CREDENTIALS_ANALYTICS,
    scopes: [CONSTANTS.GOOGLE_AUTH_SCOPE_READ_ONLY],
  });

  const authClient = await auth.getClient();
  
  const request = {
    property: `properties/${process.env.GOOGLE_ANALYTICS_PROPERTY_ID}`,
    resource: {
        dateRanges: [{ startDate: '2024-01-01', endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }],
    },
  };

  const response = await analyticsdata.properties.runReport({
    auth: authClient,
    ...request,
  });
  
  const uniqueVisitors = response.data.rows?.[0].metricValues[0].value;
  return uniqueVisitors;
}

module.exports = getUniqueVisitors;
