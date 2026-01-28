import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins:200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i&display=swap"
                    rel="stylesheet"
                />
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
