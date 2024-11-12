import { AuthContextProvider } from "./_utils/auth-context";

/* The metadata object was found from here for specific pages:
 * https://nextjs.org/learn/dashboard-app/adding-metadata
 */

export const metadata = {
    title: "Shopping List",
    description: "A shopping list"
};

const Layout = ({ children }) => {
    return <AuthContextProvider>{children}</AuthContextProvider>
};

export default Layout;
