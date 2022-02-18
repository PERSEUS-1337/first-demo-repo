// const fs = require('fs');

// async function createJSONFile() {

//   //Replace '\' in environment variable .env file before JSON.stringify() 
//   //so that stringify does not turn it into '\\'
//   //https://stackoverflow.com/a/36439803/13604562
//   jsonFile.private_key = process.env.GCS_JSON_private_key.replace(/\\n/g, '\n');

//   let data = JSON.stringify(jsonFile);
//   //CHECK IF JSON KEYFILE FOR GCS EXISTS. IF NOT, CREATES FILE
//   if (!fs.existsSync(`./${process.env.GCS_KEYFILE}`)) {
//     await fs.writeFile(`./${process.env.GCS_KEYFILE}`, data, function (err) {
//       if (err) {
//         return res.status(400).json(err);
//       }
//     });
//   }
// }

// //JSON file template
// let jsonFile = {
//   type: `${process.env.GCS_JSON_type}`,
//   project_id: `${process.env.GCS_JSON_project_id}`,
//   private_key_id: `${process.env.GCS_JSON_private_key_id}`,
//   private_key: `${process.env.GCS_JSON_private_key}`,
//   client_email: `${process.env.GCS_JSON_client_email}`,
//   client_id: `${process.env.GCS_JSON_client_id}`,
//   auth_uri: `${process.env.GCS_JSON_auth_uri}`,
//   token_uri: `${process.env.GCS_JSON_token_uri}`,
//   auth_provider_x509_cert_url: `${process.env.GCS_JSON_auth_provider_x509_cert_url}`,
//   client_x509_cert_url: `${process.env.GCS_JSON_client_x509_cert_url}`,
// };

// createJSONFile();