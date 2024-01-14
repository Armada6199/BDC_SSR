import CredentialsProvider from "next-auth/providers/credentials"
const mockUser={
    id:1,
    email:'moh.abdin27@gmail.com',
    password:123,
    hasPrevLoan:true,
    currentSalary:3500, 
    employeeName:'Mohamad Abdin',
    fileNumber:22,
    jobTitle:"Software Developer",
    joiningDate:"2019-4-17",
    employeeLevel:2,
    jobLevel:1,
    employeeNumber:1111,
    workPlace:'Inspire',
    activeLoans: [
        { activeLoanLeftMonths: 10, activeLoanLayer: 'First Layer',activeLoanPayPerMonthInput:200, activeLoanType: 'Home Loan' },
        // { activeLoanLeftMonths: 5000, activeLoanLayer: 'Second Layer',activeLoanPayPerMonthInput:233, activeLoanType: 'Land Loan' },
      ],
}
export const options={
providers:[
    CredentialsProvider({
        name:'credentials',
        credentials:{
            email:{
                label:"Email",
                type:'text',
                placeholder:'your email'
            },
            password:{
                label:'Password',
                type:'password',
                placeholder:"your password"
            },
        },
        redirect:false,
        // callbacks: {
        //     async signIn( credentials ) {
        //       const isAllowedToSignIn = 
        //       (credentials,'in the authorize')
        //       if (isAllowedToSignIn) {
        //         return true
        //       } else {
        //         // Return false to display a default error message
        //         return false
        //         // Or you can return a URL to redirect to:
        //         // return '/unauthorized'
        //       }
        //     }
        //   },
          async authorize(credentials, req){
            const {email,password}=credentials;
            const isValidUser=mockUser.email==email&&mockUser.password==password;
            try {
                if(isValidUser)return mockUser;
                else return null
            } catch (error) {
                (error)
            }
        },
    })
],
secret:process.env.NEXTAUTH_SECRET,
pages: {
    signIn: "/loan",
},
}