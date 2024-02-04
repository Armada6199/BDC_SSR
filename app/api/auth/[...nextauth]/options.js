import CredentialsProvider from "next-auth/providers/credentials";
const ldap = require("ldapjs");
export const options = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "LDAP",
      async authorize(credentials) {
        try {
          const client = ldap.createClient({
            url: process.env.LDAP_URI,
            // timeout: "2000",
            // reconnect: true,
          });
          return await new Promise((resolve, reject) => {
            const { username, password } = credentials;
            let user;
            client.bind(
              `uid=${username},ou=users,ou=system`,
              password,
              (error) => {
                if (error) {
                  reject({ msg: "Invalid Credintials", code: 401 });
                } else {
                  const opts = {
                    // filter: `(|(employeeNumber=${username})(cn=${username}))`,
                    scope: "sub",
                    attributes: [
                      "cn",
                      "sn",
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
                      res.on("searchEntry", (entry) => {
                        user = JSON.stringify(entry.pojo);
                      });

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
              }
            );
          });
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    signIn: async ({ user }) => {
      return user;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const userValues = {};
        user.userData.map(
          (attribute) => (userValues[attribute.type] = attribute.values)
        );
        const mockUser = {
          hasPrevLoan: true,
          currentSalary: 6000,
          employeeName: `${userValues.cn} ${userValues.sn}`,
          fileNumber: 22,
          jobTitle: "Software Developer",
          joiningDate: "2019-4-17",
          employeeLevel: 2,
          employeeNumber: userValues.employeeNumber,
          jobLevel: 1,
          workPlace: "Inspire",
          activeLoans: [
            {
              activeLoanLeftMonths: 10,
              activeLoanLayer: "First Layer",
              activeLoanPayPerMonthInput: 200,
              activeLoanType: "Home Loan",
              activeDeductedAmount: 2000,
            },
          ],
        };
        return { ...token, ...mockUser };
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("session : ", session, "token : ", token);
      return { ...session, ...token };
    },
  },

  strategy: "jwt",
  secret: process.env.NEXT_AUTH_SECRET,
};
