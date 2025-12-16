import { createSwaggerSpec } from 'next-swagger-doc';
import ReactSwagger from './react-swagger';
import Link from 'next/link';

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: 'app/api',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'LiveReal API Documentation',
                version: '1.0',
            },
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'Supabase',
                    },
                },
            },
            security: [
                {
                    BearerAuth: [],
                },
            ],
        },
    });
    return spec;
};

import { TextLogo } from '@/components/ui/text-logo';

export default async function IndexPage() {
    const spec = await getApiDocs();
    return (
        <main className="min-h-screen bg-white text-black">
            <nav className="sticky top-0 z-50 w-full h-16 px-6 flex items-center border-b border-gray-200 bg-white">
                <Link href="/">
                    <TextLogo className="h-6 w-auto" />
                </Link>
            </nav>
            <section className="container mx-auto">
                <ReactSwagger spec={spec} />
            </section>
        </main>
    );
}
