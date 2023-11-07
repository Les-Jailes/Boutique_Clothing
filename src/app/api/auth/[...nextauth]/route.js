import NextAuth from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import User from "@/model/User";
import connect from "@/utils/dbUtil";
import bcrypt from 'bcryptjs'

const authOptions = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name : "Credentials",
            async authorize(credentials){
              await connect()
              try {
                const user = await User.findOne({email: credentials.email});
                if (user){
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )
                  if(isPasswordCorrect){
                    return user
                  }else{
                    throw new Error("Wrong credentials")
                  }
                }else{
                  throw new Error("User not found")
                }
              } catch (error) {
                throw new Error("Authentication error")
              }
            }
          })
    ],

  })
  export {authOptions as GET, authOptions as POST}
  