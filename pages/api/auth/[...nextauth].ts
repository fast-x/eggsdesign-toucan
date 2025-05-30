import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { getProfileFromEmail, createUserInSanity, getUserDetailsFromFlowcase } from '../../../scripts/api';

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: process.env.AZURE_AD_SCOPES,
        },
      },
    } as any),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        const email = user.email;
        if (!email) {
          console.warn('No email found on user.');
          return false;
        }

        const existingUser = await getProfileFromEmail(email);
        if (existingUser) return true;
        const { image, title } = await getUserDetailsFromFlowcase(email, user.image as string);
        await createUserInSanity(user.name!, email, image, title);

        return true;
      } catch (err) {
        console.error('Error in signIn callback:', err);
        return false;
      }
    },

    async session({ session }) {
      return session;
    },
  },
});
