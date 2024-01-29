const ldap = require("ldapjs");

export async function GET(req) {
  return new Response("test");
}
export async function POST(req) {
  const { username, password } = await req.json();
  try {
    const client = ldap.createClient({
      url: process.env.LDAP_URI,
    });
    const ldapResponse = await new Promise((resolve, reject) => {
      let user;
      client.bind(username, password, (error) => {
        if (error) {
          reject("Invalid Creditials");
        } else {
          const searchCN = username.split("=")[1].split(",")[0];
          const opts = {
            filter: `(cn=${searchCN})`,
            scope: "sub",
            attributes: [
              "sn",
              "cn",
              "employeeNumber",
              "employeeType",
              "organization",
            ],
          };
          client.search("ou=users,ou=system", opts, (err, res) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              // res.on("searchRequest", (searchRequest) => {
              //   // console.log("searchRequest: ", searchRequest.messageId);
              // });
              res.on("searchEntry", (entry) => {
                user = JSON.stringify(entry.pojo);
                console.log("found");
                console.log(entry.pojo);
                // console.log("entry: " + JSON.stringify(entry.pojo));
              });
              // res.on("searchReference", (referral) => {
              //   console.log("referral: " + referral.uris.join());
              // });
              res.on("error", (err) => {
                console.error("error: " + err.message);
              });
              res.on("end", (result) => {
                if (user) {
                  resolve(user);
                } else reject("User not found");
              });
            }
          });
        }
      });
    });
    return new Response(ldapResponse);
  } catch (error) {
    console.log(error);
    return new Response(error);
  }
}
