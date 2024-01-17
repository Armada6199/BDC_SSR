import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const mockUser = {
          id: 1,
          email: "moh.abdin27@gmail.com",
          password: 123,
          hasPrevLoan: true,
          currentSalary: 3500,
          employeeName: "Mohamad Abdin",
          fileNumber: 22,
          jobTitle: "Software Developer",
          joiningDate: "2019-4-17",
          employeeLevel: 2,
          jobLevel: 1,
          employeeNumber: 1111,
          workPlace: "Inspire",
          activeLoans: [
            {
              activeLoanLeftMonths: 10,
              activeLoanLayer: "First Layer",
              activeLoanPayPerMonthInput: 200,
              activeLoanType: "Home Loan",
              activeDeductedAmount: 2000,

            },
            // { activeLoanLeftMonths: 5000, activeLoanLayer: 'Second Layer',activeLoanPayPerMonthInput:233, activeLoanType: 'Land Loan' },
          ],
        };
        const { email, password } = credentials;
        const isValidUser =
          mockUser.email == email && mockUser.password == password;
        try {
          if (isValidUser) return mockUser;
          else return null;
        } catch (error) {
          error;
        }
      },
    }),
  ],
  callbacks:{
    jwt: async ({ token, user }) =>{
      if (user) {
        token.employeeData = user;
      }
      return token
    },
    session: async ({ session, token }) => {
        session.userData = {
          ...token
        }

      return session;
    },
  },
  strategy: "jwt",
  secret: process.env.NEXT_AUTH_SECRET,
};
