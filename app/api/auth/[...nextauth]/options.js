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
      return user.userData;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.employeeData = user.userData;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.userData = {
        ...token,
      };

      return session;
    },
  },

  strategy: "jwt",
  secret: process.env.NEXT_AUTH_SECRET,
};
