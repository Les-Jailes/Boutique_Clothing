import NextAuth from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import User from "@/model/User";
import connect from "@/utils/dbUtil";

const authOptions = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name : "Credentials",
            async authorize(credentials){
              await connect()
              try {
                const user = await User.findOne({email: credentials.email});
                console.log(user.name)
                console.log(user.password)
                console.log(user.email)
                console.log(user.lastName)
                if (user){
                  const isPasswordCorrect = (user.password === credentials.password)
                  
                  console.log(user.password)
                  console.log(credentials.password)
                  console.log(isPasswordCorrect)
                  if(isPasswordCorrect){
                    return user
                  }else{
                    throw new Error("Wrong credentials")
                  }
                }else{
                  throw new Error("User not found")
                }
              
              } catch (error) {
                throw new Error(error)
              }
            }
          })
    ],

  })
  export {authOptions as GET, authOptions as POST}