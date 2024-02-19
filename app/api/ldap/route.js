import { NextResponse } from "next/server";

const ldap = require("ldapjs");

// export async function GET(req) {
//   return new Response("test");
// }
export async function POST(req) {
  const { username, password } = await req.json();
  try {
    const client = ldap.createClient({
      url: process.env.LDAP_URI,
      // timeout: "2000",
      // reconnect: true,
    });
    const ldapResponse = await new Promise((resolve, reject) => {
      let user;
      client.bind(`uid=${username},ou=users,ou=system`, password, (error) => {
        if (error) {
          reject({ msg: "Invalid Credintials", code: 401 });
        } else {
          // const searchCN = username.split("=")[1].split(",")[0];
          const opts = {
            // filter: `(|(employeeNumber=${username})(cn=${username}))`,
            scope: "sub",
            attributes: [
              "cn",
              "employeeNumber",
              // "employeeType",
              // "organization",
            ],
          };
          client.search(`ou=users,ou=system`, opts, (err, res) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              // res.on("searchRequest", (searchRequest) => {
              //   // console.log("searchRequest: ", searchRequest.messageId);
              // });
              res.on("searchEntry", (entry) => {
                user = JSON.stringify(entry.pojo);
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
                  resolve({
                    code: 200,
                    userData: JSON.parse(user).attributes,
                    msg: "Login Successful",
                  });
                } else reject({ msg: "User not found", code: 401 });
              });
            }
          });
        }
      });
    });
    if (ldapResponse.userData) {
      return NextResponse.json({
        msg: ldapResponse.msg,
        userData: ldapResponse.userData,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error,
      },
      { status: error.code }
    );
  }
}
