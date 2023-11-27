import NextAuth from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google';
import User from "@/model/User";
import connect from "@/utils/dbUtill";
import bcrypt from 'bcryptjs'
import api from "../../api";

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
          }),
          
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        if (account.provider === "google") {
          await connect();
          try {
            let existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
              if (existingUser.password === 'No password | Google account') {
                return true;
              } else if (!existingUser.isGoogleAccount) {
                return '/pages/account/login?showToast=true';
              }
            } else {
              const newUser = {
                ci: 'N/A',
                name: profile.name.split(' ')[0],
                lastName: profile.name.split(' ').slice(1).join(' ') || 'No lastname',
                email: user.email,
                password: 'No password | Google account',
                gender: 'No gender',
                imagePath: user.image,
                isGoogleAccount: true,
              };
              await api.post(`/User`, newUser);
              return true;
            }
            
          } catch (error) {
            console.error('Error saving user to MongoDB', error);
            return false; 
          }
        }
        return true;
      },
    },
  })
  export {authOptions as GET, authOptions as POST}
  