import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import '@styles/globals.css';
import { Children } from 'react';

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts"
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang='en'>
            <body>
                {/* State Management (Provider) session is not yet created hence undefined initially */}
                <Provider session={undefined}> 
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
};
